const usersRouter = require("./userRouter.js");
const productsRouter = require("./productsRouter.js");
const storesRouter = require("./storesRouter.js");
const cartsRouter = require("./cartsRouter.js");
const productCartRouter = require("./productCartRouter.js");

const renderRouters = (app) => {
  app.use("/", usersRouter);
  app.use("/", productsRouter);
  app.use("/", storesRouter);
  app.use("/", cartsRouter);
  app.use("/", productCartRouter);
};
module.exports = renderRouters;
