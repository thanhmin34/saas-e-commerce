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
        url: "https://naturaltouchshop.com/en",
        image_url:
          "https://media-mid-prod.9ten.cloud/media/pagebuilder/homepage/natural_touch/natural_touch/Main_Banner_-_Desktop_-_03-min_1700143639639.jpg",
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
