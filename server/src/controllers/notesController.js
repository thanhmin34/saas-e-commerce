const asyncHandler = require("express-async-handler");
const {
  notificationMessageSuccess,
  notificationMessageError,
} = require("../utils/notificationMessageStatus");
const { Cart } = require("../models");
const addNote = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { cart_id, notes } = body || {};
  try {
    if (!cart_id) return notificationMessageError(res, "Cart id unavailable");
    console.log("cart_id", cart_id);
    const sourceCart = await Cart.findOne({
      where: {
        cart_id,
      },
      attributes: ["id", "cart_id", "notes"],
    });
    if (!sourceCart)
      return notificationMessageError(res, "Cart id unavailable");
    sourceCart.notes = notes;
    await sourceCart.save();

    return notificationMessageSuccess(res, {
      message: "Save address success fully",
      status: true,
    });
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

module.exports = {
  addNote,
};
