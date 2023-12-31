const Joi = require("joi");
const lodash = require("lodash");
const asyncHandler = require("express-async-handler");
const {
  Products,
  ProductsVariations,
  ProductsStore,
  Evaluate,
  Categories,
  ProductCategories,
  Wishlist,
  Reviews,
} = require("../models");
const data = require("./test.json");
const {
  notificationMessageError,
  notificationMessageSuccess,
} = require("../utils/notificationMessageStatus");
const {
  generateProductVariations,
} = require("../utils/generateProductVariations");
const { totalRating } = require("../utils/helper");
// validateField
const createProductSchema = Joi.object({
  sku: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  store: Joi.number().required(),
});

const validateField = (data, schema) => {
  return schema.validate(data);
};

const getProductsDetails = asyncHandler(async (req, res) => {
  const { params } = req || {};
  const { productSku } = params || {};

  const sku = productSku ? productSku.replace(".html", "") : "";
  try {
    const productDetail = await Products.findOne({
      where: { sku },

      include: [
        {
          model: ProductsVariations,
          as: "ProductsChildren",
        },
        {
          model: Evaluate,
          as: "ProductsEvaluate",
        },
        {
          model: Categories,
          through: "ProductCategories",
        },
        {
          model: Reviews,
          as: "review_list",
          attributes: ["rating", "id", "product_id"],
        },
      ],
    });

    const {
      id,
      sku: productSku,
      name,
      description,
      price,
      special_price,
      special_to_date,
      special_from_date,
      media_gallery,
      quantity,
      label,
      type,
      image,
      seo,
      brand,
      wishlist_id,
      url_path,
      description_short,
      ProductsChildren,
      review_list,
      // Categories,
    } = productDetail || {};

    return notificationMessageSuccess(res, {
      product: {
        id,
        sku: productSku,
        name,
        description,
        price,
        special_price,
        special_to_date,
        special_from_date,
        media_gallery,
        quantity,
        label,
        type,
        image,
        seo,
        brand,
        wishlist_id,
        url_path,
        description_short,
        total_rating: totalRating(review_list),
        review_count: review_list?.length,
        // category: Categories,
      },
    });
  } catch (error) {
    console.log("error", error);
    return notificationMessageSuccess(res, {
      product: error,
    });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { body, params } = req || {};
  const { productSku } = params || {};
  const { product } = body || {};
  const {
    store_id,
    sku,
    name,
    price,
    description,
    quantity,
    special_price,
    label,
    type,
    image,
    seo,
    brand,
  } = product || {};

  try {
    const product = await Products.findOne({
      where: {
        sku: productSku,
      },
    });

    if (product?.sku) {
      await Products.update(
        {
          store_id,
          sku,
          name,
          price,
          description,
          quantity,
          special_price,
          label,
          type,
          image,
          seo,
          brand,
        },
        {
          where: {
            sku: productSku,
          },
        }
      );
      return notificationMessageSuccess(res, {
        status: true,
        message: "Update product successfully",
      });
    }
    return notificationMessageError(res, "Product not found");
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { params } = req || {};
  const { productSku } = params || {};

  try {
    const product = await Products.findOne({
      where: { sku: productSku },
    });

    if (product?.id) {
      await Products.destroy({
        where: {
          sku: product?.sku,
        },
      });
      return notificationMessageSuccess(res, {
        status: true,
        message: "Delete product successfully",
      });
    }

    return notificationMessageError(res, "Product not found");
  } catch (error) {
    notificationMessageError(res, error);
  }
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
    type,
    extension_attributes,
  } = product || {};
  const { options } = extension_attributes || {};
  // create product simple
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
      type,
    });

    const suffix = ".html";
    // async function handleCreate(item) {
    //   const {
    //     brand_name,
    //     type_id,
    //     sku,
    //     name,
    //     salable_qty,
    //     image,
    //     media_gallery,
    //     price,
    //     price_range,
    //   } = item;

    //   const value = await Products.create({
    //     sku,
    //     name,
    //     price:
    //       price_range?.maximum_price?.final_price?.value ||
    //       price_range?.maximum_price?.regular_price?.value ||
    //       43,
    //     quantity: salable_qty,
    //     image: image,
    //     store_id: 1,
    //     type: type_id,
    //     media_gallery,
    //     brand: brand_name,
    //     url_path: sku ? `${sku.replaceAll(" ", "-")}${suffix}` : sku,
    //   });
    // }
    // data.data.forEach((element) => {
    //   handleCreate(element);
    // });

    if (newProduct) {
      if (newProduct?.type === "configuration" && options?.length > 0) {
        const productVariations = generateProductVariations(options);
        productVariations.forEach((item) => {
          ProductsVariations.create({
            price: 0,
            quantity: 0,
            image: "",
            product_id: newProduct?.id,
            config: item,
          });
        });
      }
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
  } catch (error) {
    return res.status(404).send(error);
  }
});

const uploadImageByProduct = asyncHandler(async (req, res) => {
  const { files, body } = req;
  const { id } = body || {};

  try {
    const product = await Products.findOne({ where: { id } });

    if (!product?.id)
      return notificationMessageError(res, "Product does not exist");

    const olImages = product?.image ? JSON.parse(product?.image) : [];

    const newImages = lodash.map(files, (item) => ({
      name: "",
      alt: "",
      image: item?.path,
      type: [],
    }));

    const newProduct = await Products.update(
      {
        image: [...olImages, ...newImages],
      },
      {
        where: {
          id: product.id,
        },
      }
    );
    if (newProduct && newProduct[0]) {
      return notificationMessageSuccess(res, {
        message: "Update images successfully",
        status: true,
      });
    }
  } catch (error) {
    return res.status(400).send(error);
    // return notificationMessageError(res, { error });
  }
});

const addProductStore = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { product_id, store_id } = body || {};

  try {
    const productDetail = await ProductsStore.create({
      product_id,
      store_id,
    });

    return notificationMessageSuccess(res, {
      productDetail,
    });
  } catch (error) {}
});

module.exports = {
  getProductsDetails,
  CreateProducts,
  updateProduct,
  deleteProduct,
  uploadImageByProduct,
  addProductStore,
};
