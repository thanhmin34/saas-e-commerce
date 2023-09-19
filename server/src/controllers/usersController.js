const Joi = require("joi");
const asyncHandler = require("express-async-handler");
const { User } = require("../models");

// validate
const createUserSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
  email: Joi.string().email(),
  password: Joi.string().min(6).required(),
});

const validateUserInput = (data) => {
  return createUserSchema.validate(data);
};

// controllers
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
  const { email, password, firstName, lastName, address } = body || {};
  try {
    const { error } = validateUserInput(body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const isValid = await User.findOne({ where: { email } });
    if (isValid) {
      return res.status(200).json({
        status: false,
        message: "Account already exists",
      });
    }

    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      address,
    });

    if (user?.dataValues?.id) {
      res.status(201).json({
        status: true,
        message: "Create user successfully",
      });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  getAllUsers,
  createUser,
};
