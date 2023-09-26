"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductVaritions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductVaritions.init(
    {
      price: DataTypes.FLOAT,
      product_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      image: DataTypes.STRING,
      attribute_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductVaritions",
    }
  );
  return ProductVaritions;
};
