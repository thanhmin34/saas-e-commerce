const moment = require("moment");
const asyncHandler = require("express-async-handler");
const {
  notificationMessageError,
  notificationMessageSuccess,
} = require("../utils/notificationMessageStatus");
const {
  Products,
  Wishlist,
  User,
  WishlistProducts,
  Reviews,
} = require("../models");
const lodash = require("lodash");
const { getToken } = require("../utils/getToken");
const { totalRating } = require("../utils/helper");
const getWishlistsByUser = asyncHandler(async (req, res) => {
  const { query, headers } = req || {};

  try {
    const token = getToken(headers);

    const user = await User.findOne({
      where: { token },
      attributes: ["id"],
      include: [
        {
          model: Wishlist,
          as: "userWishlist",
          attributes: ["id", "customer_id"],
          include: [
            {
              model: Products,
              through: WishlistProducts,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
              include: {
                model: Reviews,
                as: "review_list",
                attributes: ["rating", "id", "product_id"],
              },
            },
          ],
        },
      ],
    });

    if (!user) return notificationMessageError(res, "Cannot found wishlist");
    const products = user?.userWishlist?.Products;
    const wishlist_id = user?.userWishlist?.id;
    let newProducts = [];
    if (products?.length > 0) {
      newProducts = products.map((item) => {
        const {
          id,
          sku,
          name,
          price,
          special_price,
          special_to_date,
          special_from_date,
          quantity,
          label,
          type,
          image,
          url_path,
          review_list,
        } = item || {};
        let enabledSpecialPrice = false;
        if (!!special_to_date && !!special_from_date && special_price) {
          const nowDate = new Date();
          const day = moment(nowDate).format("YYYY-MM-DD");
          const toDate = moment(special_to_date).format("YYYY-MM-DD");
          const fromDate = moment(special_from_date).format("YYYY-MM-DD");

          enabledSpecialPrice = day >= fromDate && day <= toDate;
        }

        return {
          id,
          wishlist_id,
          sku,
          name,
          price,
          special_price: enabledSpecialPrice ? special_price : null,
          special_to_date,
          special_from_date,
          quantity,
          label,
          type,
          image: JSON.parse(image),
          url_path,
          review_count: review_list?.length || 0,
          total_rating: totalRating(review_list),
          out_of_stock: quantity <= 0,
        };
      });
    }
    return notificationMessageSuccess(res, {
      products: newProducts,
    });
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

const addProductToWishlist = asyncHandler(async (req, res) => {
  const { body, headers } = req || {};
  const { customer_id, product_id } = body || {};
  try {
    const token = getToken(headers);

    const user = await User.findOne({
      where: { token },
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
