const express = require("express");
const reviewRouter = express.Router();
const ReviewController = require("../controllers/reviewController.js");

// Define routes
reviewRouter.get("/reviews/:product_id", ReviewController.getListReviews);
reviewRouter.delete("/reviews/:id", ReviewController.removeReviews);
reviewRouter.post("/reviews", ReviewController.addReview);

module.exports = reviewRouter;
