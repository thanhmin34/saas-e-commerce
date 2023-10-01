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
} = require("../models");
const mergeCart = asyncHandler(async (req, res) => {
  const {} = req || {};
  try {
  } catch (error) {}
});

const getCartDetails = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { cart_id } = body || {};
  try {
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
      return notificationMessageSuccess(res, {
        cart: {
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
        },
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
};
