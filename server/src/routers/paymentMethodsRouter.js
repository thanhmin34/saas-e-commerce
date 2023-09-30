const express = require("express");
const paymentMethodsController = require("../controllers/paymentMethodsController.js");
const paymentMethodsRouter = express.Router();
const auth = require("../middlewares/verifyToken.js");

paymentMethodsRouter.get(
  "/payment-method",
  auth,
  paymentMethodsController.getPaymentMethods
);
paymentMethodsRouter.post(
  "/payment-method",
  auth,
  paymentMethodsController.selectPaymentMethodToCart
);

module.exports = paymentMethodsRouter;
