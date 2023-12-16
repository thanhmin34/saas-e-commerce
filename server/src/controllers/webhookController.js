const asyncHandler = require("express-async-handler");
const {
  notificationMessageError,
} = require("../utils/notificationMessageStatus");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const { STATUS_ORDERS } = require("../constants/orders");
const { handleListenAfterPayment } = require("../utils/checkoutOrderPayment");

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
const followNotificationStripe = asyncHandler(async (req, res) => {
  try {
    const event = req.body;
    stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      endpointSecret
    );

    switch (event.type) {
      case "checkout.session.async_payment_failed":
      case "checkout.session.expired":
        const checkoutSessionAsyncPaymentFailed = event.data.object;
        if (checkoutSessionAsyncPaymentFailed?.id) {
          await handleListenAfterPayment(
            STATUS_ORDERS.CANCELLED,
            checkoutSessionAsyncPaymentFailed?.id
          );
        }
        break;
      case "checkout.session.async_payment_succeeded":
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data.object;
        if (checkoutSessionCompleted?.id) {
          await handleListenAfterPayment(
            STATUS_ORDERS.PENDING,
            checkoutSessionCompleted?.id
          );
        }
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    response.send();
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

module.exports = {
  followNotificationStripe,
};
