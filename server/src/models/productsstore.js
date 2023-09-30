"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductsStore extends Model {
    static associate(models) {}
  }
  ProductsStore.init(
    {
      productId: DataTypes.INTEGER,
      storeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductsStore",
    }
  );
  return ProductsStore;
};
