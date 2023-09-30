"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PaymentMethods extends Model {
    static associate(models) {
      PaymentMethods.hasMany(models.Cart, {
        foreignKey: "payment_method_id",
        as: "cartPaymentMethod",
      });
    }
  }
  PaymentMethods.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PaymentMethods",
    }
  );
  return PaymentMethods;
};
