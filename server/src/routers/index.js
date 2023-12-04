const usersRouter = require("./userRouter.js");
const productsRouter = require("./productsRouter.js");
const storesRouter = require("./storesRouter.js");
const cartsRouter = require("./cartsRouter.js");
const productCartRouter = require("./productCartRouter.js");
const shippingMethodsRouter = require("./shippingMethodsRouter.js");
const paymentMethodsRouter = require("./paymentMethodsRouter.js");
const discountsRouter = require("./discountsRouter.js");
const shippingAddressRouter = require("./shippingAddressRouter.js");
const ordersRouter = require("./ordersRouter.js");
const wishlistsRouter = require("./wishlistsRouter.js");
const homePagesRouter = require("./homePagesRouter.js");
const configRouter = require("./configRouter.js");
const iconsRouter = require("./icons.js");
const categoryRouter = require("./categoryRouter.js");
const productInCategoryRouter = require("./productInCategoryRouter.js");
const seoRouter = require("./seoRouter.js");
const reviewRouter = require("./reviewRouter.js");
const noteRouter = require("./notesRouter.js");

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
    shippingAddressRouter,
    ordersRouter,
    wishlistsRouter,
    homePagesRouter,
    configRouter,
    iconsRouter,
    categoryRouter,
    productInCategoryRouter,
    seoRouter,
    reviewRouter,
    noteRouter,
  ];

  listRouters.map((item) => app.use("/", item));
};
module.exports = renderRouters;
