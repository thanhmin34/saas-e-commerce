const Joi = require("joi");
const asyncHandler = require("express-async-handler");
const { Icons } = require("../models");
const {
  notificationMessageSuccess,
} = require("../utils/notificationMessageStatus");

const getIcons = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const id = 1;
  try {
    const icons = await Icons.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!icons?.id) {
      return notificationMessageError(res, "Internal Server Error ");
    }
    return notificationMessageSuccess(res, {
      status: true,
      icons,
    });
  } catch (error) {}
});

const createIcons = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { icons } = body || {};
  const {
    logo,
    icon_cart_header,
    icon_wishlist_header,
    icon_account_header,
    icon_profile,
    icon_my_address,
    icon_my_wishlist,
    icon_my_orders,
    icon_my_return,
    icon_disabled,
    icon_delete_account,
    icon_sign_out,
  } = icons || {};

  try {
    const icon = await Icons.create({
      logo,
      icon_cart_header,
      icon_wishlist_header,
      icon_account_header,
      icon_profile,
      icon_my_address,
      icon_my_wishlist,
      icon_my_orders,
      icon_my_return,
      icon_disabled,
      icon_delete_account,
      icon_sign_out,
    });
    if (!icon?.id)
      return notificationMessageError(
        res,
        "The icons failed to create success"
      );

    return notificationMessageSuccess(res, {
      status: true,
      message: "Create icons successfully",
    });
  } catch (error) {}
});

module.exports = {
  getIcons,
  createIcons,
};
