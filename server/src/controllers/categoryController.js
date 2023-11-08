const Joi = require("joi");
const asyncHandler = require("express-async-handler");
const { Categories } = require("../models");
const {
  notificationMessageSuccess,
} = require("../utils/notificationMessageStatus");
const { Op } = require("sequelize");

async function insertProductInCategory(products) {
  return null;
}

const getAllCategory = asyncHandler(async (req, res) => {
  const categoryId = 0;
  try {
    const categoryList = await Categories.findAll({
      where: { parent_id: categoryId },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Categories,
        as: "children_category",
      },
    });

    if (!categoryList) {
      return notificationMessageError(res, "Internal Server Error ");
    }

    return notificationMessageSuccess(res, {
      status: true,
      categoryList,
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
