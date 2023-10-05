const express = require("express");
const homePagesRouter = express.Router();
const homePagesController = require("../controllers/homePagesController.js");

homePagesRouter.get("/home-page", homePagesController.getHomePages);

module.exports = homePagesRouter;
