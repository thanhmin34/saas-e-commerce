const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const { usersRouter, productsRouter } = require("./routers/index.js");

var corsOptions = {
  origin: ["http://localhost:3000/", "http://localhost:3000"],
  optionsSuccessStatus: 200,
};
const port = process.env.PORT || 5004;

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// routers
app.use("/", usersRouter);
app.use("/", productsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
