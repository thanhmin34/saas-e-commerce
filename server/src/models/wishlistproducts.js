"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WishlistProducts extends Model {
    static associate(models) {}
  }
  WishlistProducts.init(
    {
      productId: DataTypes.INTEGER,
      wishlistId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "WishlistProducts",
    }
  );
  return WishlistProducts;
};
