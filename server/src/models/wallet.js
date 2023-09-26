"use strict";
const { Model } = require("sequelize");
const User = require("./user.js");
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Wallet.belongsTo(models.User, {
      //   foreignKey: "customer_id", // Trường khóa ngoại liên kết 2 bảng
      //   as: "user", // Tên của mối quan hệ (optional)
      // });
    }
  }
  Wallet.init(
    {
      customer_id: DataTypes.INTEGER,
      balance: DataTypes.FLOAT,
      earned_points: DataTypes.FLOAT,
      send_points: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Wallet",
    }
  );
  return Wallet;
};
