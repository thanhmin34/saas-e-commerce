const express = require("express");
const categoryController = require("../controllers/categoryController.js");
const categoryRouter = express.Router();

categoryRouter.get("/category/:slug", categoryController.getCategoryBySlug);
categoryRouter.get("/all-category", categoryController.getAllCategory);
categoryRouter.put("/category", categoryController.updateCategory);
categoryRouter.post("/category", categoryController.createCategory);
categoryRouter.delete("/category/:id", categoryController.deleteCategory);

module.exports = categoryRouter;
