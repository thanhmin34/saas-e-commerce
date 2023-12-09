const express = require("express");
const followNotificationStripeRouter = express.Router();
const webhookController = require("../controllers/webhookController.js");

followNotificationStripeRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhookController.getWishlistsByUser
);

module.exports = followNotificationStripeRouter;
