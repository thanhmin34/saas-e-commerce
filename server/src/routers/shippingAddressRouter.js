const express = require("express");
const addressController = require("../controllers/addressController.js");
const addressRouter = express.Router();
const auth = require("../middlewares/verifyToken.js");

addressRouter.post(
  "/shipping-address",
  auth,
  addressController.addShippingAddress
);

module.exports = addressRouter;
