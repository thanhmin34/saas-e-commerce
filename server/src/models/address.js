"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
