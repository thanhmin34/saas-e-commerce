const express = require("express");
const configController = require("../controllers/configController.js");
const configRouter = express.Router();

configRouter.post("/config", configController.createConfig);
configRouter.get("/config", configController.getConfig);

module.exports = configRouter;
