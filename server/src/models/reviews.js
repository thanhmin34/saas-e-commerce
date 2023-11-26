"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    static associate(models) {}
  }
  Reviews.init(
    {
      user_name: DataTypes.STRING,
      message: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Reviews",
    }
  );
  return Reviews;
};
