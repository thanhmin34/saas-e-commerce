const express = require("express");
const productsRouter = express.Router();
const ProductsController = require("../controllers/productsController.js");
const auth = require("../middlewares/verifyToken.js");
const uploadCloud = require("../middlewares/fileUploader.js");

// Define routes
productsRouter.get("/products", ProductsController.getProducts);
productsRouter.post("/products", auth, ProductsController.CreateProducts);

productsRouter.post(
  "/images",
  auth,
  uploadCloud.single("file"),
  ProductsController.uploadImageByProduct
);

module.exports = productsRouter;
