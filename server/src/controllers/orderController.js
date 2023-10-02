const asyncHandler = require("express-async-handler");
const {
  notificationMessageSuccess,
  notificationMessageError,
} = require("../utils/notificationMessageStatus");
const { Cart, Order, PaymentMethods } = require("../models");
const { STATUS_ORDERS } = require("../constants/orders.js");
const submitOrder = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { cart_id } = body || {};

  try {
    const cart = await Cart.findOne({
      where: { cart_id },
      attributes: ["cart_id", "customer_id", "id"],
      include: {
        model: PaymentMethods,
        as: "cartPaymentMethod",
        attributes: ["name", "code"],
      },
    });

    if (!cart) return notificationMessageError(res, "Cannot find cart");
    if (!cart?.customer_id)
      return notificationMessageError(res, "shopping cart does not exist");
    //check payment method /to do update
    const orderParams = {
      status: STATUS_ORDERS.PENDING,
      cart_id: cart?.id,
      customer_id: cart?.customer_id,
    };
    const order = await Order.create(orderParams);
    if (!order?.id) return notificationMessageError(res, "Cannot create order");
    cart.customer_id = null;
    await cart.save();

    return notificationMessageSuccess(res, {
      status: true,
      message: "Create order successfully",
      order_id: order?.id,
    });
  } catch (error) {}
});

const getOrderById = asyncHandler(async (req, res) => {
  const { query } = req || {};

  const { orderId } = query || {};
  try {
    const order = await Order.findOne({
      where: { id: orderId },
      attributes: ["id", "status", "cart_id"],
      include: {
        model: Cart,
        as: "cartOrder",
      },
    });

    return notificationMessageSuccess(res, { order });
  } catch (error) {}
});

module.exports = { submitOrder, getOrderById };
