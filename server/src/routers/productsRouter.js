const express = require("express");
const productsRouter = express.Router();
const ProductsController = require("../controllers/productsController.js");
const auth = require("../middlewares/verifyToken.js");
const uploadCloud = require("../middlewares/fileUploader.js");

// Define routes
productsRouter.get(
  "/products/:productSku",
  ProductsController.getProductsDetails
);
productsRouter.post("/products", ProductsController.CreateProducts);
productsRouter.put(
  "/products/:productSku",
  auth,
  ProductsController.updateProduct
);
productsRouter.delete(
  "/products/:productSku",
  auth,
  ProductsController.deleteProduct
);

// images
productsRouter.post(
  "/images",
  auth,
  uploadCloud.array("file"),
  ProductsController.uploadImageByProduct
);

module.exports = productsRouter;
