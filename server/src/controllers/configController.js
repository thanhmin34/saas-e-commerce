const Joi = require("joi");
const asyncHandler = require("express-async-handler");
const { ConfigApps } = require("../models");
const {
  notificationMessageSuccess,
} = require("../utils/notificationMessageStatus");

const getConfig = asyncHandler(async (req, res) => {
  const id = 1;
  try {
    const config = await ConfigApps.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!config?.id) {
      return notificationMessageError(res, "Internal Server Error ");
    }

    const {
      button,
      font_size,
      font_weight,
      hover_text,
      hover_background_color,
      background_color,
      color,
      currency,
    } = config;
    return notificationMessageSuccess(res, {
      config_app: {
        button: JSON.parse(button),
        font_size,
        font_weight,
        hover_text,
        hover_background_color,
        background_color,
        color,
        currency,
        banner_checkout_left:
          "stores/15/Cart-Banner-Half-Shea-Butter-EN-min_1.png",
        banner_checkout_right:
          "stores/15/Cart-Banner-Free-Shipping-EN-min_1.png",
        url_media_backend: "https://media.9ten.cloud/media/",
        prefix_url_media: "snaptec/pwa/",
        national_flags_image: "",
      },
    });
  } catch (error) {}
});

const createConfig = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { config } = body || {};
  const {
    button,
    font_size,
    font_weight,
    hover_text,
    hover_background_color,
    background_color,
    color,
  } = config || {};

  try {
    const config = await ConfigApps.create({
      button,
      font_size,
      font_weight,
      hover_text,
      hover_background_color,
      background_color,
      color,
    });

    if (!config?.id)
      return notificationMessageError(
        res,
        "The styles failed to create success"
      );

    return notificationMessageSuccess(res, {
      status: true,
      message: "Create styles successfully",
    });
  } catch (error) {}
});

module.exports = {
  getConfig,
  createConfig,
};
