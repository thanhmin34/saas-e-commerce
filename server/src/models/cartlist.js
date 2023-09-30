"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartList extends Model {
    static associate(models) {
      CartList.belongsTo(models.Cart, {
        foreignKey: "id",
        as: "cartCartList",
      });
      CartList.belongsToMany(models.Products, {
        through: "ProductCartList",
      });
    }
  }
  CartList.init(
    {
      cart_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CartList",
    }
  );
  return CartList;
};
