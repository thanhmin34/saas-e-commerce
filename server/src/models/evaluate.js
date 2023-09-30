"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Evaluate extends Model {
    static associate(models) {
      // define association here
    }
  }
  Evaluate.init(
    {
      start: DataTypes.STRING,
      comment: DataTypes.STRING,
      product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Evaluate",
    }
  );
  return Evaluate;
};
