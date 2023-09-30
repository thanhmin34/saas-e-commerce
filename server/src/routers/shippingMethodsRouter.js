const express = require("express");
const shippingMethodsController = require("../controllers/shippingMethodsController.js");
const shippingMethodsRouter = express.Router();
const auth = require("../middlewares/verifyToken.js");

shippingMethodsRouter.get(
  "/shipping-method",
  auth,
  shippingMethodsController.getShippingMethods
);
shippingMethodsRouter.post(
  "/shipping-method",
  auth,
  shippingMethodsController.selectShippingMethodToCart
);

module.exports = shippingMethodsRouter;
