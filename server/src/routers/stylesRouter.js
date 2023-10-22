const express = require("express");
const stylesController = require("../controllers/stylesController.js");
const stylesRouter = express.Router();

stylesRouter.post("/styles", stylesController.createStyles);
stylesRouter.get("/styles", stylesController.getStyles);

module.exports = stylesRouter;
