"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Gender extends Model {
    static associate(models) {
      Gender.belongsToMany(models.User, {
        through: "users_gender",
      });
    }
  }
  Gender.init(
    {
      gender_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Gender",
    }
  );
  return Gender;
};
