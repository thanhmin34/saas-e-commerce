const express = require("express");
const wishlistsRouter = express.Router();
const auth = require("../middlewares/verifyToken.js");
const wishlistsController = require("../controllers/wishlistsController.js");

wishlistsRouter.get("/wishlist", auth, wishlistsController.getWishlistsByUser);
wishlistsRouter.post(
  "/wishlist",
  auth,
  wishlistsController.addProductToWishlist
);
wishlistsRouter.delete(
  "/wishlist",
  auth,
  wishlistsController.removeProductToWishlist
);

module.exports = wishlistsRouter;
