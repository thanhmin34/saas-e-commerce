"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wishlist.hasMany(models.Products, {
        foreignKey: "id",
        as: "ProductsWishlist",
      });
    }
  }
  Wishlist.init(
    {
      customer_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Wishlist",
    }
  );
  return Wishlist;
};
