"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AttributesValue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AttributesValue.belongsTo(models.Attributes, {
        foreignKey: "attribute_code",
        as: "ProductsAttributeValue",
      });
    }
  }
  AttributesValue.init(
    {
      attribute_code: DataTypes.STRING,
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AttributesValue",
    }
  );
  return AttributesValue;
};
