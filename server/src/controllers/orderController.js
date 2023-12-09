const lodash = require("lodash");
const asyncHandler = require("express-async-handler");
const {
  notificationMessageSuccess,
  notificationMessageError,
} = require("../utils/notificationMessageStatus");
const {
  Cart,
  Order,
  PaymentMethods,
  User,
  CartItem,
  Products,
  ShippingMethods,
  Discount,
  ShippingAddress,
  ConfigApps,
} = require("../models");
const { STATUS_ORDERS } = require("../constants/orders.js");
const {
  placeOrderByStripe,
  placeOrderByCOD,
} = require("../utils/checkoutOrderPayment.js");
const { getToken } = require("../utils/getToken");
const {
  getProductByCart,
  getTotalPriceCart,
  getDiscountAmount,
  getTotalExclPriceCart,
  getTotalPayment,
} = require("../utils/calculatorTotalCart.js");
const {
  TAX_AMOUNT,
  CURRENCY,
  DEFAULT_CONFIG_APP_ID,
} = require("../constants/variables.js");

const submitOrder = asyncHandler(async (req, res) => {
  const { body } = req || {};
  const { cart_id } = body || {};
  const fieldExclude = ["createdAt", "updatedAt"];

  try {
    const configApp = await ConfigApps.findOne({
      where: { id: DEFAULT_CONFIG_APP_ID },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    const cart = await Cart.findOne({
      where: { cart_id },
      attributes: ["cart_id", "customer_id", "id"],
      include: [
        {
          model: PaymentMethods,
          as: "cartPaymentMethod",
          attributes: ["name", "code"],
        },
        {
          model: CartItem,
          as: "listCartItem",
          attributes: {
            exclude: fieldExclude,
          },
          include: [
            {
              model: Products,
              as: "productCartItem",
              attributes: [
                "name",
                "sku",
                "image",
                "price",
                "special_price",
                "special_from_date",
              ],
            },
          ],
        },
        {
          model: PaymentMethods,
          as: "cartPaymentMethod",
          attributes: {
            exclude: fieldExclude,
          },
        },
        {
          model: Discount,
          as: "cartDiscount",
          attributes: {
            exclude: fieldExclude,
          },
        },
        {
          model: ShippingMethods,
          as: "cartShippingMethods",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    if (!cart) return notificationMessageError(res, "Cannot find cart");
    if (!cart?.customer_id)
      return notificationMessageError(res, "Shopping cart does not exist");
    const paymentMethodsList = {
      stripe: placeOrderByStripe,
      cod: placeOrderByCOD,
    };

    const paymentMethodCode = cart?.cartPaymentMethod.code;

    if (paymentMethodCode && paymentMethodsList[paymentMethodCode]) {
      const { currency } = configApp || {};
      const { listCartItem, cartShippingMethods, cartDiscount } = cart;
      const total = getTotalPriceCart(listCartItem);

      const shipping_amount = lodash.get(cartShippingMethods, "price", 0);
      const discount_amount = getDiscountAmount(
        lodash.get(cartDiscount, "value", 0),
        total
      );
      const totalPayment = getTotalPayment(
        total,
        TAX_AMOUNT,
        shipping_amount,
        discount_amount
      );
      const params = {
        price_total: totalPayment,
        currency,
      };
      const { url, id: payment_id } = await paymentMethodsList["stripe"](
        params
      );
      // check payment method /to do update
      const statusList = {
        cod: STATUS_ORDERS.PENDING,
        pay: STATUS_ORDERS.UNPAID,
      };
      const orderParams = {
        status: statusList[paymentMethodCode]
          ? statusList[paymentMethodCode]
          : statusList["pay"],
        cart_id: cart?.id,
        customer_id: cart?.customer_id,
        payment_id,
      };
      const order = await Order.create(orderParams);
      if (!order?.id)
        return notificationMessageError(res, "Cannot create order");

      cart.customer_id = null;
      await cart.save();

      return notificationMessageSuccess(res, {
        status: true,
        message: "Create order successfully",
        order_id: order?.id,
        url,
      });
    }

    return notificationMessageError(res, "Invalid Payment Methods");
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const { headers } = req || {};

  try {
    const fieldExclude = ["createdAt", "updatedAt"];
    const token = getToken(headers);
    const userOrderData = await User.findOne({
      where: { token },
      attributes: ["id", "token"],
      include: {
        model: Order,
        as: "userOrder",
        attributes: {
          exclude: fieldExclude,
        },
        include: {
          model: Cart,
          as: "cartOrder",
          attributes: {
            exclude: [],
          },
          include: [
            {
              model: CartItem,
              as: "listCartItem",
              attributes: {
                exclude: fieldExclude,
              },
              include: [
                {
                  model: Products,
                  as: "productCartItem",
                  attributes: [
                    "name",
                    "sku",
                    "image",
                    "price",
                    "special_price",
                    "special_from_date",
                  ],
                },
              ],
            },
            {
              model: PaymentMethods,
              as: "cartPaymentMethod",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: ShippingMethods,
              as: "cartShippingMethods",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
            {
              model: Discount,
              as: "cartDiscount",
              attributes: {
                exclude: [...fieldExclude],
              },
            },
            {
              model: ShippingAddress,
              as: "cartShippingAddress",
              attributes: {
                exclude: [...fieldExclude, "customer_id"],
              },
            },
          ],
        },
      },
    });
    if (!userOrderData)
      return notificationMessageError(res, { message: "Invalid Orders" });
    const { userOrder } = userOrderData || {};
    if (!userOrder || userOrder?.length === 0)
      return notificationMessageSuccess(res, { orders: [] });
    const newOrderList = userOrder.map((item) => {
      const { id, customer_id, status, cartOrder } = item || {};

      const {
        cartPaymentMethod,
        cartShippingMethods,
        cartDiscount,
        cartShippingAddress,
        listCartItem,
        notes,
      } = cartOrder || {};
      cartShippingAddress.tempLatLng = JSON.parse(
        cartShippingAddress.tempLatLng
      );

      const products = getProductByCart(listCartItem);
      const total = getTotalPriceCart(listCartItem);
      const shipping_amount = lodash.get(cartShippingMethods, "price", 0);
      const discount_amount = getDiscountAmount(
        lodash.get(cartDiscount, "value", 0),
        total
      );
      const total_excl = getTotalExclPriceCart(total);
      const totalPayment = getTotalPayment(
        total,
        TAX_AMOUNT,
        shipping_amount,
        discount_amount
      );
      return {
        id,
        customer_id,
        status,
        notes,
        shipping_address: cartShippingAddress,
        discount: cartDiscount,
        shipping_methods: cartShippingMethods,
        payment_methods: cartPaymentMethod,
        products,
        prices: {
          total,
          total_excl,
          shipping_amount,
          discount_amount,
          tax_amount: TAX_AMOUNT,
          currency: CURRENCY,
          total_payment: totalPayment,
        },
      };
    });

    return notificationMessageSuccess(res, { orders: newOrderList });
  } catch (error) {
    return notificationMessageError(res, { error });
  }
});

module.exports = {
  submitOrder,
  getOrderById,
};
