const sequelize = require("../config/connection");
const {
  AppHeader,
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
} = require("../models");
const { fetchProductReviews } = require("../middleware/getCommonData");

const apiUrl = process.env.apiUrl;

const advancedSort = (a, b) => {
  // Try parsing numeric values first
  const numA = parseFloat(a.variation);
  const numB = parseFloat(b.variation);

  // If both are valid numbers, sort numerically
  if (!isNaN(numA) && !isNaN(numB)) {
    return numA - numB;
  }

  // If one is a number and the other isn't, put numbers first
  if (!isNaN(numA) && isNaN(numB)) return -1;
  if (isNaN(numA) && !isNaN(numB)) return 1;

  // If neither are numbers, do a natural string comparison
  return a.variation.localeCompare(b.variation, undefined, {
    numeric: true,
    sensitivity: "base",
  });
};

// Sorting function for the entire product list
const sortProductList = (products) => {
  return products
    .map((product) => ({
      ...product,
      attributes: product.attributes
        .map((attr) => ({
          ...attr,
          variations: [...attr.variations].sort(advancedSort),
        }))
        .sort((a, b) => a.attribute_name.localeCompare(b.attribute_name)),
    }))
    .sort((a, b) => a.product_name.localeCompare(b.product_name));
};

exports.getCategory = async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      attributes: [
        "id",
        "category_name",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/category/', icon)`
          ),
          "app_icon",
        ],
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/category/', web_icon)`
          ),
          "image_url",
        ],
        "video",
        "thumbnail",
        "is_form",
        "is_page",
        "slug",
        "alt_tag",
        "image_title",
        "meta_title",
        "meta_description",
        "location",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/category/', motion_graphics)`
          ),
          "motion_graphics",
        ],
      ],
      include: [
        {
          model: Subcategory,
          attributes: [
            "id",
            "subcategory_name",
            [
              sequelize.literal(
                `CONCAT('${apiUrl}/storage/app/public/images/subcategory/', icon)`
              ),
              "app_icon",
            ],
            "slug",
          ],
          where: { status: 1 },
        },
      ],
      where: { status: 1 },
      limit: 6,
    });

    // Fetch app header data
    const appHeaders = await AppHeader.findAll({
      attributes: [
        "id",
        "bg_color",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/appHeaderImgae/', image)`
          ),
          "image",
        ],
        "text_color",
        "sub_text_color",
      ],
    });

    // Process app header data into desired format
    let app_header = {};
    let shop_header = {};

    appHeaders.forEach((header) => {
      if (header.id === 1) {
        app_header = header;
      } else if (header.id === 2) {
        shop_header = header;
      }
    });

    if (categoryData.length > 0) {
      return res.status(200).json({
        status: 1,
        message: "Success",
        data: categoryData,
        app_header,
        shop_header,
      });
    } else {
      return res.status(200).json({ status: 0, message: "No data found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 0, message: "Error occurred", error: error });
  }
};

exports.getSubcategory = async (req, res) => {
  try {
    const { cat_id } = req.body;

    const categoryData = await Category.findOne({
      attributes: [
        "id",
        "category_name",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/category/', web_icon)`
          ),
          "image_url",
        ],
        "video",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/category/', thumbnail)`
          ),
          "thumbnail",
        ],
        "slug",
        "alt_tag",
        "image_title",
        "meta_title",
        "meta_description",
        "location",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/category/', motion_graphics)`
          ),
          "motion_graphics",
        ],
        "specifications",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/category/', banner)`
          ),
          "banner",
        ],
        "total_reviews",
        "avg_rating",
        "faqs",
        "about",
      ],
      where: { id: cat_id },
    });

    const otherServices = await Category.findAll({
      attributes: ["id", "category_name", "slug"],
      where: {
        status: 1,
      },
      order: [["id", "DESC"]],
    });

    const subcategoryData = await Subcategory.findAll({
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
        "specifications",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/subcategory/', Subcategory.sub_cat_banner)`
          ),
          "banner",
        ],
        "total_reviews",
        "avg_rating",
        "faqs",
        "about",
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
            "is_form",
            "is_page",
            "slug",
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
      where: { cat_id, status: 1 },
    });

    const subcategory = await Promise.all(
      subcategoryData.map(async (sub) => {
        return {
          subcat_id: sub.id,
          subcategory_name: sub.subcategory_name,
          subcategory_icon: sub.getDataValue("image_url"),
          meta_title: sub.meta_title,
          meta_description: sub.meta_description,
          subcategory_title: sub.subcategory_title,
          subcategory_sub_title: sub.subcategory_sub_title,
          slug: sub.slug,
          location: sub.location,
          specifications: sub.specifications,
          banner: sub.banner,
          total_reviews: sub.total_reviews,
          avg_rating: sub.avg_rating,
          category: sub.category,
        };
      })
    );

    if (subcategory.length > 0) {
      // Extract only the necessary data from categoryData
      const simplifiedCategoryData = {
        ...categoryData.get({ plain: true }),
        other_services: otherServices || [],
      };

      return res.status(200).json({
        status: 1,
        message: "Success",
        data: {
          subcategory,
          categoryData: simplifiedCategoryData,
        },
      });
    } else {
      return res
        .status(200)
        .json({ status: 0, message: "No subcategory data found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: 0, message: "Error occurred", error: error.message });
  }
};

exports.getCleaningSubcategory = async (req, res) => {
  try {
    const { slug } = req.body;

    if (!slug) {
      return res.status(400).json({
        status: 0,
        message: "slug is required",
      });
    }

    // Fetch subcategory data
    const subcategoryData = await Subcategory.findOne({
      attributes: [
        "id",
        "subcategory_name",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/subcategory/', Subcategory.icon)`
          ),
          "image_url",
        ],
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/subcategory/', Subcategory.sub_cat_banner)`
          ),
          "banner",
        ],
        "video",
        "thumbnail",
        "slug",
        "alt_tag",
        "image_title",
        "location",
        "specifications",
        "total_reviews",
        "avg_rating",
        "faqs",
        "about",
        "meta_title",
        "meta_description",
      ],
      include: [
        {
          model: Category,
          as: "category",
          attributes: [
            "id",
            "category_name",
            [
              sequelize.literal(
                `CONCAT('${apiUrl}/storage/app/public/images/category/', web_icon)`
              ),
              "image_url",
            ],
            "video",
            "thumbnail",
            "is_form",
            "is_page",
            "slug",
            "alt_tag",
            "image_title",
            "meta_title",
            "meta_description",
            "location",
            [
              sequelize.literal(
                `CONCAT('${apiUrl}/storage/app/public/images/category/', motion_graphics)`
              ),
              "motion_graphics",
            ],
            "specifications",
            "total_reviews",
            "avg_rating",
            "faqs",
            "about",
          ],
        },
      ],
      where: {
        slug,
        status: 1,
      },
    });

    const otherServices = await Subcategory.findAll({
      attributes: ["id", "subcategory_name", "slug"],
      where: {
        status: 1,
      },
      order: [["id", "DESC"]],
    });

    if (!subcategoryData) {
      return res.status(404).json({
        status: 0,
        message: "Subcategory not found or inactive",
      });
    }

    // Fetch products for the specific subcategory with detailed information
    const products = await Product.findAll({
      where: {
        subcat_id: subcategoryData.id,
        status: 1,
      },
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
        "location",
        "rating",
        "total_reviews",
        "faqs_for_mobile",
        "description_for_mobile",
        "pro_specifications",
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
          where: { media: "Image" },
          as: "productimages",
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
            [
              sequelize.literal(
                `CONCAT('${apiUrl}/storage/app/public/images/variation/', variations.image)`
              ),
              "image",
            ],
            "total_reviews",
            "avg_rating",
            "qty",
            "created_at",
            "updated_at",
          ],
          include: [
            {
              model: Attribute,
              attributes: [
                "id",
                "attribute",
                "specifications",
                [
                  sequelize.fn(
                    "CONCAT",
                    `${apiUrl}/storage/app/public/images/attribute/`,
                    sequelize.col("variations->attribute.image")
                  ),
                  "image",
                ],
                "total_reviews",
                "avg_rating",
              ],
              where: { status: 1 },
              as: "attribute",
            },
          ],
          as: "variations",
          required: false,
          order: [["created_at", "ASC"]],
        },
        {
          model: Ratting,
          as: "rattings",
          required: false,
        },
        {
          model: Category,
          attributes: ["category_name", "is_form", "is_page"],
          as: "category",
        },
        {
          model: Subcategory,
          attributes: ["subcategory_name"],
          as: "subcategory",
        },
      ],
      order: [["id", "DESC"]],
    });
    // Transform the products data
    const transformedProducts = await Promise.all(
      products.map(async (product) => {
        const plainProduct = product.get({ plain: true });

        const reviewsData = fetchProductReviews(product.id);

        // Group variations by attribute_id
        const groupedVariations = plainProduct.variations.reduce(
          (acc, variation) => {
            // Create variation object without attribute info
            const variationData = {
              id: variation.id,
              product_id: variation.product_id,
              price: variation.price,
              discounted_variation_price: variation.discounted_variation_price,
              variation: variation.variation,
              variation_interval: variation.variation_interval,
              variation_times: variation.variation_times,
              description: variation.description,
              image: variation.image,
              total_reviews: variation.total_reviews,
              avg_rating: variation.avg_rating,
              qty: variation.qty,
              created_at: variation.created_at,
              updated_at: variation.updated_at,
              product_name: product.product_name,
              product_tax: product.tax,
              product_tax_type: product.tax_type,
              attribute_id: variation.attribute_id,
              product_shipping_cost: product.shipping_cost,
            };

            // Check if attribute group exists
            let existingGroup = acc.find(
              (group) => group.attribute_id === variation.attribute_id
            );

            if (existingGroup) {
              // Add variation to existing group
              existingGroup.variations.push(variationData);
            } else {
              // Create new attribute group
              existingGroup = {
                attribute_id: variation.attribute_id,
                attribute_name: variation.attribute.attribute,
                specifications: variation.attribute.specifications,
                image: variation.attribute.image,
                total_reviews: variation.attribute.total_reviews,
                avg_rating: variation.attribute.avg_rating,
                variations: [variationData],
                reviewsData,
              };
              acc.push(existingGroup);
            }

            // Calculate starting price ONLY from discounted_variation_price
            const validDiscountedPrices = existingGroup.variations
              .map((v) => v.discounted_variation_price)
              .filter((price) => price !== null && price !== undefined);

            // Set starting price to the minimum discounted price,
            // fallback to original price if no discounted prices exist
            existingGroup.starting_price =
              validDiscountedPrices.length > 0
                ? Math.min(...validDiscountedPrices)
                : Math.min(...existingGroup.variations.map((v) => v.price));

            // Sort variations within each attribute group
            existingGroup.variations.sort(advancedSort);

            return acc;
          },
          []
        );

        // Sort attributes by name
        groupedVariations.sort((a, b) =>
          a.attribute_name.localeCompare(b.attribute_name)
        );

        // Get return policy
        const returnPolicy = await User.findOne({
          where: { id: product.vendor_id },
          attributes: ["return_policies"],
        });

        // Remove the original variations array
        delete plainProduct.variations;

        return {
          ...plainProduct,
          attributes: groupedVariations,
          return_policy: returnPolicy?.return_policies,
          is_form: plainProduct.category.is_form,
          is_page: plainProduct.category.is_page,
        };
      })
    );

    // Structure the response
    const response = {
      subcategory_id: subcategoryData.id,
      subcategory_name: subcategoryData.subcategory_name,
      subcategory_icon: subcategoryData.get("image_url"),
      subcategory_banner: subcategoryData.get("banner"),
      location: subcategoryData.get("location"),
      specifications: subcategoryData.get("specifications"),
      avg_rating: subcategoryData.get("avg_rating"),
      total_reviews: subcategoryData.get("total_reviews"),
      faqs: subcategoryData.get("faqs"),
      about: subcategoryData.get("about"),
      meta_title: subcategoryData.get("meta_title"),
      meta_description: subcategoryData.get("meta_description"),
      category: subcategoryData.category,
      video: subcategoryData.video,
      thumbnail: subcategoryData.thumbnail,
      slug: subcategoryData.slug,
      alt_tag: subcategoryData.alt_tag,
      image_title: subcategoryData.image_title,
      products: transformedProducts,
      other_services: otherServices,
    };

    return res.status(200).json({
      status: 1,
      message: "Success",
      data: response,
    });
  } catch (error) {
    console.error("Error fetching subcategory data:", error);
    return res.status(500).json({
      status: 0,
      message: "Error occurred",
      error: error.message,
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ["id", "category_name", "slug"],
    });

    return res.status(200).json({
      status: 1,
      message: "Success",
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({
      status: 0,
      message: "Error occurred",
      error: error.message,
    });
  }
};

exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.findAll({
      attributes: ["id", "subcategory_name", "slug"],
    });

    return res.status(200).json({
      status: 1,
      message: "Success",
      data: subcategories,
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return res.status(500).json({
      status: 0,
      message: "Error occurred",
      error: error.message,
    });
  }
};
