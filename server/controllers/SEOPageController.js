const { SEOPage } = require("../models");
const sequelize = require("../config/connection");
const apiUrl = process.env.apiUrl;

exports.getPageBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const pageData = await SEOPage.findOne({
      attributes: [
        "id",
        "title",
        "sub_title",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/seo/', banner)`
          ),
          "banner_url",
        ],
        "description",
        "slug",
        "status",
        "alt_tag",
        "image_title",
        "meta_title",
        "meta_description",
      ],
      where: { slug, status: 1 },
    });

    if (!pageData) {
      return res.status(404).json({ status: 0, message: "Page not found" });
    }

    return res
      .status(200)
      .json({ status: 1, message: "Success", data: pageData });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 0, message: "Error occurred", error });
  }
};
