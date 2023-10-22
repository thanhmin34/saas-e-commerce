"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Icons extends Model {
    static associate(models) {}
  }
  Icons.init(
    {
      logo: DataTypes.STRING,
      icon_cart_header: DataTypes.STRING,
      icon_wishlist_header: DataTypes.STRING,
      icon_account_header: DataTypes.STRING,
      icon_profile: DataTypes.STRING,
      icon_my_address: DataTypes.STRING,
      icon_my_wishlist: DataTypes.STRING,
      icon_my_orders: DataTypes.STRING,
      icon_my_return: DataTypes.STRING,
      icon_disabled: DataTypes.STRING,
      icon_delete_account: DataTypes.STRING,
      icon_sign_out: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Icons",
    }
  );
  return Icons;
};
