const Joi = require("joi");
const asyncHandler = require("express-async-handler");
const { Styles } = require("../models");
const {
  notificationMessageSuccess,
} = require("../utils/notificationMessageStatus");

const getStyles = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const id = 1;
  try {
    const styles = await Styles.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!styles?.id) {
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
    } = styles;
    return notificationMessageSuccess(res, {
      status: true,
      styles: {
        button: JSON.parse(button),
        font_size,
        font_weight,
        hover_text,
        hover_background_color,
        background_color,
        color,
      },
    });
  } catch (error) {}
});

const createStyles = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { styles } = body || {};
  const {
    button,
    font_size,
    font_weight,
    hover_text,
    hover_background_color,
    background_color,
    color,
  } = styles || {};

  try {
    const stylesItem = await Styles.create({
      button,
      font_size,
      font_weight,
      hover_text,
      hover_background_color,
      background_color,
      color,
    });
    if (!stylesItem?.id)
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
  getStyles,
  createStyles,
};
