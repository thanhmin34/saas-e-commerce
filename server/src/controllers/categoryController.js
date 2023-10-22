const Joi = require("joi");
const asyncHandler = require("express-async-handler");
const { Categories } = require("../models");
const {
  notificationMessageSuccess,
} = require("../utils/notificationMessageStatus");

const getAllCategory = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const id = 1;
  try {
    const styles = await Categories.findOne({
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

const createCategory = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { styles } = body || {};
  const { name, parent_id, image, title, description } = styles || {};
  const index = ".html";
  const slug = name ? `${name.replace(" ", "-")}${index}` : "";
  try {
    const stylesItem = await Categories.create({
      name,
      parent_id,
      image,
      title,
      description,
      slug,
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

const deleteCategory = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { styles } = body || {};

  try {
    const stylesItem = await Categories.create({});
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

const updateCategory = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { styles } = body || {};

  try {
    const stylesItem = await Categories.create({});
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

const getCategoryBySlug = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { styles } = body || {};

  try {
    const stylesItem = await Categories.create({});
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
  getAllCategory,
  getCategoryBySlug,
  createCategory,
  deleteCategory,
  updateCategory,
};
