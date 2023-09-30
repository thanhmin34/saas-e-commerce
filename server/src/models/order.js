"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "id",
        as: "userOrder",
      });
      Order.belongsToMany(models.Products, {
        through: "ProductOrders",
      });
    }
  }
  Order.init(
    {
      customer_id: DataTypes.INTEGER,
      total_amount: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
