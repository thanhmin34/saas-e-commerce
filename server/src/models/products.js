"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Products.init(
    {
      sku: DataTypes.STRING,
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      description: DataTypes.STRING,
      images: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
      },
      special_price: DataTypes.JSON,
      thumbnail: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      test: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
