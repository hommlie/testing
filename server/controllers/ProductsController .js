const sequelize = require("../config/connection");
const { Sequelize, Op, fn, col, literal, where } = require("sequelize");
const {
  Product,
  User,
  Banner,
  Brand,
  Category,
  Subcategory,
  Innersubcategory,
  Attribute,
  ProductImage,
  Variation,
  Ratting,
  Wishlist,
  Testimonials,
} = require("../models");
const apiUrl = process.env.apiUrl;

exports.viewAllListing = async (req, res) => {
  const { user_id, type } = req.body;

  try {
    let products;

    const commonProductAttributes = [
      "id",
      "product_name",
      "product_price",
      "discounted_price",
      "is_variation",
      "sku",
      "slug",
      "rating",
      "total_reviews",
    ];

    const commonIncludes = [
      {
        model: ProductImage,
        attributes: [
          "id",
          "product_id",
          "alt_tag",
          "image_title",
          [
            sequelize.fn(
              "CONCAT",
              sequelize.literal(
                `'${apiUrl}/storage/app/public/images/products/'`
              ),
              sequelize.col("productimage.image")
            ),
            "image_url",
          ],
        ],
        where: {
          media: "Image",
        },
        as: "productimage",
      },
      {
        model: Variation,
        attributes: [
          "id",
          "product_id",
          "price",
          "discounted_variation_price",
          "variation",
          "qty",
        ],
        as: "variation",
        required: false,
      },
      {
        model: Ratting,
        as: "rattings",
        required: false,
      },
    ];

    switch (type) {
      case "featured_products":
        products = await Product.findAll({
          attributes: commonProductAttributes,
          include: commonIncludes,
          where: {
            is_featured: 1,
            status: 1,
          },
          order: sequelize.random(),
          limit: 10,
        });
        break;

      case "hot_products":
        products = await await Product.findAll({
          attributes: commonProductAttributes,
          include: commonIncludes,
          where: {
            is_hot: 1,
            status: 1,
          },
          order: sequelize.random(),
          limit: 10,
        });
        break;

      case "new_products":
        products = await Product.findAll({
          attributes: commonProductAttributes,
          include: commonIncludes,
          where: {
            status: 1,
          },
          order: [["id", "DESC"]],
          limit: 10,
        });
        break;

      case "most_booked_services":
        products = await Product.findAll({
          attributes: [
            ...commonProductAttributes,
            [
              sequelize.literal(`(
                  SELECT COUNT(*)
                  FROM orders
                  WHERE orders.product_id = Product.id
                )`),
              "order_count",
            ],
          ],
          include: commonIncludes,
          where: {
            status: 1,
          },
          order: [[sequelize.literal("order_count"), "DESC"]],
          group: [
            "Product.id",
            "Product.product_name",
            "Product.product_price",
            "Product.discounted_price",
            "Product.is_variation",
            "Product.sku",
            "Product.slug",
            "Product.rating",
            "Product.total_reviews",
            "productimage.id",
            "productimage.product_id",
            "productimage.alt_tag",
            "productimage.image_title",
            "productimage.image",
            // "variation.id",
            // "variation.product_id",
            // "variation.price",
            // "variation.discounted_variation_price",
            // "variation.variation",
            // "variation.qty",
            // "rattings.id",
            // "rattings.product_id",
            // Add other necessary columns here
          ],
          limit: 10,
        });
        break;

      case "cleaning_services":
        products = await Product.findAll({
          attributes: commonProductAttributes,
          include: commonIncludes,
          where: {
            cat_id: 19,
          },
          order: [["id", "DESC"]],
          limit: 10,
        });
        break;

      case "pest_control":
        products = await Product.findAll({
          attributes: commonProductAttributes,
          include: commonIncludes,
          where: {
            cat_id: 18,
          },
          order: [["id", "DESC"]],
          limit: 10,
        });
        break;

      case "safety_pro_netting":
        products = await Product.findAll({
          attributes: commonProductAttributes,
          include: commonIncludes,
          where: {
            cat_id: 30,
          },
          order: [["id", "DESC"]],
          limit: 10,
        });
        break;

      case "mosquito_mesh":
        products = await Product.findAll({
          attributes: commonProductAttributes,
          include: commonIncludes,
          where: {
            cat_id: 29,
          },
          order: [["id", "DESC"]],
          limit: 10,
        });
        break;

      case "shop_now":
        products = await Product.findAll({
          attributes: commonProductAttributes,
          include: commonIncludes,
          where: {
            cat_id: 38,
          },
          order: [["id", "DESC"]],
          limit: 10,
        });
        break;

      case "videos":
        products = await ProductImage.findAll({
          attributes: [
            "id",
            "media",
            "thumbnail",
            "alt_tag",
            "image_title",
            [
              sequelize.fn(
                "CONCAT",
                sequelize.literal(
                  `'${apiUrl}/storage/app/public/images/products/'`
                ),
                sequelize.col("image")
              ),
              "video_url",
            ],
          ],
          where: {
            media: "Video",
          },
        });
        break;

      case "testimonials":
        products = await Testimonials.findAll({
          attributes: [
            "id",
            "name",
            "location",
            "feedback",
            [
              sequelize.fn(
                "CONCAT",
                sequelize.literal(
                  `'${apiUrl}/storage/app/public/images/testimonials/'`
                ),
                sequelize.col("image")
              ),
              "image",
            ],
          ],
          where: {
            status: 1,
          },
        });
        break;

      case "vendors":
        products = await User.findAll({
          attributes: [
            "id",
            "name",
            [
              literal(
                `CONCAT('${process.env.BASE_URL}/storage/app/public/images/profile/', profile_pic)`
              ),
              "image_url",
            ],
          ],
          where: {
            type: 3,
            is_available: 1,
          },
          order: Sequelize.literal("RAND()"),
          limit: 10,
        });
        break;

      case "brands":
        products = await Brand.findAll({
          attributes: [
            "id",
            "brand_name",
            [
              literal(
                `CONCAT('${process.env.BASE_URL}/storage/app/public/images/brand/', icon)`
              ),
              "image_url",
            ],
          ],
          where: {
            status: 1,
          },
          order: [[Sequelize.fn("RAND")]],
          limit: 10,
        });
        break;

      default:
        return res.status(400).json({ status: 0, message: "Invalid type" });
    }

    return res
      .status(200)
      .json({ status: 1, message: "Success", data: products });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ status: 0, message: "Something went wrong", error });
  }
};

exports.productDetails = async (req, res) => {
  const { slug } = req.body;

  if (!slug) {
    return res.status(400).json({ status: 0, message: "Invalid product ID" });
  }

  try {
    const product = await Product.findOne({
      where: { slug: slug, status: 1 },
      attributes: [
        "id",
        "product_name",
        "product_price",
        "cat_id",
        "discounted_price",
        "description",
        "tags",
        "product_qty",
        "is_variation",
        "vendor_id",
        "sku",
        "free_shipping",
        "shipping_cost",
        "tax_type",
        "tax",
        "est_shipping_days",
        "is_return",
        "return_days",
        "faqs",
        "slug",
        "meta_title",
        "meta_description",
        "location",
        "rating",
        "total_reviews",
        "faqs_for_mobile",
        "description_for_mobile",
        "pro_specifications",
        "is_featured",
      ],
      include: [
        {
          model: ProductImage,
          attributes: [
            "id",
            "product_id",
            "media",
            "thumbnail",
            "alt_tag",
            "image_title",
            // [sequelize.fn('CONCAT', sequelize.literal(`'${apiUrl}/storage/app/public/images/products/'`), sequelize.col('image')), 'image_url']
            [
              sequelize.literal(`
                CASE 
                  WHEN media = 'Image' THEN CONCAT('${apiUrl}/storage/app/public/images/products/', productimages.image)
                  WHEN media = 'Video' THEN productimages.image
                  ELSE NULL
                END
              `),
              "image_url",
            ],
          ],
          as: "productimages",
          required: false,
        },
        {
          model: Variation,
          attributes: [
            "id",
            "product_id",
            "attribute_id",
            "price",
            "description",
            "discounted_variation_price",
            "variation",
            "variation_interval",
            "variation_times",
            "qty",
          ],
          include: [
            {
              model: Attribute,
              attributes: ["id", "attribute"],
              where: { status: 1 },
              as: "attribute",
              required: false,
            },
          ],
          as: "variations",
          required: false,
        },
        {
          model: Ratting,
          as: "rattings",
          required: false,
        },
        {
          model: Category,
          attributes: ["category_name"],
          as: "category",
          required: false,
        },
        {
          model: Subcategory,
          attributes: ["subcategory_name"],
          as: "subcategory",
          required: false,
        },
        {
          model: Innersubcategory,
          attributes: ["innersubcategory_name"],
          as: "innersubcategory",
          required: false,
        },
        // { model: User, as: 'vendor', where: { is_available: 1 }, attributes: [] }
      ],
    });

    if (!product) {
      return res.status(200).json({ status: 0, message: "No data found" });
    }

    // Convert the Sequelize model instance to a plain JavaScript object
    const plainProduct = product.get({ plain: true });

    const restructuredVariations = plainProduct.variations.map((variation) => {
      const { attribute, ...variationData } = variation;
      return {
        attribute_name: attribute.attribute,
        data: variationData,
      };
    });

    // Replace the original variations with the restructured ones
    plainProduct.variations = restructuredVariations;

    const related_products = await Product.findAll({
      where: { cat_id: product.cat_id, status: 1, id: { [Op.ne]: product.id } },
      attributes: [
        "id",
        "product_name",
        "product_price",
        "discounted_price",
        "is_variation",
        "sku",
        "rating",
      ],
      include: [
        {
          model: ProductImage,
          attributes: [
            "id",
            "product_id",
            [
              sequelize.fn(
                "CONCAT",
                sequelize.literal(
                  `'${apiUrl}/storage/app/public/images/products/'`
                ),
                sequelize.col("productimage.image")
              ),
              "image_url",
            ],
            "alt_tag",
            "image_title",
          ],
          where: { media: "Image" },
          as: "productimage",
        },
        {
          model: Variation,
          attributes: [
            "id",
            "product_id",
            "attribute_id",
            "price",
            "description",
            "discounted_variation_price",
            "variation",
            "qty",
          ],
          as: "variations",
          required: false,
        },
        {
          model: Ratting,
          as: "rattings",
          required: false,
        },
        // {
        //   model: Wishlist,
        //   attributes: [
        //     [sequelize.literal('CASE WHEN wishlist.product_id IS NULL THEN 0 ELSE 1 END'), 'is_wishlist']
        //   ],
        //   where: {
        //     user_id: user_id
        //   },
        //   required: false,
        //   as: 'wishlist'
        // },
        // { model: User, as: 'vendor', where: { is_available: 1 }, attributes: [] }
      ],
      order: [["id", "DESC"]],
      limit: 10,
    });

    const returnpolicy = await User.findOne({
      where: { id: product.vendor_id },
      attributes: ["return_policies"],
    });

    const isForm = await Category.findOne({
      where: { id: product.cat_id },
      attributes: ["is_form"],
    });

    plainProduct.is_form = isForm?.get("is_form");

    return res.status(200).json({
      status: 1,
      message: "Success",
      data: plainProduct,
      related_products,
      returnpolicy,
      isForm,
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
    return res
      .status(500)
      .json({ status: 0, message: "Failed to fetch product details", error });
  }
};

exports.vendorProducts = async (req, res) => {
  const { vendor_id, user_id } = req.query;

  try {
    const products = await Product.findAll({
      where: {
        vendor_id,
        status: 1,
      },
      include: [
        { model: ProductImage, where: { media: "Image" }, as: "productimage" },
        { model: Variation, as: "variations" },
        { model: Ratting, as: "rattings" },
      ],
      order: [["id", "DESC"]],
      limit: 10,
    });

    if (!products.length) {
      return res
        .status(404)
        .json({ status: 0, message: "No products found for this vendor" });
    }

    const vendorDetails = await User.findOne({
      where: {
        id: vendor_id,
        type: "3",
        is_available: 1,
      },
      attributes: ["mobile", "email", "store_address", "id"],
    });

    const banners = await Banner.findAll({
      where: {
        vendor_id,
        positions: "store",
      },
      attributes: [
        "id",
        [
          sequelize.literal(
            `CONCAT('${process.env.BASE_URL}/storage/app/public/images/banner/', image)`
          ),
          "image_url",
        ],
      ],
    });

    return res.status(200).json({
      status: 1,
      message: "Success",
      data: products,
      vendor_details: vendorDetails,
      banners,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ status: 0, message: "Something went wrong", error });
  }
};

exports.products = async (req, res) => {
  const { slug } = req.body;
  const user_id = 1;

  if (!slug) {
    return res
      .status(400)
      .json({ status: 0, message: "Please select one sub category" });
  }

  const subcategory = await Subcategory.findOne({
    where: { slug },
    attributes: [
      "id",
      "subcategory_name",
      [
        sequelize.literal(
          `CONCAT('${apiUrl}/storage/app/public/images/subcategory/', Subcategory.icon)`
        ),
        "image_url",
      ],
      "video",
      [
        sequelize.literal(
          `CONCAT('${apiUrl}/storage/app/public/images/subcategory/', Subcategory.thumbnail)`
        ),
        "thumbnail",
      ],
      "slug",
      "alt_tag",
      "image_title",
      "meta_title",
      "meta_description",
      "subcategory_title",
      "subcategory_sub_title",
      "location",
    ],
    include: [
      {
        model: Category,
        attributes: [
          "id",
          "category_name",
          [
            sequelize.literal(
              `CONCAT('${apiUrl}/storage/app/public/images/category/', web_icon)`
            ),
            "image_url",
          ],
          // 'video',
          // [sequelize.literal(`CONCAT('${apiUrl}/storage/app/public/images/category/', Category.thumbnail)`), 'thumbnail'],
          "is_form",
          "is_page",
          [
            sequelize.literal(
              `CONCAT('${apiUrl}/storage/app/public/images/category/', motion_graphics)`
            ),
            "motion_graphics",
          ],
        ],
        as: "category",
      },
    ],
  });

  try {
    const products = await Product.findAll({
      attributes: [
        "id",
        "product_name",
        "description",
        "product_price",
        "discounted_price",
        "is_variation",
        "sku",
        "slug",
        "location",
        "rating",
        "total_reviews",
      ],
      include: [
        {
          model: ProductImage,
          attributes: [
            "id",
            "product_id",
            "alt_tag",
            "image_title",
            [
              sequelize.fn(
                "CONCAT",
                sequelize.literal(
                  `'${apiUrl}/storage/app/public/images/products/'`
                ),
                sequelize.col("productimage.image")
              ),
              "image_url",
            ],
          ],
          where: { media: "Image" },
          as: "productimage",
        },
        // {
        //   model: Variation,
        //   as: "variations",
        //   include: [
        //     {
        //       model: Attribute,
        //       attributes: ["id", "attribute"],
        //       where: { status: 1 },
        //       as: "attribute",
        //     },
        //   ],
        // },
        {
          model: Ratting,
          as: "rattings",
        },
        // {
        //     model: Wishlist,
        //     attributes: [
        //         [sequelize.literal('CASE WHEN wishlist.product_id IS NULL THEN 0 ELSE 1 END'), 'is_wishlist']
        //     ],
        //     where: {
        //         user_id: user_id
        //     },
        //     required: false,
        //     as: 'wishlist'
        // },
        // {
        //     model: User,
        //     attributes: [],
        //     where: {
        //         is_available: 1
        //     },
        //     required: true,
        //     as: 'vendor'
        // }
      ],
      where: {
        subcat_id: subcategory.id,
        status: 1,
      },
      order: [["id", "DESC"]],
      limit: 10,
    });

    if (products.length > 0) {
      return res
        .status(200)
        .json({ status: 1, message: "Success", data: products, subcategory });
    } else {
      return res.status(200).json({ status: 0, message: "No data found" });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return res
      .status(500)
      .json({ status: 0, message: "Failed to fetch products", error });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        status: true,
      },
      attributes: [
        "id",
        "product_name",
        "product_price",
        "discounted_price",
        "is_variation",
        "sku",
        "slug",
      ],
      include: [
        {
          model: ProductImage,
          attributes: [
            "id",
            "product_id",
            "alt_tag",
            "image_title",
            [
              sequelize.fn(
                "CONCAT",
                sequelize.literal(
                  `'${apiUrl}/storage/app/public/images/products/'`
                ),
                sequelize.col("productimage.image")
              ),
              "image_url",
            ],
          ],
          where: { media: "Image" },
          as: "productimage",
        },
        {
          model: Variation,
          as: "variations",
        },
        {
          model: Ratting,
          as: "rattings",
        },
      ],
      order: [["id", "DESC"]],
    });

    if (!products.length) {
      return res.status(404).json({ status: 0, message: "No products found" });
    }

    return res
      .status(200)
      .json({ status: 1, message: "Success", data: products });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ status: 0, message: "Something went wrong", error });
  }
};

exports.filter = async (req, res) => {
  const { user_id, type } = req.query;

  try {
    let products;

    switch (type) {
      case "price-high-to-low":
        products = await Product.findAll({
          where: {
            status: true,
          },
          include: [
            {
              model: ProductImage,
              attributes: [
                "id",
                "product_id",
                "alt_tag",
                "image_title",
                [
                  sequelize.fn(
                    "CONCAT",
                    sequelize.literal(
                      `'${apiUrl}/storage/app/public/images/products/'`
                    ),
                    sequelize.col("productimage.image")
                  ),
                  "image_url",
                ],
              ],
              where: { media: "Image" },
              as: "productimage",
            },
            {
              model: Variation,
              as: "variations",
            },
            {
              model: Ratting,
              as: "rattings",
            },
          ],
          attributes: {
            include: [
              [
                sequelize.literal(
                  `(CASE WHEN wishlists.product_id IS NULL THEN 0 ELSE 1 END)`
                ),
                "is_wishlist",
              ],
            ],
          },
          order: [["product_price", "DESC"]],
          limit: 12,
        });
        break;

      case "price-low-to-high":
        products = await Product.findAll({
          where: {
            status: true,
          },
          include: [
            {
              model: ProductImage,
              attributes: [
                "id",
                "product_id",
                "alt_tag",
                "image_title",
                [
                  sequelize.fn(
                    "CONCAT",
                    sequelize.literal(
                      `'${apiUrl}/storage/app/public/images/products/'`
                    ),
                    sequelize.col("productimage.image")
                  ),
                  "image_url",
                ],
              ],
              where: { media: "Image" },
              as: "productimage",
            },
            {
              model: Variation,
              as: "variations",
            },
            {
              model: Ratting,
              as: "rattings",
            },
          ],
          attributes: {
            include: [
              [
                sequelize.literal(
                  `(CASE WHEN wishlists.product_id IS NULL THEN 0 ELSE 1 END)`
                ),
                "is_wishlist",
              ],
            ],
          },
          order: [["product_price", "ASC"]],
          limit: 12,
        });
        break;

      default:
        return res.status(400).json({ status: 0, message: "Invalid type" });
    }

    return res
      .status(200)
      .json({ status: 1, message: "Success", data: products });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ status: 0, message: "Something went wrong", error });
  }
};

exports.allProductsList = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        status: 1,
      },
      attributes: ["id", "product_name", "slug"],
      order: [["id", "DESC"]],
    });

    if (!products.length) {
      return res.status(404).json({ status: 0, message: "No products found" });
    }

    return res
      .status(200)
      .json({ status: 1, message: "Success", data: products });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ status: 0, message: "Something went wrong", error });
  }
};

exports.search = async (req, res) => {
  const { keyword } = req.query;

  try {
    const products = await Product.findAll({
      where: {
        product_name: {
          [Op.like]: `%${keyword}%`,
        },
        status: 1,
      },
      attributes: [
        "id",
        "product_name",
        "slug",
        "product_price",
        "discounted_price",
        "rating",
        "total_reviews",
      ],
      include: [
        {
          model: ProductImage,
          attributes: [
            "id",
            "product_id",
            [
              sequelize.fn(
                "CONCAT",
                sequelize.literal(
                  `'${apiUrl}/storage/app/public/images/products/'`
                ),
                sequelize.col("productimage.image")
              ),
              "image_url",
            ],
          ],
          where: { media: "Image" },
          as: "productimage",
        },
        // { model: Variation, as: "variations" },
        // { model: Ratting, as: "rattings" },
      ],
      order: [["id", "DESC"]],
      limit: 10,
    });

    if (!products.length) {
      return res.status(404).json({ status: 0, message: "No products found" });
    }

    return res
      .status(200)
      .json({ status: 1, message: "Success", data: products });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ status: 0, message: "Something went wrong", error });
  }
};
