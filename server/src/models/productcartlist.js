"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductCartList extends Model {
    static associate(models) {}
  }
  ProductCartList.init(
    {
      productId: DataTypes.INTEGER,
      cartListId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductCartList",
    }
  );
  return ProductCartList;
};
