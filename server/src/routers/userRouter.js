const express = require("express");
const usersRouter = express.Router();
const userController = require("../controllers/usersController");
const auth = require("../middlewares/verifyToken.js");
// Define routes
// usersRouter.get("/users", auth, userController.getAllUsers);
usersRouter.get("/users", auth, userController.getUserInformation);
usersRouter.post("/register-by-email", userController.registerByEmail);
usersRouter.post("/login-by-email", userController.loginByEmail);
usersRouter.post("/logout", auth, userController.logOut);

module.exports = usersRouter;
