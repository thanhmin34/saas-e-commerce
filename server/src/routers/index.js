const usersRouter = require("./userRouter.js");
const productsRouter = require("./productsRouter.js");
const storesRouter = require("./storesRouter.js");
const cartsRouter = require("./cartsRouter.js");
const productCartRouter = require("./productCartRouter.js");
const shippingMethodsRouter = require("./shippingMethodsRouter.js");
const paymentMethodsRouter = require("./paymentMethodsRouter.js");
const discountsRouter = require("./discountsRouter.js");

const renderRouters = (app) => {
  const listRouters = [
    usersRouter,
    productsRouter,
    storesRouter,
    cartsRouter,
    productCartRouter,
    shippingMethodsRouter,
    paymentMethodsRouter,
    discountsRouter,
  ];

  listRouters.map((item) => app.use("/", item));
};
module.exports = renderRouters;
