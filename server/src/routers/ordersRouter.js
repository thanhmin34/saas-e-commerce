const express = require("express");
const ordersRouter = express.Router();
const auth = require("../middlewares/verifyToken.js");
const orderController = require("../controllers/orderController.js");

ordersRouter.post("/orders", orderController.submitOrder);
ordersRouter.get("/orders", auth, orderController.getOrderById);
module.exports = ordersRouter;
