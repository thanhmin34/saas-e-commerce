"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: "id",
        as: "userCart",
      });
      Cart.hasMany(models.CartItem, {
        foreignKey: "cart_id",
        as: "listCartItem",
      });
      Cart.belongsTo(models.PaymentMethods, {
        foreignKey: "payment_method_id",
        as: "cartPaymentMethod",
      });

      Cart.belongsTo(models.ShippingMethods, {
        foreignKey: "shipping_method_id",
        as: "cartShippingMethods",
      });
      Cart.belongsTo(models.Discount, {
        foreignKey: "discount_id",
        as: "cartDiscount",
      });
    }
  }
  Cart.init(
    {
      customer_id: DataTypes.INTEGER,
      total_amount: DataTypes.FLOAT,
      total_payment: DataTypes.FLOAT,
      cart_id: DataTypes.STRING,
      shipping_method_id: DataTypes.INTEGER,
      payment_method_id: DataTypes.INTEGER,
      billing_address: DataTypes.STRING,
      notes: DataTypes.STRING,
      discount_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
