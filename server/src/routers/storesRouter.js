const express = require("express");
const storesRouter = express.Router();
const auth = require("../middlewares/verifyToken.js");
const brandController = require("../controllers/storesController.js");

// Define routes
storesRouter.get("/stores", auth, brandController.getStore);
storesRouter.post("/stores", auth, brandController.createStore);
storesRouter.put("/stores", auth, brandController.updateStore);
storesRouter.delete("/stores", auth, brandController.deleteStore);

module.exports = storesRouter;
