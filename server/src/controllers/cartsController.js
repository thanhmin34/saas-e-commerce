const Joi = require("joi");
const lodash = require("lodash");
const asyncHandler = require("express-async-handler");
const {
  notificationMessageSuccess,
  notificationMessageError,
} = require("../utils/notificationMessageStatus");
const { generateCartId } = require("../utils/generateCartId");
const {
  Cart,
  ShippingMethods,
  PaymentMethods,
  Discount,
  CartItem,
  ShippingAddress,
  Products,
  User,
} = require("../models");
const { mergeProducts } = require("../utils/mergeProducts");
const { getToken } = require("../utils/getToken");
const { getShippingAddress } = require("../utils/helper");
const {
  getTotalPriceCart,
  getTotalExclPriceCart,
  getDiscountAmount,
  getTotalPayment,
  getProductByCart,
} = require("../utils/calculatorTotalCart");
const { TAX_AMOUNT } = require("../constants/variables");

const cartSchema = Joi.object({
  cart_id: Joi.string().required(),
});

const mergeCartSchema = Joi.object({
  // destination_cart_id: Joi.string().required(),
  source_cart_id: Joi.string().required(),
});

const validateFieldBySchema = (data, schema) => {
  return schema.validate(data);
};

const mergeCart = asyncHandler(async (req, res) => {
  const { body, headers } = req || {};
  const { destination_cart_id, source_cart_id } = body || {};
  try {
    // const { error } = validateFieldBySchema(body, mergeCartSchema);
    // if (error) {
    //   return notificationMessageError(res, error.details[0].message);
    // }

    const sourceCart = await Cart.findOne({
      where: {
        cart_id: source_cart_id,
      },
      attributes: ["id", "cart_id"],
      include: {
        model: CartItem,
        as: "listCartItem",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });
    if (!sourceCart) {
      return notificationMessageError(res, "Cannot merge cart");
    }

    if (!destination_cart_id) {
      const token = getToken(headers);
      const user = await User.findOne({
        where: {
          token,
        },
        attributes: ["token", "id"],
      });

      if (!user)
        return notificationMessageError(res, {
          message: "Internal server error",
        });

      sourceCart.customer_id = user?.id;
      await sourceCart.save();

      return notificationMessageSuccess(res, {
        message: "Ok",
        newCartId: sourceCart?.cart_id,
      });
    }

    const destinationCart = await Cart.findOne({
      where: {
        cart_id: destination_cart_id,
      },
      attributes: ["id"],
      include: {
        model: CartItem,
        as: "listCartItem",
        attributes: {
          exclude: ["createdAt", "updatedAt", "cart_id"],
        },
      },
    });

    if (!sourceCart || !destinationCart) {
      return notificationMessageError(res, "Cannot merge cart");
    }

    const newCartId = generateCartId();
    const listCartItems = destinationCart?.listCartItem || [];
    const listSourceCartItems = sourceCart?.listCartItem || [];
    //merge product simple, product config todo update
    const products = mergeProducts(listSourceCartItems, listCartItems);

    const newCartItem = products.map((item) => {
      const { dataValues } = item || {};
      const { product_id, quantity, price, options } = dataValues || {};
      return {
        cart_id: destinationCart?.id,
        product_id,
        quantity,
        price,
        options,
      };
    });

    const idsCartItem = [...listCartItems, ...listSourceCartItems];

    const idsSourceCartItem =
      idsCartItem?.length > 0 ? idsCartItem.map((e) => e?.id) : [];

    const deleteConditions = {
      id: idsSourceCartItem,
    };
    // update or delete
    destinationCart.cart_id = newCartId;

    const createdCartItems = await CartItem.bulkCreate(newCartItem);
    await destinationCart.addListCartItem(createdCartItems);
    await CartItem.destroy({ where: deleteConditions });
    await sourceCart.destroy();
    await destinationCart.save();

    return notificationMessageSuccess(res, {
      message: "Ok",
      newCartId,
    });
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

const getCartDetails = asyncHandler(async (req, res) => {
  const { body, query } = req || {};
  const { cart_id } = query || {};

  try {
    const { error } = validateFieldBySchema(query, cartSchema);
    if (error) {
      return notificationMessageError(res, error.details[0].message);
    }

    const fieldExclude = ["createdAt", "updatedAt", "id"];
    const cart = await Cart.findOne({
      where: { cart_id },
      attributes: ["cart_id", "notes"],
      include: [
        {
          model: CartItem,
          as: "listCartItem",
          attributes: {
            exclude: fieldExclude,
          },
          include: [
            {
              model: Products,
              as: "productCartItem",
              attributes: [
                "name",
                "sku",
                "image",
                "price",
                "special_price",
                "special_from_date",
              ],
            },
          ],
        },
        {
          model: PaymentMethods,
          as: "cartPaymentMethod",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: ShippingMethods,
          as: "cartShippingMethods",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Discount,
          as: "cartDiscount",
          attributes: {
            exclude: [...fieldExclude],
          },
        },
        {
          model: ShippingAddress,
          as: "cartShippingAddress",
          attributes: {
            exclude: [...fieldExclude, "customer_id"],
          },
        },
      ],
    });

    const total = getTotalPriceCart(cart?.listCartItem);

    const total_excl = getTotalExclPriceCart(total);
    const shipping_amount = lodash.get(cart, "cartShippingMethods.price", 0);
    const discount_amount = getDiscountAmount(
      lodash.get(cart, "cartDiscount.value", 0),
      total
    );
    const currency = "USD";
    const totalPayment = getTotalPayment(
      total,
      TAX_AMOUNT,
      shipping_amount,
      discount_amount
    );

    if (cart) {
      const products = getProductByCart(cart?.listCartItem) || [];

      return notificationMessageSuccess(res, {
        cart: {
          cart_id: cart?.cart_id,
          total_quantity: cart?.listCartItem?.length || 0,
          price: {
            total,
            total_excl: total_excl ? +total_excl.toFixed(2) : 0,
            total_payment: totalPayment ? +totalPayment.toFixed(2) : 0,
            tax_amount: TAX_AMOUNT,
            shipping_amount,
            discount_amount: discount_amount ? +discount_amount.toFixed(2) : 0,
            currency,
          },
          payment_methods: cart?.cartPaymentMethod,
          shipping_methods: cart?.cartShippingMethods,
          shipping_address: getShippingAddress(cart?.cartShippingAddress),
          products,
          discount: cart?.cartDiscount,
          notes: cart?.notes || "",
        },
      });
    }
    return notificationMessageError(res, "Cannot find cart");
  } catch (error) {
    console.log("error", error);
    return notificationMessageError(res, error);
  }
});

const checkCartIsAuth = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { cart_id } = body || {};
  try {
    const { error } = validateFieldBySchema(body, cartSchema);
    if (error) {
      return notificationMessageError(res, error.details[0].message);
    }

    const cart = await Cart.findOne({
      where: { cart_id },
      attributes: ["cart_id"],
    });

    if (cart) {
      return notificationMessageSuccess(res, {
        status: true,
        message: "Cart id exists",
        cart_id: cart?.cart_id,
      });
    }
    return notificationMessageError(res, "Cannot find cart");
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

const createCart = asyncHandler(async (req, res) => {
  const { body } = req;
  const { customer_id } = body;
  try {
    const cart_id = generateCartId();

    const params = {
      cart_id,
    };
    if (customer_id) params.customer_id = customer_id;
    const cart = await Cart.create(params);
    if (cart?.id) {
      return notificationMessageSuccess(res, {
        message: "Create cart successfully",
        status: true,
        cart_id,
      });
    }
    return notificationMessageError(res, "Cannot create shopping cart");
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

module.exports = {
  getCartDetails,
  createCart,
  mergeCart,
  checkCartIsAuth,
};
