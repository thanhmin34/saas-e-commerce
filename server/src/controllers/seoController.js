const asyncHandler = require("express-async-handler");
const {
  notificationMessageSuccess,
  notificationMessageError,
} = require("../utils/notificationMessageStatus");

const seoPages = asyncHandler(async (req, res) => {
  try {
    return notificationMessageSuccess(res, {
      message: "Save address success fully",
      status: true,
      seo: {
        title: "Natural Touch",
        keywords: "Natural Touch",
        description: "Natural Touch",
        url: "",
        image_url: "",
        authors: [
          {
            name: "hoang",
            url: "https://github.com/thanhmin34",
          },
        ],
      },
    });
  } catch (error) {
    return notificationMessageError(res, error);
  }
});

module.exports = {
  seoPages,
};
