"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      Products.belongsToMany(models.Store, {
        through: "ProductsStore",
      });

      Products.belongsToMany(models.Categories, {
        through: "ProductCategories",
      });

      Products.belongsTo(models.CartItem, {
        foreignKey: "id",
        as: "productCartItem",
      });

      Products.belongsToMany(models.Wishlist, {
        through: "WishlistProducts",
      });

      Products.hasMany(models.Evaluate, {
        foreignKey: "product_id",
        as: "ProductsEvaluate",
      });

      Products.hasMany(models.ProductsVariations, {
        foreignKey: "product_id",
        as: "ProductsChildren",
      });

      Products.belongsToMany(models.Wishlist, {
        through: "WishlistProducts",
      });
    }
  }
  Products.init(
    {
      sku: DataTypes.STRING,
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      description: DataTypes.STRING,
      special_price: DataTypes.JSON,
      special_to_date: DataTypes.STRING,
      special_from_date: DataTypes.STRING,
      media_gallery: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      label: DataTypes.STRING,
      type: DataTypes.STRING,
      image: DataTypes.JSON,
      seo: DataTypes.JSON,
      brand: DataTypes.STRING,
      wishlist_id: DataTypes.INTEGER,
      url_path: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
