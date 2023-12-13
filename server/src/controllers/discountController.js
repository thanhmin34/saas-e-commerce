const asyncHandler = require("express-async-handler");

const {
  notificationMessageSuccess,
  notificationMessageError,
} = require("../utils/notificationMessageStatus");
const { Discount, Cart } = require("../models");

const getAllDiscounts = asyncHandler(async (req, res) => {
  const { body } = req || {};
  try {
    const discountsList = await Discount.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!discountsList) {
      return notificationMessageError(res, "Internal server error");
    }

    return notificationMessageSuccess(res, {
      data: discountsList,
    });
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

const addDiscount = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { cart_id, code } = body || {};

  try {
    const discountItem = await Discount.findOne({
      where: {
        code,
      },
    });
    if (!discountItem?.id) {
      return notificationMessageError(res, "Wrong discount code");
    }

    const newCart = await Cart.update(
      {
        discount_id: discountItem?.id,
      },
      {
        where: { cart_id },
      }
    );
    if (!newCart?.length > 0) {
      return notificationMessageError(res, "Wrong discount code");
    }
    return notificationMessageSuccess(res, {
      status: true,
      message: "Apply the discount tool successfully",
    });
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

const removeDiscount = asyncHandler(async (req, res) => {
  const { body, query } = req || {};
  const { cart_id } = query || {};

  try {
    const newCart = await Cart.update(
      {
        discount_id: null,
      },
      {
        where: { cart_id },
      }
    );
    if (!newCart?.length > 0) {
      return notificationMessageError(res, "Wrong discount code");
    }
    return notificationMessageSuccess(res, {
      status: true,
      message: "Remove the discount tool successfully",
    });
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

module.exports = {
  addDiscount,
  removeDiscount,
  getAllDiscounts,
};
