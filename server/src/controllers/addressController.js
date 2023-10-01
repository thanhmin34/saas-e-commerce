const Joi = require("joi");
const asyncHandler = require("express-async-handler");
const {
  notificationMessageSuccess,
  notificationMessageError,
} = require("../utils/notificationMessageStatus");
const { ShippingAddress, Cart } = require("../models");

const addressSchema = Joi.object({
  cart_id: Joi.string().required(),
  address: Joi.object({
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    post_code: Joi.number().required(),
    phone: Joi.string().required(),
    email: Joi.string().email(),
  }),
});

const validateFieldBySchema = (data, schema) => {
  return schema.validate(data);
};

const addShippingAddress = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { cart_id, address } = body || {};
  const { country, city, street, post_code, email, phone } = address || {};
  try {
    const { error } = validateFieldBySchema(body, addressSchema);
    if (error) {
      return notificationMessageError(res, error.details[0].message);
    }

    const cart = await Cart.findOne({
      where: {
        cart_id,
      },
      attributes: ["id"],
      include: {
        model: ShippingAddress,
        as: "cartShippingAddress",
        attributes: ["id"],
      },
    });

    const addressId = cart?.cartShippingAddress?.id;
    if (!addressId) {
      await ShippingAddress.create({
        country,
        city,
        street,
        post_code,
        email,
        phone,
        cart_id: cart?.id,
      });
    } else {
      await ShippingAddress.update(address, { where: { id: addressId } });
    }

    return notificationMessageSuccess(res, {
      message: "Save address success fully",
      status: true,
    });
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

module.exports = {
  addShippingAddress,
};
