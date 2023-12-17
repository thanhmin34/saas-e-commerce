const asyncHandler = require("express-async-handler");
const {
  notificationMessageSuccess,
  notificationMessageError,
} = require("../utils/notificationMessageStatus");
const { Sequelize } = require("sequelize");

const { Categories, ProductCategories, Products } = require("../models");
const {
  CATEGORY_IDS_SHOW_HOME_PAGES,
  BANNER_SMALL_CATEGORY_IDS,
  ROOT_CATEGORY,
} = require("../constants/variables");

const getHomePages = asyncHandler(async (req, res) => {
  const {} = req || {};

  try {
    const category = await Categories.findAll({
      where: {
        id: CATEGORY_IDS_SHOW_HOME_PAGES,
      },
      attributes: ["name", "id", "image", "slug"],
      include: [
        {
          model: Products,
          through: ProductCategories,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    const categoryList = await Categories.findAll({
      where: {
        id: {
          [Sequelize.Op.not]: ROOT_CATEGORY,
        },
      },
      attributes: ["name", "id", "image", "slug"],
    });

    const brandSliderData =
      categoryList?.length > 0
        ? categoryList.map((item) => {
            const { name, id, image, slug } = item;
            return { name, id, image, slug };
          })
        : [];

    const imageSlider = {
      id: 0,
      position: 0,
      type: "imageSlider",
      image_slider: {
        images: [
          {
            src: "https://media-mid-prod.9ten.cloud/media/pagebuilder/homepage/tanmiah/tanmiah/new-facelift-app-bannerwb-English-1920x600-cEN_1697115965155.jpg",
            link: "omega-3-chicken.html",
            alt: "Fresh from the Farm",
          },
        ],
      },
    };
    const brandSlider = {
      id: 1,
      position: 1,
      type: "sliderBrand",
      image_slider: {
        images: brandSliderData,
      },
    };

    const bannerSlider = {
      id: 2,
      position: 2,
      type: "banner",
      image_slider: {
        images: [
          {
            image:
              "https://media-mid-prod.9ten.cloud/media/pagebuilder/homepage/tanmiah/tanmiah/Tanmiah_banner_1-1_1688377208608.png",
            alt: "banner-left",
          },
          {
            image:
              "https://media-mid-prod.9ten.cloud/media/pagebuilder/homepage/tanmiah/tanmiah/Tanmiah_banner_1-2_1688377231050.png",
            alt: "banner-left",
          },
        ],
      },
    };

    const productsListByCategory =
      category?.length > 0
        ? category.map((item, index) => {
            const { Products, name } = item;
            const bannerData = BANNER_SMALL_CATEGORY_IDS[index];
            const params = {
              id: 3 + index,
              position: 3 + index,
              type: "productList",
              products: Products,
              title: name,
            };
            params.banner = bannerData;
            return params;
          })
        : [];

    return notificationMessageSuccess(res, {
      home_page: [
        imageSlider,
        brandSlider,
        bannerSlider,
        ...productsListByCategory,
      ],
    });
  } catch (error) {
    console.log("error", error);
    return notificationMessageError(res, { error });
  }
});

module.exports = { getHomePages };
