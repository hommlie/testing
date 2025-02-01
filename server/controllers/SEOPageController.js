const {
  SEOPage,
  Subcategory,
  Product,
  Variation,
  Attribute,
} = require("../models");
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
      include: [
        {
          model: Subcategory,
          attributes: ["id", "subcategory_name"],
          as: "subcategory",
        },
      ],
      where: { slug, status: 1 },
    });

    if (!pageData) {
      return res.status(404).json({ status: 0, message: "Page not found" });
    }

    const products = await Product.findAll({
      where: { id: pageData?.subcategory?.id },
      attributes: [
        "id",
        "product_name",
        "product_price",
        "discounted_price",
        "is_variation",
        "vendor_id",
        "sku",
        "free_shipping",
        "shipping_cost",
        "tax_type",
        "tax",
        "rating",
        "total_reviews",
      ],
      //   include: [
      //     {
      //       model: Variation,
      //       attributes: [
      //         "id",
      //         "attribute_id",
      //         "price",
      //         "discounted_variation_price",
      //         "variation",
      //         "variation_interval",
      //         "variation_times",
      //         "qty",
      //       ],
      //       include: [
      //         {
      //           model: Attribute,
      //           attributes: ["id", "attribute"],
      //           where: { status: 1 },
      //           as: "attribute",
      //         },
      //       ],
      //       as: "variations",
      //       required: false,
      //     },
      //   ],
    });

    return res.status(200).json({
      status: 1,
      message: "Success",
      data: { pageData, services: products || [] },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 0, message: "Error occurred", error });
  }
};
