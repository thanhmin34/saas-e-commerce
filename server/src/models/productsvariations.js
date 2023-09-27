"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductsVariations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductsVariations.belongsTo(models.Products, {
        foreignKey: "id",
        as: "ProductsChildren",
      });

      ProductsVariations.belongsToMany(models.Attributes, {
        through: "ProductsAttribute",
      });
    }
  }
  ProductsVariations.init(
    {
      attribute_id: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
      quantity: DataTypes.INTEGER,
      image: DataTypes.STRING,
      product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductsVariations",
    }
  );
  return ProductsVariations;
};
