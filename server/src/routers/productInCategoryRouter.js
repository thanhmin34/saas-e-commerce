const express = require("express");
const productInCategoryRouter = express.Router();
const productInCategoryController = require("../controllers/productInCategoryController.js");

productInCategoryRouter.post(
  "/products-in-category",
  productInCategoryController.insertProductInCategory
);
productInCategoryRouter.get("/search", productInCategoryController.search);
productInCategoryRouter.get(
  "/products-in-category",
  productInCategoryController.getProductsInCategory
);
productInCategoryRouter.get(
  "/resolve-url",
  productInCategoryController.urlResolver
);

module.exports = productInCategoryRouter;
