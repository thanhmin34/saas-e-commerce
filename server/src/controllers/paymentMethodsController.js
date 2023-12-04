const asyncHandler = require("express-async-handler");

const {
  notificationMessageSuccess,
  notificationMessageError,
} = require("../utils/notificationMessageStatus");
const { PaymentMethods, Cart } = require("../models");

const getPaymentMethods = asyncHandler(async (req, res) => {
  const { body } = req || {};
  try {
    const paymentMethodList = await PaymentMethods.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    console.log("paymentMethodList", paymentMethodList);
    if (!paymentMethodList) {
      return notificationMessageError(res, "Cannot find payment Method");
    }

    return notificationMessageSuccess(res, {
      data: paymentMethodList,
    });
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

const selectPaymentMethodToCart = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { cart_id, payment_methods } = body || {};
  const { id } = payment_methods || {};
  try {
    if (!id) return notificationMessageError(res, "Payment method unavailable");
    const newCart = await Cart.update(
      {
        payment_method_id: id,
      },
      {
        where: { cart_id },
      }
    );
    if (!newCart) {
      return notificationMessageError(res, "Cannot add payment method");
    }
    return notificationMessageSuccess(res, {
      status: true,
      message: "Add payment to cart successfully",
    });
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

module.exports = {
  getPaymentMethods,
  selectPaymentMethodToCart,
};
