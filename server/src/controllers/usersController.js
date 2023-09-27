const Joi = require("joi");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const { User } = require("../models");
const {
  notificationMessageError,
  notificationMessageSuccess,
} = require("../utils/notificationMessageStatus.js");
const { generateToken } = require("../config/verifyToken.js");

// validateField
const createUserSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
  email: Joi.string().email(),
  password: Joi.string().min(6).required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6).required(),
});

const validateFieldByCreateUser = (data, schema) => {
  return schema.validate(data);
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

const registerByEmail = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { email, password, firstName, lastName, address } = body || {};
  try {
    const { error } = validateFieldByCreateUser(body, createUserSchema);
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
      return res.status(201).json({
        status: true,
        message: "Create user successfully",
      });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const loginByEmail = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { email, password } = body || {};

  try {
    const { error } = validateFieldByCreateUser(body, loginUserSchema);
    if (error) {
      return notificationMessageError(res, error.details[0].message);
    }

    const user = await User.findOne({
      where: { email },
    });
    if (!user?.id) {
      return notificationMessageError(res, "Incorrect account");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return notificationMessageError(res, "incorrect password");
    }

    const token = generateToken(user.id);
    await User.update({ token }, { where: { id: 1 } });

    notificationMessageSuccess(res, {
      status: true,
      message: "Login successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  getAllUsers,
  registerByEmail,
  loginByEmail,
};
