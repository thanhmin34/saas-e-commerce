const Joi = require("joi");
const asyncHandler = require("express-async-handler");
const lodash = require("lodash");
const { Cart, CartItem, Products } = require("../models");
const {
  notificationMessageError,
  notificationMessageSuccess,
} = require("../utils/notificationMessageStatus");

const addProductSchema = Joi.object({
  cart_id: Joi.string().required(),
  product: Joi.object({
    id: Joi.number().required(),
    sku: Joi.string().required(),
    quantity: Joi.number().required(),
  }),
});

const deleteProductSchema = Joi.object({
  cart_id: Joi.string().required(),
  product: Joi.object({
    product_id: Joi.number().required(),
  }),
});

const validateFieldBySchema = (data, schema) => {
  return schema.validate(data);
};

const addProductToCart = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { cart_id, product } = body || {};
  const { id, quantity, price, options } = product || {};
  try {
    const { error } = validateFieldBySchema(body, addProductSchema);
    if (error) {
      return notificationMessageError(res, error.details[0].message);
    }

    const cart = await Cart.findOne({
      where: { cart_id },
    });
    if (!cart?.id)
      return notificationMessageError(res, "Unable to add product to cart");

    const product = await Products.findOne({
      where: { id: id },
    });

    if (!product?.id)
      return notificationMessageError(res, "cannot find product");

    const checkCartItem = await CartItem.findOne({
      where: { cart_id: cart?.id, product_id: id },
    });
    console.log("checkCartItem....", checkCartItem);
    if (!checkCartItem) {
      const item = await CartItem.create({
        cart_id: cart?.id,
        product_id: id,
        quantity,
        price,
        options,
      });
      if (item?.id)
        return notificationMessageSuccess(res, {
          status: true,
          message: "Product added successfully",
        });
    }
    checkCartItem.quantity += quantity;
    await checkCartItem.save();
    return notificationMessageSuccess(res, {
      status: true,
      message: "Update Product successfully",
    });
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

const deleteProductToCart = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { product, cart_id } = body || {};
  const { product_id } = product || {};
  try {
    const cart = await Cart.findOne({
      where: { cart_id },
      attributes: ["id"],
      include: {
        model: CartItem,
        as: "listCartItem",
        where: {
          product_id,
        },
        attributes: ["id"],
      },
    });

    const cartItemId = lodash.get(cart, "listCartItem[0].id");
    if (!cartItemId) notificationMessageError(res, "cannot find product");

    await CartItem.destroy({
      where: {
        id: cartItemId,
      },
    });
    return notificationMessageSuccess(res, {
      status: true,
      message: "Delete product successfully",
    });
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

const updateProductToCart = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { cart_id, product } = body || {};
  const { product_id, quantity } = product || {};
  try {
    const { error } = validateFieldBySchema(body, addProductSchema);
    if (error) {
      return notificationMessageError(res, error.details[0].message);
    }

    const cart = await Cart.findOne({
      where: { cart_id },
      attributes: ["id"],
      include: {
        model: CartItem,
        as: "listCartItem",
        where: {
          product_id,
        },
        attributes: ["id"],
      },
    });

    if (!cart?.id)
      return notificationMessageError(res, "Unable to add product to cart");

    const cartItemId = lodash.get(cart, "listCartItem[0].id");
    if (!cartItemId) notificationMessageError(res, "cannot find product");

    await CartItem.update(
      {
        quantity,
      },
      {
        where: {
          id: cartItemId,
        },
      }
    );

    notificationMessageSuccess(res, {
      status: true,
      message: "update product successfully",
      cart,
    });
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

module.exports = { addProductToCart, deleteProductToCart, updateProductToCart };
