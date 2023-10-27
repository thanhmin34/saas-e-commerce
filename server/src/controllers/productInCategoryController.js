const asyncHandler = require("express-async-handler");
const { Categories, ProductCategories, Products } = require("../models");
const {
  notificationMessageSuccess,
  notificationMessageError,
} = require("../utils/notificationMessageStatus");
const Joi = require("joi");

const validateProductInCategory = Joi.object({
  category_id: Joi.number().required(),
  products: Joi.array().items(Joi.number().required()),
});

const schemaCreateProductInCategory = (data, schema) => {
  return schema.validate(data);
};

const insertProductInCategory = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { category_id, products } = body || {};

  try {
    const { error } = schemaCreateProductInCategory(
      body,
      validateProductInCategory
    );

    if (error) {
      return notificationMessageError(res, error.details[0].message);
    }

    const data = products.map((item) => {
      return new Promise(async (resolve, reject) => {
        const results = await ProductCategories.create({
          ProductId: item,
          CategoryId: category_id,
        });
        resolve(results);
      });
    });

    Promise.all(data)
      .then((data) => {
        return notificationMessageSuccess(res, {
          status: true,
          message: "Add products in category successfully",
          data,
        });
      })
      .catch((error) =>
        notificationMessageError(res, "Internal Server Error 1")
      );
  } catch (error) {
    return notificationMessageError(res, "Internal Server Error 2");
  }
});

const getProductsInCategory = asyncHandler(async (req, res) => {
  const { query } = req || {};
  const { id } = query || {};
  try {
    const products = await Categories.findOne({
      where: { id },
      attributes: ["id"],
      include: [
        {
          model: Products,
          through: "ProductCategories",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "ProductCategories",
              "wishlist_id",
              "seo",
              "media_gallery",
              "description",
            ],
          },
        },
      ],
    });

    if (!products) {
      return notificationMessageError(res, "Internal Server Error ");
    }

    const newProducts = products?.Products.map((item) => {
      const {
        id,
        sku,
        name,
        price,
        quantity,
        label,
        type,
        image,
        brand,
        url_path,
        special_price,
        special_to_date,
        special_from_date,
      } = item || {};
      return {
        id,
        sku,
        name,
        price,
        quantity,
        label,
        type,
        image,
        brand,
        url_path,
        special_price,
        special_to_date,
        special_from_date,
      };
    });
    return notificationMessageSuccess(res, {
      status: true,
      products: newProducts,
    });
  } catch (error) {}
});

const urlResolver = asyncHandler(async (req, res) => {
  const { query } = req || {};
  const { url, type_url } = query || {};

  try {
    const types = {
      product_list: Categories,
      product_details: Products,
      // cms:
    };
    const Modal = types[type_url] ? types[type_url] : Categories;

    const categoryItem = await Modal.findOne({
      where: { slug: url },
      attributes: ["slug", "id"],
    });

    if (!categoryItem) {
      return notificationMessageError(res, "Internal Server Error ");
    }

    return notificationMessageSuccess(res, {
      status: true,
      resolve_url: categoryItem,
    });
  } catch (error) {}
});

module.exports = {
  insertProductInCategory,
  getProductsInCategory,
  urlResolver,
};
