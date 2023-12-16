const { PRICE_CONVERT_USD, CURRENCY } = require("../constants/variables");

const stripe = require("stripe")(process.env.STRIPE_SECRET);
const { Products, Order, CartItem, Cart } = require("../models");
const placeOrderByStripe = async (params) => {
  const { price_total, currency = CURRENCY, products } = params || {};
  try {
    const unit_amount = +(price_total * PRICE_CONVERT_USD).toFixed(2);
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

const handleListenAfterPayment = async ({ type, id }) => {
  try {
    const order = await Order.findOne({
      where: {
        payment_id: id,
      },
      attributes: ["id", "payment_id", "status"],
      include: {
        model: Cart,
        as: "cartOrder",
        attributes: ["id", "cart_id"],
        include: [
          {
            model: CartItem,
            as: "listCartItem",
            attributes: ["id", "cart_id", "product_id", "quantity"],
            include: [
              {
                model: Products,
                as: "productCartItem",
                attributes: ["name", "quantity"],
              },
            ],
          },
        ],
      },
    });

    if (!order) return;
    order.status = type;
    const listCartItem = order?.cartOrder?.listCartItem;
    if (listCartItem && listCartItem.length > 0) {
      const newListCartItem = listCartItem.map((item) => {
        return new Promise(async (resolve, reject) => {
          const { quantity, productCartItem, product_id } = item || {};
          const newQty = (productCartItem.quantity -= +quantity);
          const value = await Products.update(
            {
              quantity: newQty,
            },
            {
              where: {
                id: product_id,
              },
            }
          );
          return resolve(value);
        });
      });
    }
    const results = await order.save();
    return results;
  } catch (error) {
    console.log("err", error);
  }
};

module.exports = {
  placeOrderByStripe,
  placeOrderByCOD,
  handleListenAfterPayment,
};
