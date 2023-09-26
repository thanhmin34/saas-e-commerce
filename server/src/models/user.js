"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const User = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Wallet, {
        foreignKey: "customer_id",
        as: "wallet",
      });
      User.hasOne(models.Cart, {
        foreignKey: "customer_id",
        as: "cart",
      });
      // User.belongsToMany(models.Order, {
      //   foreignKey: "customer_id",
      //   as: "order",
      // });
      // User.belongsToMany(models.Wishlist, {
      //   foreignKey: "customer_id",
      //   as: "wishlist",
      // });
      // User.belongsToMany(models.Address, {
      //   foreignKey: "customer_id",
      //   as: "address",
      // });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      password: DataTypes.STRING,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate(async (user) => {
    if (user.password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
    }
  });

  User.beforeUpdate(async (user) => {
    if (user.changed("password")) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
    }
  });

  return User;
};

module.exports = User;
