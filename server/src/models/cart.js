"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.hasOne(models.CartList, {
        foreignKey: "cart_id",
        as: "cart_list",
      });
    }
  }
  Cart.init(
    {
      customer_id: DataTypes.INTEGER,
      total_amount: DataTypes.STRING,
      cart_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
