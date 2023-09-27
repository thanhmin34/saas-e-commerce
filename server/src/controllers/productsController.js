const Joi = require("joi");
const asyncHandler = require("express-async-handler");
const { Products, Store } = require("../models");

const {
  notificationMessageError,
  notificationMessageSuccess,
} = require("../utils/notificationMessageStatus");
// validateField
const createUserSchema = Joi.object({
  sku: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  store: Joi.number().required(),
});

const validateField = (data, schema) => {
  return schema.validate(data);
};

const getProducts = asyncHandler(async (req, res) => {
  const { body } = req || {};

  try {
  } catch (error) {}
});

const CreateProducts = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { product } = body || {};
  const {
    sku,
    name,
    price,
    quantity,
    store_id,
    description,
    thumbnail,
    special_price,
  } = product || {};

  try {
    const isValid = await Products.findOne({
      where: {
        sku: sku,
      },
    });

    if (isValid)
      return notificationMessageError(res, "Product sku already exists");

    const newProduct = await Products.create({
      sku,
      name,
      price,
      quantity,
      description,
      thumbnail,
      special_price,
      store_id,
    });

    if (newProduct) {
      notificationMessageSuccess(
        res,
        {
          status: true,
          message: "Create product successfully",
          product: newProduct,
        },
        201
      );
    }
  } catch (error) {}
});

const uploadImageByProduct = asyncHandler(async (req, res) => {
  const { file } = req;
  console.log("file", file);
  try {
    return res.status(201).json({ url: "test" });
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = {
  getProducts,
  CreateProducts,
  uploadImageByProduct,
};
