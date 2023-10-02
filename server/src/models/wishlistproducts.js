"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WishlistProducts extends Model {
    static associate(models) {}
  }
  WishlistProducts.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        field: "productId",
      },
      wishlistId: {
        type: DataTypes.INTEGER,
        field: "wishlistId",
      },
    },
    {
      sequelize,
      modelName: "WishlistProducts",
    }
  );
  return WishlistProducts;
};
