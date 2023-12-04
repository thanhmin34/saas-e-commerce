"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShippingAddress extends Model {
    static associate(models) {
      ShippingAddress.belongsTo(models.Cart, {
        foreignKey: "id",
        as: "cartShippingAddress",
      });
      ShippingAddress.belongsTo(models.User, {
        foreignKey: "customer_id",
        as: "customerShippingAddress",
      });
    }
  }
  ShippingAddress.init(
    {
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      email: DataTypes.STRING,
      street: DataTypes.STRING,
      post_code: DataTypes.INTEGER,
      phone: DataTypes.STRING,
      customer_id: DataTypes.INTEGER,
      cart_id: DataTypes.INTEGER,
      tempLatLng: DataTypes.JSON,
      address_number: DataTypes.STRING,
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      label: DataTypes.STRING,
      region: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ShippingAddress",
    }
  );
  return ShippingAddress;
};
