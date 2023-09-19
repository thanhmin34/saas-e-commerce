const express = require("express");
const usersRouter = express.Router();
const userController = require("../controllers/usersController");

// Define routes
usersRouter.get("/users", userController.getAllUsers);
usersRouter.post("/user", userController.createUser);

module.exports = usersRouter;
