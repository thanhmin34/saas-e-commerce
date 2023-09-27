"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Store.belongsToMany(models.Products, { through: "ProductsStore" });
    }
  }
  Store.init(
    {
      store_id: DataTypes.INTEGER,
      store_code: DataTypes.STRING,
      store_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Store",
    }
  );
  return Store;
};
