const express = require("express");
const configController = require("../controllers/configController.js");
const configRouter = express.Router();

configRouter.post("/config-app", configController.createConfig);
configRouter.get("/config-app", configController.getConfig);

module.exports = configRouter;
