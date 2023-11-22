const express = require("express");
const seoRouter = express.Router();
const SeoController = require("../controllers/seoController.js");

// Define routes
seoRouter.get("/seo-pages", SeoController.seoPages);

module.exports = seoRouter;
