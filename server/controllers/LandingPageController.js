const sequelize = require("sequelize");
const LandingPage = require("../models/LandingPage");
const { fetchProductReviews } = require("../middleware/getCommonData");
const { Subcategory, Category } = require("../models");

const apiUrl = process.env.apiUrl;

exports.getLandingPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // Get landing page data
    const landingPageData = await LandingPage.findOne({
      attributes: [
        "id",
        "title",
        "sub_title",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/landing/', hero_image)`
          ),
          "hero_image",
        ],
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/landing/', banner)`
          ),
          "banner",
        ],
        "slug",
        "alt_tag",
        "image_title",
        "meta_title",
        "meta_description",
        "cat_id",
      ],
      where: {
        slug,
        status: 1,
      },
    });

    if (!landingPageData) {
      return res.status(404).json({
        status: 0,
        message: "Landing page not found",
      });
    }

    // Get subcategories for the category
    const subcategoryData = await Subcategory.findAll({
      attributes: [
        "id",
        "subcategory_name",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/subcategory/', icon)`
          ),
          "image_url",
        ],
        "slug",
        "subcategory_title",
        "subcategory_sub_title",
        "total_reviews",
        "avg_rating",
      ],
      where: {
        cat_id: landingPageData.cat_id,
        status: 1,
      },
    });

    // Get all active categories with their subcategories
    const allCategories = await Category.findAll({
      attributes: ["id", "category_name", "slug"],
      where: { status: 1 },
      include: [
        {
          model: Subcategory,
          attributes: ["id", "subcategory_name", "slug"],
          where: { status: 1 },
          required: false,
        },
      ],
      order: [["id", "DESC"]],
    });

    // Format categories and subcategories
    const formattedCategories = allCategories.map((category) => ({
      id: category.id,
      category_name: category.category_name,
      slug: category.slug,
      subcategories: category.Subcategories.map((sub) => ({
        id: sub.id,
        subcategory_name: sub.subcategory_name,
        slug: sub.slug,
      })),
    }));

    // Format subcategories with review data
    const formattedSubcategories = subcategoryData.map((sub) => ({
      id: sub.id,
      subcategory_name: sub.subcategory_name,
      image_url: sub.getDataValue("image_url"),
      slug: sub.slug,
      subcategory_title: sub.subcategory_title,
      subcategory_sub_title: sub.subcategory_sub_title,
      total_reviews: sub.total_reviews,
      avg_rating: sub.avg_rating,
    }));

    return res.status(200).json({
      status: 1,
      message: "Success",
      data: {
        landing_page: landingPageData,
        subcategories: formattedSubcategories,
        all_categories: formattedCategories,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: "Error occurred",
      error: error.message,
    });
  }
};
