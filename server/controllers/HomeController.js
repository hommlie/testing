const sequelize = require("../config/connection");
const { Sequelize, Op, fn, col, literal, where } = require("sequelize");
const {
  User,
  Product,
  ProductImage,
  Order,
  Variation,
  Ratting,
  Wishlist,
  Brand,
  Notification,
  Settings,
  Testimonials,
  Subcategory,
  ThoughtfulCurations,
  Category,
  Slider,
  HomepageSection,
  Banner,
} = require("../models");
const apiUrl = process.env.apiUrl;

exports.homeFeeds = async (req, res) => {
  const { user_id } = req.body;

  try {
    const commonProductAttributes = [
      "id",
      "product_name",
      "product_price",
      "discounted_price",
      "is_variation",
      "sku",
      "slug",
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
              sequelize.col("image")
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
      {
        model: User,
        attributes: [],
        where: {
          is_available: 1,
        },
        required: true,
        as: "vendor",
      },
    ];

    // const featured_products = await Product.findAll({
    //     attributes: commonProductAttributes,
    //     include: commonIncludes,
    //     where: {
    //         is_featured: 1,
    //         status: 1
    //     },
    //     order: sequelize.random(),
    //     limit: 10,
    // });

    // const hot_products = await Product.findAll({
    //     attributes: commonProductAttributes,
    //     include: commonIncludes,
    //     where: {
    //         is_hot: 1,
    //         status: 1
    //     },
    //     order: sequelize.random(),
    //     limit: 10,
    // });

    // const new_products = await Product.findAll({
    //     attributes: commonProductAttributes,
    //     include: commonIncludes,
    //     where: {
    //         status: 1
    //     },
    //     order: [['id', 'DESC']],
    //     limit: 10,
    // });

    const most_booked_services = await Product.findAll({
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
      // group: ['Product.id'],
      limit: 10,
    });

    // const cleaning_services = await Product.findAll({
    //     attributes: commonProductAttributes,
    //     include: commonIncludes,
    //     where: {
    //         cat_id: 19,
    //         status: 1
    //     },
    //     order: [['id', 'DESC']],
    //     limit: 10,
    // });

    // const pest_control = await Product.findAll({
    //     attributes: commonProductAttributes,
    //     include: commonIncludes,
    //     where: {
    //         cat_id: 18,
    //         status: 1
    //     },
    //     order: [['id', 'DESC']],
    //     limit: 10,
    // });

    // const safety_pro_netting = await Product.findAll({
    //     attributes: commonProductAttributes,
    //     include: commonIncludes,
    //     where: {
    //         cat_id: 28,
    //         status: 1
    //     },
    //     order: [['id', 'DESC']],
    //     limit: 10,
    // });

    // const mosquito_mesh = await Product.findAll({
    //     attributes: commonProductAttributes,
    //     include: commonIncludes,
    //     where: {
    //         cat_id: 29,
    //         status: 1
    //     },
    //     order: [['id', 'DESC']],
    //     limit: 10,
    // });

    const cleaning_services = await Subcategory.findAll({
      attributes: [
        "id",
        "subcategory_name",
        "alt_tag",
        "slug",
        "image_title",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/subcategory/', Subcategory.icon)`
          ),
          "image_url",
        ],
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
      where: { cat_id: 19, status: 1 },
    });

    const pest_control = await Subcategory.findAll({
      attributes: [
        "id",
        "subcategory_name",
        "alt_tag",
        "slug",
        "image_title",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/subcategory/', Subcategory.icon)`
          ),
          "image_url",
        ],
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
      where: { cat_id: 18, status: 1 },
    });

    const safety_pro_netting = await Subcategory.findAll({
      attributes: [
        "id",
        "subcategory_name",
        "alt_tag",
        "slug",
        "image_title",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/subcategory/', Subcategory.icon)`
          ),
          "image_url",
        ],
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
      where: { cat_id: 28, status: 1 },
    });

    const mosquito_mesh = await Subcategory.findAll({
      attributes: [
        "id",
        "subcategory_name",
        "alt_tag",
        "slug",
        "image_title",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/subcategory/', Subcategory.icon)`
          ),
          "image_url",
        ],
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
      where: { cat_id: 47, status: 1 },
    });

    const shop_now = await Product.findAll({
      attributes: commonProductAttributes,
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
                sequelize.col("image")
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
      ],
      where: {
        cat_id: 38,
        status: 1,
      },
      // order: [['id', 'DESC']],
      limit: 10,
    });

    const videos = await ThoughtfulCurations.findAll({
      attributes: [
        "id",
        [
          sequelize.fn(
            "CONCAT",
            sequelize.literal(
              `'${apiUrl}/storage/app/public/thoughtfull-thumbnails/'`
            ),
            sequelize.col("thumbnail")
          ),
          "thumbnail",
        ],
        //   [sequelize.fn('CONCAT', sequelize.literal(`'${apiUrl}/storage/app/public/thoughtfull-videos/'`), sequelize.col('video')), 'video']
        "video",
      ],
      limit: 4,
    });

    const testimonials = await Testimonials.findAll({
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

    // const vendors = await User.findAll({
    //     attributes: [
    //         'id',
    //         'name',
    //         [literal(`CONCAT('${process.env.BASE_URL}/storage/app/public/images/profile/', profile_pic)`), 'image_url']
    //     ],
    //     where: {
    //         type: 3,
    //         is_available: 1
    //     },
    //     order: Sequelize.literal('RAND()'),
    //     limit: 10
    // });

    // const brands = await Brand.findAll({
    //     attributes: [
    //         'id',
    //         'brand_name',
    //         [literal(`CONCAT('${process.env.BASE_URL}/storage/app/public/images/brand/', icon)`), 'image_url']
    //     ],
    //     where: {
    //         status: 1
    //     },
    //     order: [
    //         [Sequelize.fn('RAND')]
    //     ],
    //     limit: 10
    // });

    // featured_products.forEach(product => {
    //     // Convert numeric values to strings as per your expected response
    //     product.product_price = product.product_price.toString();
    //     product.discounted_price = product.discounted_price.toString();
    //     product.is_variation = product.is_variation ? "1" : "0";
    // });

    // hot_products.forEach(product => {
    //     product.product_price = product.product_price.toString();
    //     product.discounted_price = product.discounted_price.toString();
    //     product.is_variation = product.is_variation ? "1" : "0";
    // });

    // new_products.forEach(product => {
    //     product.product_price = product.product_price.toString();
    //     product.discounted_price = product.discounted_price.toString();
    //     product.is_variation = product.is_variation ? "1" : "0";
    // });

    // const notifications = await Notification.count({
    //     where: {
    //         is_read: 1,
    //         user_id: user_id
    //     }
    // });

    const data = await Settings.findOne();

    if (
      // featured_products.length > 0 &&
      // hot_products.length > 0 &&
      // new_products.length > 0 &&
      most_booked_services.length > 0
      // &&
      // cleaning_services.length > 0 &&
      // pest_control.length > 0 &&
      // safety_pro_netting.length > 0 &&
      // mosquito_mesh.length > 0 &&
      // shop_now.length > 0 &&
      // videos.length > 0 &&
      // testimonials.length > 0 &&
      // vendors.length > 0 &&
      // brands.length > 0
    ) {
      res.status(200).json({
        status: 1,
        message: "Success",
        currency: data.currency,
        currency_position: data.currency_position,
        // featured_products: featured_products,
        // hot_products: hot_products,
        // new_products: new_products,
        most_booked_services: most_booked_services,
        cleaning_services: cleaning_services,
        pest_control: pest_control,
        safety_pro_netting: safety_pro_netting,
        mosquito_mesh: mosquito_mesh,
        shop_now: shop_now,
        videos: videos,
        testimonials: testimonials,
        // vendors: vendors,
        // brands: brands,
        // notifications: notifications
      });
    } else {
      res.status(200).json({
        status: 0,
        message: "No data",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: 0,
      message: "Internal server error",
      error: error,
    });
  }
};

exports.getHomePageData = async (req, res) => {
  try {
    const commonProductAttributes = [
      "id",
      "product_name",
      "product_price",
      "discounted_price",
      "is_variation",
      "sku",
      "slug",
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
              sequelize.col("image")
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
      {
        model: User,
        attributes: [],
        where: {
          is_available: 1,
        },
        required: true,
        as: "vendor",
      },
    ];

    const sliders = await Slider.findAll({
      attributes: [
        "link",
        "alt_tag",
        "image_title",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/slider/', image)`
          ),
          "image_url",
        ],
      ],
      where: { status: 1 },
    });

    const heroSections = await HomepageSection.findAll({
      attributes: [
        "title",
        "sub_title",
        "image_title",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/homesections/', image)`
          ),
          "image",
        ],
        "btn_text",
        "btn_link",
        "alt_tag",
        "image_title",
      ],
      where: { status: 1, type: "hero" },
    });

    const banners = await Banner.findAll({
      attributes: [
        "id",
        "type",
        "cat_id",
        "product_id",
        "positions",
        "link",
        "alt_tag",
        "image_title",
        "status",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/banner/', image)`
          ),
          "image",
        ],
      ],
      include: {
        model: Category,
        as: "category",
        attributes: ["category_name"],
      },
      where: { positions: "banner" },
    });

    const offerBanners = await HomepageSection.findAll({
      attributes: [
        "title",
        "sub_title",
        "image_title",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/homesections/', image)`
          ),
          "image",
        ],
        "btn_text",
        "btn_link",
        "alt_tag",
        "image_title",
      ],
      where: { status: 1, type: "offer" },
    });

    const most_booked_services = await Product.findAll({
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
      // group: ['Product.id'],
      limit: 10,
    });

    const thoughtfulVideos = await ThoughtfulCurations.findAll({
      attributes: [
        "id",
        [
          sequelize.fn(
            "CONCAT",
            sequelize.literal(
              `'${apiUrl}/storage/app/public/thoughtfull-thumbnails/'`
            ),
            sequelize.col("thumbnail")
          ),
          "thumbnail",
        ],
        //   [sequelize.fn('CONCAT', sequelize.literal(`'${apiUrl}/storage/app/public/thoughtfull-videos/'`), sequelize.col('video')), 'video']
        "video",
      ],
      limit: 4,
    });

    const testimonials = await Testimonials.findAll({
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

    const data = await Settings.findOne();

    // Get all active categories with their subcategories
    const allCategories = await Category.findAll({
      attributes: [
        "id",
        "category_name",
        "slug",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/category/', Category.web_icon)`
          ),
          "icon_url",
        ],
      ],
      where: { status: 1 },
      include: [
        {
          model: Subcategory,
          attributes: [
            "id",
            "subcategory_name",
            "slug",
            // [
            //   sequelize.literal(
            //     `CONCAT('${apiUrl}/storage/app/public/images/subcategory/', icon)`
            //   ),
            //   "image_url",
            // ],
          ],
          where: { status: 1 },
          required: false,
          include: [
            {
              model: Product,
            },
          ],
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

    // const products = await Product.findAll({
    //     where: {
    //       subcat_id: subcat_id,
    //       status: 1,
    //     },
    //     attributes: [
    //       "id",
    //       "product_name",
    //       "product_price",
    //       "cat_id",
    //       "discounted_price",
    //       "description",
    //       "tags",
    //       "product_qty",
    //       "is_variation",
    //       "vendor_id",
    //       "sku",
    //       "free_shipping",
    //       "shipping_cost",
    //       "tax_type",
    //       "tax",
    //       "est_shipping_days",
    //       "is_return",
    //       "return_days",
    //       "faqs",
    //       "slug",
    //       "location",
    //       "rating",
    //       "total_reviews",
    //     ],
    //     include: [
    //       {
    //         model: ProductImage,
    //         attributes: [
    //           "id",
    //           "product_id",
    //           "media",
    //           "thumbnail",
    //           "alt_tag",
    //           "image_title",
    //           [
    //             sequelize.literal(`
    //               CASE
    //                 WHEN media = 'Image' THEN CONCAT('${apiUrl}/storage/app/public/images/products/', productimages.image)
    //                 WHEN media = 'Video' THEN productimages.image
    //                 ELSE NULL
    //               END
    //             `),
    //             "image_url",
    //           ],
    //         ],
    //         where: { media: "Image" },
    //         as: "productimages",
    //       },
    //       {
    //         model: Variation,
    //         attributes: [
    //           "id",
    //           "product_id",
    //           "attribute_id",
    //           "price",
    //           "description",
    //           "discounted_variation_price",
    //           "variation",
    //           "variation_interval",
    //           "variation_times",
    //           [
    //             sequelize.literal(
    //               `CONCAT('${apiUrl}/storage/app/public/images/variation/', variations.image)`
    //             ),
    //             "image",
    //           ],
    //           "total_reviews",
    //           "avg_rating",
    //           "qty",
    //           "created_at",
    //           "updated_at",
    //         ],
    //         include: [
    //           {
    //             model: Attribute,
    //             attributes: [
    //               "id",
    //               "attribute",
    //               "specifications",
    //               [
    //                 sequelize.fn(
    //                   "CONCAT",
    //                   `${apiUrl}/storage/app/public/images/attribute/`,
    //                   sequelize.col("variations->attribute.image")
    //                 ),
    //                 "image",
    //               ],
    //               "total_reviews",
    //               "avg_rating",
    //             ],
    //             where: { status: 1 },
    //             as: "attribute",
    //           },
    //         ],
    //         as: "variations",
    //         required: false,
    //         order: [["created_at", "ASC"]],
    //       },
    //       {
    //         model: Ratting,
    //         as: "rattings",
    //         required: false,
    //       },
    //       {
    //         model: Category,
    //         attributes: ["category_name", "is_form", "is_page"],
    //         as: "category",
    //       },
    //       {
    //         model: Subcategory,
    //         attributes: ["subcategory_name"],
    //         as: "subcategory",
    //       },
    //     ],
    //     order: [["id", "DESC"]],
    //   });
    // Transform the products data
    //   const transformedProducts = await Promise.all(
    //     products.map(async (product) => {
    //       const plainProduct = product.get({ plain: true });

    //       const reviewsData = fetchProductReviews(product.id);

    //       // Group variations by attribute_id
    //       const groupedVariations = plainProduct.variations.reduce(
    //         (acc, variation) => {
    //           // Create variation object without attribute info
    //           const variationData = {
    //             id: variation.id,
    //             product_id: variation.product_id,
    //             price: variation.price,
    //             discounted_variation_price: variation.discounted_variation_price,
    //             variation: variation.variation,
    //             variation_interval: variation.variation_interval,
    //             variation_times: variation.variation_times,
    //             description: variation.description,
    //             image: variation.image,
    //             total_reviews: variation.total_reviews,
    //             avg_rating: variation.avg_rating,
    //             qty: variation.qty,
    //             created_at: variation.created_at,
    //             updated_at: variation.updated_at,
    //           };

    //           // Check if attribute group exists
    //           let existingGroup = acc.find(
    //             (group) => group.attribute_id === variation.attribute_id
    //           );

    //           if (existingGroup) {
    //             // Add variation to existing group
    //             existingGroup.variations.push(variationData);
    //           } else {
    //             // Create new attribute group
    //             existingGroup = {
    //               attribute_id: variation.attribute_id,
    //               attribute_name: variation.attribute.attribute,
    //               specifications: variation.attribute.specifications,
    //               image: variation.attribute.image,
    //               total_reviews: variation.attribute.total_reviews,
    //               avg_rating: variation.attribute.avg_rating,
    //               variations: [variationData],
    //               reviewsData,
    //             };
    //             acc.push(existingGroup);
    //           }

    //           // Calculate starting price ONLY from discounted_variation_price
    //           const validDiscountedPrices = existingGroup.variations
    //             .map((v) => v.discounted_variation_price)
    //             .filter((price) => price !== null && price !== undefined);

    //           // Set starting price to the minimum discounted price,
    //           // fallback to original price if no discounted prices exist
    //           existingGroup.starting_price =
    //             validDiscountedPrices.length > 0
    //               ? Math.min(...validDiscountedPrices)
    //               : Math.min(...existingGroup.variations.map((v) => v.price));

    //           // Sort variations within each attribute group
    //           existingGroup.variations.sort(advancedSort);

    //           return acc;
    //         },
    //         []
    //       );

    //       // Sort attributes by name
    //       groupedVariations.sort((a, b) =>
    //         a.attribute_name.localeCompare(b.attribute_name)
    //       );

    //       // Get return policy
    //       const returnPolicy = await User.findOne({
    //         where: { id: product.vendor_id },
    //         attributes: ["return_policies"],
    //       });

    //       // Remove the original variations array
    //       delete plainProduct.variations;

    //       return {
    //         ...plainProduct,
    //         attributes: groupedVariations,
    //         return_policy: returnPolicy?.return_policies,
    //         is_form: plainProduct.category.is_form,
    //         is_page: plainProduct.category.is_page,
    //       };
    //     })
    //   );

    if (
      //   heroSections.length > 0 &&
      //   banners.length > 0 &&
      //   sliders.length > 0 &&
      most_booked_services.length > 0
    ) {
      res.status(200).json({
        status: 1,
        message: "Success",
        data: {
          sliders: sliders || [],
          heroSections: heroSections || [],
          banners: banners || [],
          offerBanners: offerBanners || [],
          most_booked_services: most_booked_services || [],
          thoughtfulVideos: thoughtfulVideos || [],
          testimonials: testimonials || [],
          faqs: data.faqs || [],
          all_categories: formattedCategories,
        },
      });
    } else {
      res.status(200).json({
        status: 0,
        message: "No data",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: 0,
      message: "Internal server error",
      error: error,
    });
  }
};
