const express = require("express");
const addressRouter = express.Router();
const addressController = require("../controllers/addressController.js");

addressRouter.get("/my-address", addressController.getMyAddress);
addressRouter.post("/my-address", addressController.addMyAddress);
addressRouter.delete("/my-address/:id", addressController.deleteMyAddress);

module.exports = addressRouter;
