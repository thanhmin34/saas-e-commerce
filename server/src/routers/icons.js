const express = require("express");
const iconsController = require("../controllers/iconsController.js");
const iconsRouter = express.Router();

iconsRouter.post("/icons", iconsController.createIcons);
iconsRouter.get("/icons", iconsController.getIcons);

module.exports = iconsRouter;
