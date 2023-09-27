"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderDetails.init(
    {
      order_id: DataTypes.INTEGER,
      cart_id: DataTypes.INTEGER,
      status_code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "OrderDetails",
    }
  );
  return OrderDetails;
};
