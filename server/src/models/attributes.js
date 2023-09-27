"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Attributes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Attributes.belongsToMany(models.ProductsVariations, {
        through: "ProductsAttribute",
      });
      Attributes.belongsTo(models.AttributesValue, {
        foreignKey: "attribute_code",
        as: "ProductsAttributeValue",
      });
    }
  }
  Attributes.init(
    {
      code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Attributes",
    }
  );
  return Attributes;
};
