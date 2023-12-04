const Joi = require("joi");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const moment = require("moment");
const { User, Wallet, Cart } = require("../models");
const {
  notificationMessageError,
  notificationMessageSuccess,
} = require("../utils/notificationMessageStatus.js");
const { generateToken } = require("../config/verifyToken.js");
const { getToken } = require("../utils//getToken.js");

// validateField
const createUserSchema = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().email(),
  password: Joi.string().min(6).required(),
});

const editUserSchema = Joi.object({
  firstname: Joi.string().trim().required(),
  lastname: Joi.string().trim().required(),
  email: Joi.string().email(),
  phone_number: Joi.string().min(8).required(),
  gender: Joi.string().required(),
  birth_date: Joi.string().required(),
  id: Joi.number().required(),
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
    const users = await User.findByPk(6, {
      include: [
        {
          model: Wallet,
          as: "wallet",
        },
      ],
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const getUserInformation = asyncHandler(async (req, res) => {
  const { headers } = req || {};

  try {
    const token = getToken(headers);
    const user = await User.findOne({
      where: {
        token,
      },
      attributes: {
        exclude: ["updatedAt", "createdAt", "password", "address"],
      },
      include: [
        {
          model: Cart,
          as: "userCart",
          attributes: ["cart_id"],
        },
      ],
    });
    if (!user) {
      return notificationMessageError(res, "invalid token");
    }

    const {
      firstname,
      lastname,
      id,
      email,
      phone_number,
      userCart,
      gender,
      birth_date,
    } = user || {};

    return notificationMessageSuccess(res, {
      user: {
        firstname,
        lastname,
        id,
        email,
        phone_number,
        gender,
        birth_date: birth_date ? moment(birth_date).format("L") : "",
      },
      cart_id: userCart?.cart_id,
    });
  } catch (error) {
    return notificationMessageError(res, "Internal server error");
  }
});

const editUserInformation = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { firstname, lastname, id, email, phone_number, gender, birth_date } =
    body || {};

  try {
    const { error } = validateFieldByCreateUser(body, editUserSchema);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const user = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["updatedAt", "createdAt", "password", "address"],
      },
    });
    if (!user) {
      return notificationMessageError(res, "invalid user");
    }
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.phone_number = phone_number;
    user.birth_date = birth_date;
    user.gender = gender;

    await user.save();

    return notificationMessageSuccess(res, {
      status: true,
      message: "Edit information successfully",
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone_number: user.phone_number,
        birth_date: user.birth_date,
        gender: user.gender,
        id: user?.id,
      },
    });
  } catch (error) {
    return notificationMessageError(res, "Internal server error");
  }
});

const registerByEmail = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { email, password, firstName, lastName } = body || {};

  try {
    const { error } = validateFieldByCreateUser(body, createUserSchema);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const isValid = await User.findOne({ where: { email } });

    if (isValid) {
      return res.status(400).json({
        status: false,
        message: "Account already exists",
      });
    }

    const user = await User.create({
      email,
      password,
      firstname: firstName,
      lastname: lastName,
    });

    if (user?.dataValues?.id) {
      return res.status(201).json({
        status: true,
        message: "Create user successfully",
      });
    }
  } catch (error) {
    return notificationMessageError(res, error);
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

    const isPasswordValid = await bcrypt.compare(password, user?.password);
    if (!isPasswordValid) {
      return notificationMessageError(res, "incorrect password");
    }

    const token = generateToken(user?.id);
    await User.update({ token }, { where: { id: user?.id } });

    return notificationMessageSuccess(res, {
      status: true,
      message: "Login successfully",
      token,
    });
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

const logOut = asyncHandler(async (req, res) => {
  const { headers } = req || {};

  const token = getToken(headers);
  try {
    const user = await User.findOne({
      where: { token },
      attributes: ["id", "token"],
    });
    if (!user?.id) {
      return notificationMessageError(res, "Incorrect account");
    }
    user.token = null;
    await user.save();

    return notificationMessageSuccess(res, {
      status: true,
      message: "Logout successfully",
      user,
    });
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

module.exports = {
  getAllUsers,
  registerByEmail,
  loginByEmail,
  getUserInformation,
  logOut,
  editUserInformation,
};
