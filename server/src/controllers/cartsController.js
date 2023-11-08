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
} = require("../models");
const { mergeProducts } = require("../utils/mergeProducts");

const cartSchema = Joi.object({
  cart_id: Joi.string().required(),
});

const mergeCartSchema = Joi.object({
  destination_cart_id: Joi.string().required(),
  source_cart_id: Joi.string().required(),
});

const validateFieldBySchema = (data, schema) => {
  return schema.validate(data);
};

const mergeCart = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { destination_cart_id, source_cart_id } = body || {};
  try {
    const { error } = validateFieldBySchema(body, mergeCartSchema);
    if (error) {
      return notificationMessageError(res, error.details[0].message);
    }

    const sourceCart = await Cart.findOne({
      where: {
        cart_id: source_cart_id,
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

    if (!destinationCart || !sourceCart) {
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
      cart_id: newCartId,
      newCartItem,
    });
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

const getCartDetails = asyncHandler(async (req, res) => {
  const { body, query } = req || {};
  const { cart_id } = query || {};

  try {
    // const { error } = validateFieldBySchema(body, cartSchema);
    // if (error) {
    //   return notificationMessageError(res, error.details[0].message);
    // }

    const fieldExclude = ["createdAt", "updatedAt", "id"];
    const cart = await Cart.findOne({
      where: { cart_id },
      attributes: ["cart_id"],
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
              attributes: ["name", "sku", "image"],
            },
          ],
        },
        {
          model: PaymentMethods,
          as: "cartPaymentMethod",
          attributes: {
            exclude: fieldExclude,
          },
        },
        {
          model: ShippingMethods,
          as: "cartShippingMethods",
          attributes: {
            exclude: fieldExclude,
          },
        },
        {
          model: Discount,
          as: "cartDiscount",
          attributes: {
            exclude: [...fieldExclude, "start_date", "end_date", "code"],
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

    const total =
      cart?.listCartItem?.length > 0
        ? cart?.listCartItem.reduce((acc, cur) => {
            return (acc += cur?.price);
          }, 0)
        : 0;
    const tax_amount = 0.05;
    const total_excl = +(0.05 * +total).toFixed(2);
    const shipping_amount = lodash.get(cart, "cartShippingMethods.price", 0);
    const discount_amount = lodash.get(cart, "cartDiscount.value", 0);
    const currency = "USD";
    const totalPayment =
      (total + tax_amount + shipping_amount) * discount_amount;

    if (cart) {
      const products =
        cart?.listCartItem?.length > 0
          ? cart?.listCartItem.map((item) => {
              const { productCartItem, product_id, quantity, price, options } =
                item || {};
              const { name, sku, image } = productCartItem || {};
              return {
                product_id,
                quantity,
                price,
                options,
                name,
                sku,
                image: JSON.parse(image),
              };
            })
          : [];
      return notificationMessageSuccess(res, {
        cart: {
          cart_id: cart?.cart_id,
          total_quantity: cart?.listCartItem.length || 0,
          price: {
            total,
            total_excl,
            total_payment: total ? +totalPayment.toFixed(2) : 0,
            tax_amount,
            shipping_amount,
            discount_amount,
            currency,
          },
          payment_methods: cart?.cartPaymentMethod,
          shipping_method: cart?.cartShippingMethods,
          shipping_address: cart?.cartShippingAddress,
          products,
        },
      });
    }
    return notificationMessageError(res, "Cannot find cart");
  } catch (error) {
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
  try {
    const cart_id = generateCartId();
    const cart = await Cart.create({ cart_id });
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
