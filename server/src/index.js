const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const { usersRouter } = require("./routers/index.js");

const port = process.env.PORT || 5004;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// routers
app.use("/", usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
