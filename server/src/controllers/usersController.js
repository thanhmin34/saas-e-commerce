const { User } = require("../models/user.js");
const asyncHandler = require("express-async-handler");

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const createUser = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { email, password } = body || {};
  try {
    res.status(201).json({
      status: true,
      message: "Create user successfully",
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  getAllUsers,
  createUser,
};
