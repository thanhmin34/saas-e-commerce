const asyncHandler = require("express-async-handler");
const { Reviews } = require("../models");

const {
  notificationMessageError,
  notificationMessageSuccess,
} = require("../utils/notificationMessageStatus");
const {
  generateProductVariations,
} = require("../utils/generateProductVariations");
const Joi = require("joi");
const { totalRating } = require("../utils/helper");

const addReviewSchema = Joi.object({
  product_id: Joi.number().required(),
  message: Joi.string().trim().required(),
  user_name: Joi.string().trim().required(),
  rating: Joi.number().required(),
});

const validateField = (data, schema) => {
  return schema.validate(data);
};

const getListReviews = asyncHandler(async (req, res) => {
  const { params } = req || {};
  const { product_id } = params || {};

  if (!product_id) {
    return notificationMessageError(res, "product_id error");
  }
  try {
    const reviewList = await Reviews.findAll({
      where: { product_id },
      attributes: {
        exclude: ["updatedAt"],
      },
    });

    return notificationMessageSuccess(res, {
      status: true,
      message: "Get review successfully",
      reviewList: reviewList || [],
      total_rating: totalRating(reviewList),
      review_count: reviewList?.length,
    });
  } catch (error) {
    return notificationMessageSuccess(res, {
      product: error,
    });
  }
});

const addReview = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { product_id, rating, message, user_name } = body || {};

  const { error } = validateField(body, addReviewSchema);

  if (error) {
    return notificationMessageError(res, error.details[0].message);
  }
  try {
    const review = await Reviews.create({
      product_id,
      rating,
      user_name,
      createAt: new Date(),
      message,
    });

    if (!review) {
      return notificationMessageError(res, {
        status: false,
        message: "Cannot add review",
      });
    }

    return notificationMessageSuccess(res, {
      status: true,
      message: "add review successfully",
    });
  } catch (error) {
    return notificationMessageSuccess(res, {
      product: error,
    });
  }
});

const removeReviews = asyncHandler(async (req, res) => {
  const { params } = req || {};
  const { id } = params || {};

  if (!id) {
    return notificationMessageError(res, "id review error");
  }
  try {
    await Reviews.destroy({
      where: {
        id,
      },
    });

    return notificationMessageSuccess(res, {
      status: true,
      message: "Delete review successfully",
    });
  } catch (error) {
    return notificationMessageSuccess(res, {
      product: error,
    });
  }
});

module.exports = { addReview, getListReviews, removeReviews };
