const express = require("express");
const usersRouter = express.Router();
const userController = require("../controllers/usersController");

// Define routes
usersRouter.get("/users", userController.getAllUsers);
usersRouter.get("/user/:userId", userController.getUserInformation);
usersRouter.post("/register-by-email", userController.registerByEmail);
usersRouter.post("/login-by-email", userController.loginByEmail);

module.exports = usersRouter;
