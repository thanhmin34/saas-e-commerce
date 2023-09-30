const express = require("express");
const discountsController = require("../controllers/discountController.js");
const discountsRouter = express.Router();
const auth = require("../middlewares/verifyToken.js");

discountsRouter.get("/discounts", auth, discountsController.getAllDiscounts);
discountsRouter.put(
  "/remove-discount",
  auth,
  discountsController.removeDiscount
);
discountsRouter.post("/add-discount", auth, discountsController.addDiscount);

module.exports = discountsRouter;
