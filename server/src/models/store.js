"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    static associate(models) {
      Store.belongsToMany(models.Products, {
        through: "ProductsStore",
      });
    }
  }
  Store.init(
    {
      title: DataTypes.STRING,
      address: DataTypes.STRING,
      value: DataTypes.STRING,
      currency: DataTypes.STRING,
      product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Store",
    }
  );
  return Store;
};
