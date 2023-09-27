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
      Products.belongsToMany(models.Store, { through: "ProductsStore" });
      Products.belongsTo(models.Brand, {
        foreignKey: "product_id",
        as: "ProductsBrand",
      });
      Products.belongsToMany(models.Category, { through: "ProductsCategory" });

      Products.hasMany(models.Rating, {
        foreignKey: "product_id",
        as: "ProductsRating",
      });
      Products.belongsTo(models.Wishlist, {
        foreignKey: "product_id",
        as: "ProductsWishlist",
      });
      Products.hasMany(models.ProductsVariations, {
        foreignKey: "product_id",
        as: "ProductsChildren",
      });
    }
  }
  Products.init(
    {
      sku: DataTypes.STRING,
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      description: DataTypes.STRING,
      // images: {
      //   type: DataTypes.ARRAY(DataTypes.JSON),
      //   allowNull: true,
      // },
      special_price: DataTypes.JSON,
      thumbnail: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      // test: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
