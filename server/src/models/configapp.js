"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ConfigApps extends Model {
    static associate(models) {}
  }
  ConfigApps.init(
    {
      button: DataTypes.JSON,
      font_size: DataTypes.STRING,
      font_weight: DataTypes.STRING,
      hover_text: DataTypes.STRING,
      hover_background_color: DataTypes.STRING,
      background_color: DataTypes.STRING,
      color: DataTypes.STRING,
      currency: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ConfigApps",
    }
  );
  return ConfigApps;
};
