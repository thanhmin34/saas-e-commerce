const express = require("express");
const productCartRouter = express.Router();
const productCartController = require("../controllers/productCartController.js");

productCartRouter.post("/product-cart", productCartController.addProductToCart);
productCartRouter.put(
  "/product-cart",
  productCartController.updateProductToCart
);
productCartRouter.put(
  "/delete-product-cart",
  productCartController.deleteProductToCart
);

module.exports = productCartRouter;
