const asyncHandler = require("express-async-handler");
const {
  notificationMessageError,
} = require("../utils/notificationMessageStatus");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
const followNotificationStripe = asyncHandler(async (req, res) => {
  try {
    const event = req.body;
    const stripeEvent = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      endpointSecret
    );
    switch (event.type) {
      case "checkout.session.async_payment_failed":
        const checkoutSessionAsyncPaymentFailed = event.data.object;
        // TODO
        break;
      case "checkout.session.async_payment_succeeded":
        const checkoutSessionAsyncPaymentSucceeded = event.data.object;
        // TODO
        break;
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data.object;
        // TODO
        break;
      case "checkout.session.expired":
        const checkoutSessionExpired = event.data.object;
        // TODO
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    return res.sendStatus(200);
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

module.exports = {
  followNotificationStripe,
};
