const { Client, Environment } = require("square");
const asyncHandler = require("express-async-handler");
const {
  notificationMessageSuccess,
  notificationMessageError,
} = require("../utils/notificationMessageStatus");
const { Cart, Order, PaymentMethods } = require("../models");
const { STATUS_ORDERS } = require("../constants/orders.js");
const { DEFAULT_ORDER_NUMBER } = require("../constants/variables.js");

const squareClient = new Client({
  environment: Environment.Sandbox,
  accessToken:
    "EAAAEL-8M99dln5TpCUvm0fnII0KRwu8g2y720aYAtdFQI_VPMUnmO9Pis964INE",
  httpClientOptions: {
    timeout: 10000,
    retryConfig: {
      maxNumberOfRetries: 2,
      maximumRetryWaitTime: 1000000,
    },
  },
});

const placeOrderSquare = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { cart_id } = body || {};
  try {
    const paymentsApi = squareClient.paymentsApi;
    console.log("paymentsApi", paymentsApi);

    const request = {
      sourceId: "cnon:card-nonce-ok",
      amountMoney: {
        amount: 40,
        currency: "USD",
      },
      locationId: "LMKHAAQAXQPGG",
      referenceId: "ORDER12345",
      idempotencyKey: "123",
    };
    console.log("request", request);

    const response = await paymentsApi.createPayment(request);
    console.log(response);
    return notificationMessageSuccess(res, { status: true });
  } catch (error) {
    console.error("Error creating payment:", error);
  }
});

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

module.exports = { submitOrder, getOrderById, placeOrderSquare };
