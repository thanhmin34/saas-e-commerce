const Joi = require("joi");
const asyncHandler = require("express-async-handler");
const {
  notificationMessageSuccess,
  notificationMessageError,
} = require("../utils/notificationMessageStatus");
const { Address, User } = require("../models");
const { getToken } = require("../utils/getToken");

const addressSchema = Joi.object({
  address: Joi.object({
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    post_code: Joi.string().required(),
    phone: Joi.string().required(),
    region: Joi.string().required(),
    email: Joi.string(),
    tempLatLng: Joi.object({
      latitude: Joi.number().allow("", null).optional(),
      longitude: Joi.number().allow("", null).optional(),
    })
      .allow(null)
      .optional(),
    address_number: Joi.string().allow("").optional(),
    label: Joi.string().allow("").optional(),
    first_name: Joi.string().allow("").optional(),
    last_name: Joi.string().allow("").optional(),
    is_default_address: Joi.boolean().allow("").optional(),
  }),
});

const validateFieldBySchema = (data, schema) => {
  return schema.validate(data);
};

const addMyAddress = asyncHandler(async (req, res) => {
  const { headers, body } = req || {};

  const { address } = body || {};

  try {
    const { error } = validateFieldBySchema(body, addressSchema);
    if (error) {
      return notificationMessageError(res, error.details[0].message);
    }

    const token = getToken(headers);
    const user = await User.findOne({
      where: {
        token,
      },
      attributes: ["id", "token"],
      include: {
        model: Address,
        as: "userAddress",
      },
    });

    if (!user) {
      return notificationMessageError(res, "Invalid user");
    }

    const params = {
      ...address,
      customer_id: user?.id,
    };

    const newAddress = await Address.create(params);

    return notificationMessageSuccess(res, {
      message: "Create address successfully",
      status: true,
      newAddress,
    });
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

const getMyAddress = asyncHandler(async (req, res) => {
  const { headers } = req || {};

  try {
    const token = getToken(headers);
    const user = await User.findOne({
      where: {
        token,
      },
      attributes: ["token", "id"],
      include: {
        model: Address,
        as: "userAddress",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });
    if (!user) {
      return notificationMessageError(res, "Invalid token");
    }

    return notificationMessageSuccess(res, {
      message: "get address successfully",
      status: true,
      address: user?.userAddress || [],
    });
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

const deleteMyAddress = asyncHandler(async (req, res) => {
  const { headers, params } = req || {};
  const { id } = params || {};

  try {
    const token = getToken(headers);
    const user = await User.findOne({
      where: {
        token,
      },
      attributes: ["token", "id"],
      include: {
        model: Address,
        as: "userAddress",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });
    if (!user) {
      return notificationMessageError(res, "Invalid token");
    }
    console.log("user", user);
    console.log("id", id);
    const isSuccess = await Address.destroy({
      where: {
        id,
      },
    });
    if (!isSuccess)
      return notificationMessageError(res, "Cannot delete Address");

    return notificationMessageSuccess(res, {
      message: "delete address success fully",
      status: true,
      isSuccess,
    });
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

module.exports = {
  addMyAddress,
  getMyAddress,
  deleteMyAddress,
};
