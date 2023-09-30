"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {
      Categories.belongsToMany(models.Products, {
        through: "ProductCategories",
      });
    }
  }
  Categories.init(
    {
      name: DataTypes.STRING,
      parent_id: DataTypes.INTEGER,
      image: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Categories",
    }
  );
  return Categories;
};
