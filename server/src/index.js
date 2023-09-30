const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const renderRouters = require("./routers/index.js");
const { corsOptions } = require("./constants/corsOptions.js");

const port = process.env.PORT || 5004;

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// routers
renderRouters(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
