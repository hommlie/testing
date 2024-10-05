const sequelize = require('../config/connection');
const { Sequelize, Op, fn, col, literal, where } = require('sequelize');
const { Product, User, Banner, Brand, Category, Subcategory, Innersubcategory, Attribute, ProductImage, Variation, Ratting, Testimonials } = require('../models');
const apiUrl = process.env.apiUrl;

exports.viewAllListing = async(req, res) => {
    const { user_id, type } = req.body;

    try {
      let products;

      const commonProductAttributes = [
          'id',
          'product_name',
          'product_price',
          'discounted_price',
          'is_variation',
          'sku',
      ];

      const commonIncludes = [
          {
              model: ProductImage,
              attributes: [
                  'id',
                  'product_id', 
                  [sequelize.fn('CONCAT', sequelize.literal(`'${apiUrl}/storage/app/public/images/products/'`), sequelize.col('image')), 'image_url']
              ],
              where: {
                  media: 'Image'
              },
              as: 'productimage'
          },
          {
              model: Variation,
              attributes: ['id','product_id','price', 'discounted_variation_price', 'variation', 'qty'],
              as: 'variation',
              required: false
          },
          {
              model: Ratting,
              as: 'rattings',
              required: false
          },
      ];

      switch (type) {
        case "featured_products":
          products = await Product.findAll({
              attributes: commonProductAttributes,
              include: commonIncludes,
              where: {
                  is_featured: 1,
                  status: 1
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
                  status: 1
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
                  status: 1
              },
              order: [['id', 'DESC']],
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
                      'order_count'
                  ]
              ],
              include: commonIncludes,
              where: {
                  status: 1
              },
              order: [[sequelize.literal('order_count'), 'DESC']],
              group: ['Product.id'],
              limit: 10,
          });
          break;

        case "cleaning_services":
          products = await Product.findAll({
              attributes: commonProductAttributes,
              include: commonIncludes,
              where: {
                  cat_id: 19
              },
              order: [['id', 'DESC']],
              limit: 10,
          });
          break;

        case "pest_control":
          products = await Product.findAll({
              attributes: commonProductAttributes,
              include: commonIncludes,
              where: {
                  cat_id: 18
              },
              order: [['id', 'DESC']],
              limit: 10,
          });
          break;

        case "safety_pro_netting":
          products = await Product.findAll({
              attributes: commonProductAttributes,
              include: commonIncludes,
              where: {
                  cat_id: 30
              },
              order: [['id', 'DESC']],
              limit: 10,
          });
          break;

        case "mosquito_mesh":
          products = await Product.findAll({
              attributes: commonProductAttributes,
              include: commonIncludes,
              where: {
                  cat_id: 29
              },
              order: [['id', 'DESC']],
              limit: 10,
          });
          break;

        case "shop_now":
            products = await Product.findAll({
                attributes: commonProductAttributes,
                include: commonIncludes,
                where: {
                    cat_id: 38
                },
                order: [['id', 'DESC']],
                limit: 10,
            });
            break;

        case "videos":
          products = await ProductImage.findAll({
              attributes: [
                    'id',
                    'media', 
                    'thumbnail',
                    [sequelize.fn('CONCAT', sequelize.literal(`'${apiUrl}/storage/app/public/images/products/'`), sequelize.col('image')), 'video_url']
              ],
              where: {
                  media: 'Video'
              }
          });
          break;

        case "testimonials":
          products = await Testimonials.findAll({
              attributes: [
                  'id',
                  'name',
                  'location',
                  'feedback',
                  [sequelize.fn('CONCAT', sequelize.literal(`'${apiUrl}/storage/app/public/images/testimonials/'`), sequelize.col('image')), 'image']
              ],
              where: {
                  status: 1
              }
          });
          break;

        case "brands":
          products = await Brand.findAll({
              attributes: [
                  'id',
                  'brand_name',
                  [literal(`CONCAT('${process.env.BASE_URL}/storage/app/public/images/brand/', icon)`), 'image_url']
              ],
              where: {
                  status: 1
              },
              order: [
                  [Sequelize.fn('RAND')]
              ],
              limit: 10
          });
          break;

        default:
          return res.status(400).json({ status: 0, message: 'Invalid type' });
      }

      return res.status(200).json({ status: 1, message: 'Success', data: products });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ status: 0, message: 'Something went wrong', error });
    }
}

exports.productDetails = async (req, res) => {
  const { product_id } = req.body;
  const user_id = 1;

  if (!product_id) {
    return res.status(400).json({ status: 0, message: "Invalid product ID" });
  }

  try {
    const product = await Product.findOne({
      where: { id: product_id, status: 1 },
      attributes: [
        'id', 'product_name', 'product_price', 'cat_id', 'discounted_price', 'description', 'product_qty', 'is_variation', 'sku',
        'free_shipping', 'shipping_cost', 'tax_type', 'tax', 'est_shipping_days', 'is_return', 'return_days',
      ],
      include: [
        {
          model: ProductImage,
          attributes: [
            'id',
            'product_id',
            'media', 
            [sequelize.fn('CONCAT', sequelize.literal(`'${apiUrl}/storage/app/public/images/products/'`), sequelize.col('image')), 'image_url']
          ],
          as: 'productimages'
        },
        {
          model: Variation,
          attributes: [
            'id',
            'product_id', 
            'attribute_id', 
            'price', 
            'description', 
            'discounted_variation_price', 
            'variation', 
            'variation_interval', 
            'variation_times',
            'qty'
          ],
          include: [
            {
              model: Attribute,
              attributes: ['id', 'attribute'],
              where: { status: 1 },
              as: 'attribute',
            },
          ],
          as: 'variations',
          required: false
        },
        {
          model: Ratting,
          as: 'rattings',
          required: false
        },
        { model: Category, attributes: ['category_name'], as: 'category' },
        { model: Subcategory, attributes: ['subcategory_name'], as: 'subcategory' },
        { model: Innersubcategory, attributes: ['innersubcategory_name'], as: 'innersubcategory' },
      ],
    });

    if (!product) {
      return res.status(200).json({ status: 0, message: 'No data found' });
    }

    // Convert the Sequelize model instance to a plain JavaScript object
    const plainProduct = product.get({ plain: true });

    // Restructure variations
    // const restructuredVariations = [];
    // product.variations.forEach(variation => {
    //   const variationData = variation.toJSON();
    //   const attributeName = variationData.attribute.attribute;
    //   delete variationData.attribute;

    //   if (!restructuredVariations[attributeName]) {
    //     restructuredVariations[attributeName] = [];
    //   }
    //   restructuredVariations[attributeName].push(variationData);
    // });

    const restructuredVariations = plainProduct.variations.map(variation => {
      const { attribute, ...variationData } = variation;
      return {
        attribute_name: attribute.attribute,
        data: variationData
      };
    });

    // Replace the original variations with the restructured ones
    plainProduct.variations = restructuredVariations;

    // // Replace the original variations with the restructured ones
    // product.variations = restructuredVariations;

    const related_products = await Product.findAll({
      where: { cat_id: product.cat_id, status: 1, id: { [Op.ne]: product_id } },
      attributes: [
        'id', 'product_name', 'product_price', 'discounted_price', 'is_variation', 'sku',
      ],
      include: [
        {
          model: ProductImage,
          attributes: ['id', 'product_id', [sequelize.fn('CONCAT', sequelize.literal(`'${apiUrl}/storage/app/public/images/products/'`), sequelize.col('image')), 'image_url']],
          where: { media: 'Image' },
          as: 'productimage'
        },
        {
          model: Variation,
          attributes: ['id', 'product_id', 'attribute_id', 'price', 'description', 'discounted_variation_price', 'variation', 'qty'],
          as: 'variations',
          required: false
        },
        {
          model: Ratting,
          as: 'rattings',
          required: false
        },
      ],
      order: [['id', 'DESC']],
      limit: 10
    });

    const returnpolicy = await User.findOne({
      where: { id: product.vendor_id },
      attributes: ['return_policies']
    });

    return res.status(200).json({ status: 1, message: 'Success', data: plainProduct, related_products, returnpolicy });
  } catch (error) {
    console.error("Error fetching product details:", error);
    return res.status(500).json({ status: 0, message: 'Failed to fetch product details', error });
  }
};

exports.products = async (req, res) => {
  const { subcategory_id } = req.body;
  const user_id = 1;

  if (!subcategory_id) {
      return res.status(400).json({ status: 0, message: "Please select one category" });
  }

  try {
      const products = await Product.findAll({
          attributes: [
              'id',
              'product_name',
              'product_price',
              'discounted_price',
              'is_variation',
              'sku'
          ],
          include: [
              {
                  model: ProductImage,
                  attributes: ['id','product_id', [sequelize.fn('CONCAT', sequelize.literal(`'${apiUrl}/storage/app/public/images/products/'`), sequelize.col('image')), 'image_url']],
                  where: {media: 'Image'},
                  as: 'productimage'
              },
              {
                  model: Variation,
                  as: 'variations'
              },
              {
                  model: Ratting,
                  as: 'rattings'
              },
          ],
          where: {
              subcat_id: subcategory_id,
              status: 1,
          },
          order: [['id', 'DESC']],
          limit: 10,
      });

      if (products.length > 0) {
          return res.status(200).json({ status: 1, message: 'Success', data: products });
      } else {
          return res.status(200).json({ status: 0, message: 'No data found' });
      }
  } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ status: 0, message: 'Failed to fetch products', error });
  }
}

exports.searchProducts = async(req, res) => {

    try {
      const products = await Product.findAll({
        where: {
          status: true
        },
        attributes: [
          'id',
          'product_name',
          'product_price',
          'discounted_price',
          'is_variation',
          'sku'
        ],
        include: [
          {
            model: ProductImage,
            attributes: ['id','product_id', [sequelize.fn('CONCAT', sequelize.literal(`'${apiUrl}/storage/app/public/images/products/'`), sequelize.col('image')), 'image_url']],
            where: {media: 'Image'},
            as: 'productimage'
          },
          {
              model: Variation,
              as: 'variations'
          },
          {
              model: Ratting,
              as: 'rattings'
          }
        ],
        order: [['id', 'DESC']]
      });

      if (!products.length) {
        return res.status(404).json({ status: 0, message: 'No products found' });
      }

      return res.status(200).json({ status: 1, message: 'Success', data: products });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ status: 0, message: 'Something went wrong', error });
    }
}

exports.filter = async(req, res) => {
    const { user_id, type } = req.query;

    try {
      let products;

      switch (type) {
        case "price-high-to-low":
          products = await Product.findAll({
            where: {
              status: true
            },
            include: [
              {
                model: ProductImage,
                attributes: ['id','product_id', [sequelize.fn('CONCAT', sequelize.literal(`'${apiUrl}/storage/app/public/images/products/'`), sequelize.col('image')), 'image_url']],
                where: {media: 'Image'},
                as: 'productimage'
              },
              {
                  model: Variation,
                  as: 'variations'
              },
              {
                  model: Ratting,
                  as: 'rattings'
              }
            ],
            order: [['product_price', 'DESC']],
            limit: 12
          });
          break;

        case "price-low-to-high":
          products = await Product.findAll({
            where: {
              status: true
            },
            include: [
              {
                model: ProductImage,
                attributes: ['id','product_id', [sequelize.fn('CONCAT', sequelize.literal(`'${apiUrl}/storage/app/public/images/products/'`), sequelize.col('image')), 'image_url']],
                where: {media: 'Image'},
                as: 'productimage'
              },
              {
                  model: Variation,
                  as: 'variations'
              },
              {
                  model: Ratting,
                  as: 'rattings'
              }
            ],
            order: [['product_price', 'ASC']],
            limit: 12
          });
          break;

        default:
          return res.status(400).json({ status: 0, message: 'Invalid type' });
      }

      return res.status(200).json({ status: 1, message: 'Success', data: products });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ status: 0, message: 'Something went wrong', error });
    }
}

