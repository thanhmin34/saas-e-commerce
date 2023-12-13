const asyncHandler = require("express-async-handler");
const {
  Categories,
  ProductCategories,
  Products,
  Reviews,
  User,
} = require("../models");
const {
  notificationMessageSuccess,
  notificationMessageError,
} = require("../utils/notificationMessageStatus");
const Joi = require("joi");
const { Op } = require("sequelize");
const { checkFilterByCategory, totalRating } = require("../utils/helper");
const { DEFAULT_CURRENT_PAGE } = require("../constants/variables");

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
  const SORT_ORDERS_TITLE = ["ASC", "DESC"];

  const { query } = req || {};
  const {
    id,
    current_page = DEFAULT_CURRENT_PAGE,
    page_size = 20,
    order_name,
    order_value,
    filter_by_price_value,
    filter_by_price_type,
    filter_by_category_value,
  } = query || {};

  try {
    Categories.findByPk(id, {
      attributes: {
        exclude: ["createdAt", "updatedAt", "image", "slug"],
      },
      include: {
        model: Categories,
        as: "children_category",
        attributes: ["id", "name", "parent_id", "title"],
      },
    })
      .then(async (category) => {
        console.log("category", category);
        if (!category) {
          return notificationMessageError(res, "Category does not exist");
        }
        const filter = {};

        if (filter_by_price_value && filter_by_price_type) {
          if (Array.isArray(filter_by_price_value)) {
            filter.price = {
              [Op.between]: filter_by_price_value,
            };
          } else {
            const key = filter_by_price_type === "gte" ? "gte" : "lte";
            filter.price = {
              [Op[key]]: +filter_by_price_value,
            };
          }
        }

        const listChildCategory =
          category.children_category?.length > 0
            ? category.children_category.map((item) => item?.id)
            : [];

        const idsCategory = filter_by_category_value
          ? checkFilterByCategory(filter_by_category_value)
          : [id, ...listChildCategory];

        // sort
        const order =
          order_name && order_value && SORT_ORDERS_TITLE.includes(order_value)
            ? [[order_name, order_value]]
            : [];

        const offset = (+current_page - 1) * +page_size;

        const products = await Products.findAndCountAll({
          distinct: true,
          where: filter,
          attributes: {
            exclude: ["createdAt", "updatedAt", "seo", "brand", "Categories"],
          },
          include: [
            {
              model: Categories,
              through: ProductCategories,
              where: {
                // filter By Category
                id: idsCategory,
              },
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: Reviews,
              as: "review_list",
              attributes: ["rating", "id", "product_id"],
            },
          ],
          limit: +page_size,
          offset: offset,
          order,
        });

        const newProducts = products?.rows.map((item) => {
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
            media_gallery,
            review_list,
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
            media_gallery,
            brand,
            url_path,
            special_price,
            special_to_date,
            special_from_date,
            review_count: review_list?.length,
            total_rating: totalRating(review_list),
          };
        });
        return notificationMessageSuccess(res, {
          products: newProducts,
          total_count: products?.count,
          category,
        });
      })
      .catch((error) => {
        return notificationMessageError(res, error);
      });
  } catch (error) {
    return notificationMessageError(res, error);
  }
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
