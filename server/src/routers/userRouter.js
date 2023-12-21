const express = require("express");
const usersRouter = express.Router();
const userController = require("../controllers/usersController");
const auth = require("../middlewares/verifyToken.js");
// Define routes
// usersRouter.get("/users", auth, userController.getAllUsers);
usersRouter.get("/users", userController.getUserInformation);
usersRouter.put("/users", userController.editUserInformation);
usersRouter.post("/register-by-email", userController.registerByEmail);
usersRouter.post("/login-by-email", userController.loginByEmail);
usersRouter.post("/login-by-phone", userController.logInByPhone);
usersRouter.post("/register-by-phone", userController.registerByPhone);
usersRouter.post("/verify-otp", userController.verifyOTP);
usersRouter.post("/logout", auth, userController.logOut);

module.exports = usersRouter;
