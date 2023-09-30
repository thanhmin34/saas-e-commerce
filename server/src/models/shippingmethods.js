"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShippingMethods extends Model {
    static associate(models) {
      ShippingMethods.hasMany(models.Cart, {
        foreignKey: "shipping_method_id",
        as: "cartShippingMethods",
      });
    }
  }
  ShippingMethods.init(
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "ShippingMethods",
    }
  );
  return ShippingMethods;
};
