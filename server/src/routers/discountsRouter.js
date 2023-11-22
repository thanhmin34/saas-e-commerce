const express = require("express");
const discountsController = require("../controllers/discountController.js");
const discountsRouter = express.Router();
const auth = require("../middlewares/verifyToken.js");

discountsRouter.get("/discounts", auth, discountsController.getAllDiscounts);
discountsRouter.delete("/remove-coupon", discountsController.removeDiscount);
discountsRouter.post("/add-coupon", discountsController.addDiscount);

module.exports = discountsRouter;
