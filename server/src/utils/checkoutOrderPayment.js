const { PRICE_CONVERT_USD, CURRENCY } = require("../constants/variables");

const stripe = require("stripe")(process.env.STRIPE_SECRET);
const { Products } = require("../models");
const placeOrderByStripe = async (params) => {
  const { price_total, currency = CURRENCY } = params || {};
  try {
    const unit_amount = price_total * PRICE_CONVERT_USD;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: "Natural Touch",
            },
            unit_amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/checkout/success`,
      cancel_url: `http://localhost:3000/checkout/fails`,
    });
    return session;
  } catch (error) {
    console.log("err", error);
  }
};

const placeOrderByCOD = async ({ products }) => {
  try {
    // handle case update products qty
    const newProducts = products.map((item) => {
      const {
        productCartItem,
        quantity: quantityOrder,
        product_id,
      } = item || {};
      const { quantity: quantityProduct } = productCartItem || {};
      const quantity = +quantityProduct - +quantityOrder;

      return new Promise(async (resolve, reject) => {
        const value = await Products.update(
          {
            quantity,
          },
          {
            where: {
              id: product_id,
            },
          }
        );
        resolve(value);
      });
    });
    await Promise.all(newProducts);
    return {
      success_url: `/success.html`,
      cancel_url: `/cancel.html`,
      url: "",
    };
  } catch (error) {
    console.log("err", error);
  }
};

module.exports = {
  placeOrderByStripe,
  placeOrderByCOD,
};
