const Joi = require("joi");
const asyncHandler = require("express-async-handler");
const { Store } = require("../models");
const {
  notificationMessageSuccess,
} = require("../utils/notificationMessageStatus");

const getStore = asyncHandler(async (req, res) => {
  const { body } = req || {};
  return res.status(201).send("Ok");
  try {
  } catch (error) {}
});

const createStore = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { store } = body || {};
  const { name: value, title, address, currency } = store || {};

  try {
    const newStore = await Store.create({ value, address, title, currency });
    if (!newStore?.id)
      return notificationMessageError(
        res,
        "The store failed to create success"
      );

    return notificationMessageSuccess(res, {
      status: true,
      message: "Create store successfully",
    });
  } catch (error) {}
});

const updateStore = asyncHandler(async (req, res) => {
  const { body } = req || {};

  try {
    const { store } = body || {};
    const { name: value, title, address, currency } = store || {};
  } catch (error) {}
});

const deleteStore = asyncHandler(async (req, res) => {
  const { body } = req || {};

  try {
  } catch (error) {}
});

module.exports = {
  getStore,
  createStore,
  updateStore,
  deleteStore,
};
