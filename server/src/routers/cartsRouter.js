const express = require("express");
const cartsRouter = express.Router();
const cartsController = require("../controllers/cartsController.js");

cartsRouter.get("/cart", cartsController.getCartDetails);
cartsRouter.post("/cart", cartsController.createCart);
cartsRouter.post("/merge-cart", cartsController.mergeCart);
cartsRouter.post("/check-cart-auth", cartsController.checkCartIsAuth);

module.exports = cartsRouter;
