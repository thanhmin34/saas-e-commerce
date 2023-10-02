"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      CartItem.belongsTo(models.Cart, {
        foreignKey: "id",
        as: "listCartItem",
      });
      CartItem.belongsTo(models.Products, {
        as: "productCartItem",
        foreignKey: "product_id",
      });
    }
  }
  CartItem.init(
    {
      cart_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      options: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "CartItem",
    }
  );
  return CartItem;
};
