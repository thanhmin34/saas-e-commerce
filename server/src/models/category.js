"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {
      Categories.belongsToMany(models.Products, {
        through: "ProductCategories",
      });
      Categories.hasMany(models.Categories, {
        foreignKey: "parent_id",
        as: "children_category",
      });
    }
  }
  Categories.init(
    {
      name: DataTypes.STRING,
      parent_id: DataTypes.INTEGER,
      image: DataTypes.JSON,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Categories",
    }
  );
  return Categories;
};
