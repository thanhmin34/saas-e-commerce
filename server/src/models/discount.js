"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    static associate(models) {
      Discount.hasMany(models.Cart, {
        foreignKey: "discount_id",
        as: "cartDiscount",
      });
    }
  }
  Discount.init(
    {
      name: DataTypes.STRING,
      code: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      value: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Discount",
    }
  );
  return Discount;
};
