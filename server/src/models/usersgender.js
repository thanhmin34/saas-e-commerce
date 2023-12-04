"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UsersGender extends Model {
    static associate(models) {}
  }
  UsersGender.init(
    {
      userId: DataTypes.INTEGER,
      genderId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UsersGender",
    }
  );
  return UsersGender;
};
