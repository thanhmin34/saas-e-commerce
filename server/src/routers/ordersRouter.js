const express = require("express");
const ordersRouter = express.Router();
const auth = require("../middlewares/verifyToken.js");
const orderController = require("../controllers/orderController.js");

ordersRouter.post("/orders", orderController.submitOrder);
ordersRouter.post("/test", orderController.placeOrderSquare);
ordersRouter.get("/order", auth, orderController.getOrderById);
module.exports = ordersRouter;
