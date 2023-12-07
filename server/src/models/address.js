"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      Address.belongsTo(models.User, {
        foreignKey: "id",
        as: "userAddress",
      });
    }
  }
  Address.init(
    {
      customer_id: DataTypes.INTEGER,
      country: DataTypes.STRING,
      city: DataTypes.STRING,
      street: DataTypes.STRING,
      post_code: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      region: DataTypes.STRING,
      tempLatLng: DataTypes.JSON,
      address_number: DataTypes.STRING,
      label: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
