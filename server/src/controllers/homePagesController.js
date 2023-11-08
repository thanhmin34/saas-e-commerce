const asyncHandler = require("express-async-handler");
const {
  notificationMessageSuccess,
} = require("../utils/notificationMessageStatus");
const path = require("path");
const homePageData = require("../views/test.json");
const megaMenu = require("../views/megamenu.json");

const getHomePages = asyncHandler(async (req, res) => {
  const {} = req || {};
  try {
    return res.status(200).json({
      home_page: homePageData?.test?.home_page,
    });
  } catch (error) {}
});

module.exports = { getHomePages };
