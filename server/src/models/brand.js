"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Brand.hasMany(models.Products, {
        foreignKey: "id",
        as: "ProductsBrand",
      });
    }
  }
  Brand.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Brand",
    }
  );
  return Brand;
};
