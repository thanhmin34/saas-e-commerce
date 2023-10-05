const asyncHandler = require("express-async-handler");
const {
  notificationMessageError,
  notificationMessageSuccess,
} = require("../utils/notificationMessageStatus");
const { Products, Wishlist, User, WishlistProducts } = require("../models");
const lodash = require("lodash");
const { getToken } = require("../utils/getToken");
const getWishlistsByUser = asyncHandler(async (req, res) => {
  const { query } = req || {};

  const { userId } = query || {};
  try {
    const wishlist = await Wishlist.findOne({
      where: { customer_id: userId },
      attributes: ["customer_id", "id"],
      include: [
        {
          model: Products,
          through: WishlistProducts,
          attributes: ["id", "sku", "name"],
        },
      ],
    });
    return notificationMessageSuccess(res, { wishlist });
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

const addProductToWishlist = asyncHandler(async (req, res) => {
  const { body, headers } = req || {};
  const { customer_id, product_id } = body || {};
  try {
    const user = await User.findOne({
      where: { id: customer_id },
      attributes: ["id"],
      include: {
        model: Wishlist,
        as: "userWishlist",
        attributes: ["id"],
        include: {
          model: Products,
          through: WishlistProducts,
          attributes: ["id"],
        },
      },
    });

    const productWithWishlist = lodash.get(user, "userWishlist.Products", []);

    const invalid = productWithWishlist.findIndex(
      (item) => item.id == product_id
    );

    if (invalid > -1) {
      return notificationMessageError(
        res,
        "The product already exists in the favorites list"
      );
    }

    const params = {
      ProductId: product_id,
      WishlistId: user?.userWishlist?.id,
    };
    await WishlistProducts.create(params);

    return notificationMessageSuccess(res, {
      status: true,
      message: "Add product to wishlist successfully",
    });
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

const removeProductToWishlist = asyncHandler(async (req, res) => {
  const { query, headers } = req || {};
  const token = getToken(headers);
  const { productId } = query || {};

  try {
    const wishlist = await User.findOne({
      where: {
        token,
      },
      attributes: ["id"],
      include: {
        model: Wishlist,
        as: "userWishlist",
        attributes: ["id"],
      },
    });

    await WishlistProducts.destroy({
      where: { wishlistId: wishlist?.userWishlist?.id, productId: productId },
    });

    return notificationMessageSuccess(res, {
      status: true,
      message: "Remove product to wishlist success",
    });
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

module.exports = {
  getWishlistsByUser,
  addProductToWishlist,
  removeProductToWishlist,
};
