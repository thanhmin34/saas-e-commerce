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

      Order.belongsTo(models.Cart, {
        foreignKey: "cart_id",
        as: "cartOrder",
      });
    }
  }
  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
        defaultValue: 10000000,
      },
      customer_id: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
