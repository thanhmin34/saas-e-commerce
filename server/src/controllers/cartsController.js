const Joi = require("joi");
const asyncHandler = require("express-async-handler");
const {
  notificationMessageSuccess,
  notificationMessageError,
} = require("../utils/notificationMessageStatus");
const { generateCartId } = require("../utils/generateCartId");
const {
  Cart,
  ShippingMethods,
  PaymentMethod,
  Discount,
  CartItem,
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
        // {
        //   model: CartItem,
        //   as: "listCartItem",
        //   attributes: {
        //     exclude: fieldExclude,
        //   },
        // },
        // {
        //   model: PaymentMethod,
        //   as: "cartPaymentMethod",
        //   attributes: {
        //     exclude: fieldExclude,
        //   },
        // },
        {
          model: ShippingMethods,
          as: "cartShippingMethods",
          attributes: {
            exclude: fieldExclude,
          },
        },
        // {
        //   model: Discount,
        //   as: "cartDiscount",
        //   attributes: {
        //     exclude: fieldExclude,
        //   },
        // },
        // {
        //   model: CartList,
        //   as: "cartCartList",
        //   attributes: {
        //     exclude: fieldExclude,
        //   },
        //   include: [
        //     {
        //       model: Products,
        //     },
        //   ],
        // },
      ],
    });

    if (cart) {
      return notificationMessageSuccess(res, {
        cart,
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