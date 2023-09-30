const asyncHandler = require("express-async-handler");

const {
  notificationMessageSuccess,
  notificationMessageError,
} = require("../utils/notificationMessageStatus");
const { ShippingMethods, Cart } = require("../models");

const getShippingMethods = asyncHandler(async (req, res) => {
  const { body } = req || {};
  try {
    const shippingMethodList = await ShippingMethods.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!shippingMethodList) {
      return notificationMessageError(res, "Cannot find shipping Method");
    }

    return notificationMessageSuccess(res, {
      data: shippingMethodList,
    });
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

const selectShippingMethodToCart = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { cart_id, shipping_methods } = body || {};
  const { id } = shipping_methods || {};
  try {
    const newCart = await Cart.update(
      {
        shipping_method_id: id,
      },
      {
        where: { cart_id },
      }
    );
    if (!newCart?.length > 0) {
      return notificationMessageError(res, "Cannot add shipping method");
    }
    return notificationMessageSuccess(res, {
      status: true,
      message: "Add shipping to cart successfully",
    });
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

module.exports = {
  getShippingMethods,
  selectShippingMethodToCart,
};
