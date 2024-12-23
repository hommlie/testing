const sequelize = require('../config/connection');
const { Product, User, Banner, Brand, Category, Subcategory, Innersubcategory, Attribute, ProductImage, Variation, Ratting, Wishlist } = require('../models');

const apiUrl = process.env.apiUrl;

exports.getCategory = async (req, res) => {

  try {
    const categoryData = await Category.findAll({
      attributes: [
        'id', 
        'category_name', 
        [sequelize.literal(`CONCAT('${apiUrl}/storage/app/public/images/category/', web_icon)`), 'image_url'],
        'video',
        'thumbnail',
        'is_form',
        'slug',
        'alt_tag',
        'image_title' 
      ],
      where: { status: 1 },
      limit: 6
    });

    if (categoryData.length > 0) {
      return res.status(200).json({ status: 1, message: 'Success', data: categoryData });
    } else {
      return res.status(200).json({ status: 0, message: 'No data found' });
    }
  } catch (error) {
    return res.status(500).json({ status: 0, message: 'Error occurred', error: error });
  }
  
};

exports.getSubcategory = async (req, res) => {
  try {
    
    const { cat_id } = req.body;
    const user_id = 1;

    const subcategoryData = await Subcategory.findAll({
      attributes: [
        'id',
        'subcategory_name',
        [sequelize.literal(`CONCAT('${apiUrl}/storage/app/public/images/subcategory/', icon)`), 'image_url'],
        'video',
        'thumbnail',
        'slug',
        'alt_tag',
        'image_title' 
      ],
      where: { cat_id, status: 1 }
    });

    const subcategory = await Promise.all(subcategoryData.map(async (sub) => {
      
      // const innersubcategoryData = await Innersubcategory.findAll({
      //   attributes: ['id', 'innersubcategory_name'],
      //   where: { subcat_id: sub.id, status: 1 }
      // });

      const productsData = await Product.findAll({
        attributes: [
          'id',
          'product_name',
          'product_price',
          'discounted_price',
          'is_variation',
          'sku',
          'slug',
          'slug',
        ],
        include: [
          {
            model: ProductImage,
            attributes: ['id', 'product_id', [sequelize.fn('CONCAT', sequelize.literal(`'${apiUrl}/storage/app/public/images/products/'`), sequelize.col('image')), 'image_url'], 'alt_tag', 'image_title' ],
            where: { media: 'Image' },
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
        where: {
          subcat_id: sub.id,
          status: 1,
        },
        order: [['id', 'DESC']],
      });

      return {
        subcat_id: sub.id,
        subcategory_name: sub.subcategory_name,
        subcategory_icon: sub.getDataValue('image_url'),
        // innersubcategory: innersubcategoryData.map(inner => ({
        //   id: inner.id,
        //   innersubcategory_name: inner.innersubcategory_name
        // })),
        // productsData: productsData
      };

    }));

    if (subcategory.length > 0) {
      return res.status(200).json({ status: 1, message: 'Success', data: { subcategory } });
    } else {
      return res.status(200).json({ status: 0, message: 'No subscategory data found' });
    }
  } catch (error) {
    return res.status(500).json({ status: 0, message: 'Error occurred', error: error.message });
  }
};

exports.getCleaningSubcategory = async (req, res) => {
  try {
    const { subcat_id } = req.body;

    if (!subcat_id) {
      return res.status(400).json({
        status: 0,
        message: 'subcat_id is required',
      });
    }

    // Fetch subcategory data
    const subcategoryData = await Subcategory.findOne({
      attributes: [
        'id',
        'subcategory_name',
        [sequelize.literal(`CONCAT('${apiUrl}/storage/app/public/images/subcategory/', icon)`), 'image_url'],
        'video',
        'thumbnail',
        'slug',
        'alt_tag',
        'image_title'
      ],
      where: { 
        id: subcat_id, 
        status: 1 
      }
    });

    if (!subcategoryData) {
      return res.status(404).json({
        status: 0,
        message: 'Subcategory not found or inactive',
      });
    }

    // Fetch products for the specific subcategory with detailed information
    const products = await Product.findAll({
      where: { 
        subcat_id: subcat_id, 
        status: 1 
      },
      attributes: [
        'id', 
        'product_name', 
        'product_price', 
        'cat_id',
        'discounted_price', 
        'description',
        'tags',
        'product_qty',
        'is_variation',
        'vendor_id',
        'sku',
        'free_shipping',
        'shipping_cost',
        'tax_type',
        'tax',
        'est_shipping_days',
        'is_return',
        'return_days',
        'faqs',
        'slug'
      ],
      include: [
        {
          model: ProductImage,
          attributes: [
            'id',
            'product_id',
            'media',
            'thumbnail',
            'alt_tag',
            'image_title',
            [
              sequelize.literal(`
                CASE 
                  WHEN media = 'Image' THEN CONCAT('${apiUrl}/storage/app/public/images/products/', image)
                  WHEN media = 'Video' THEN image
                  ELSE NULL
                END
              `),
              'image_url'
            ]
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
            'qty',
            'created_at',
            'updated_at'
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
        { model: Category, attributes: ['category_name', 'is_form'], as: 'category' },
        { model: Subcategory, attributes: ['subcategory_name'], as: 'subcategory' }
      ],
      order: [['id', 'DESC']]
    });

    // Transform the products data
    const transformedProducts = await Promise.all(products.map(async (product) => {
      const plainProduct = product.get({ plain: true });

      // Group variations by attribute_id
      const groupedVariations = plainProduct.variations.reduce((acc, variation) => {
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
          qty: variation.qty,
          created_at: variation.created_at,
          updated_at: variation.updated_at
        };

        // Check if attribute group exists
        const existingGroup = acc.find(group => group.attribute_id === variation.attribute_id);

        if (existingGroup) {
          // Add variation to existing group
          existingGroup.variations.push(variationData);
        } else {
          // Create new attribute group
          acc.push({
            attribute_id: variation.attribute_id,
            attribute_name: variation.attribute.attribute,
            variations: [variationData]
          });
        }

        return acc;
      }, []);

      // Get return policy
      const returnPolicy = await User.findOne({
        where: { id: product.vendor_id },
        attributes: ['return_policies']
      });

      // Remove the original variations array
      delete plainProduct.variations;

      return {
        ...plainProduct,
        attributes: groupedVariations,
        return_policy: returnPolicy?.return_policies,
        is_form: plainProduct.category.is_form
      };
    }));

    // Structure the response
    const response = {
      subcategory_id: subcategoryData.id,
      subcategory_name: subcategoryData.subcategory_name,
      subcategory_banner: subcategoryData.get('image_url'),
      video: subcategoryData.video,
      thumbnail: subcategoryData.thumbnail,
      slug: subcategoryData.slug,
      alt_tag: subcategoryData.alt_tag,
      image_title: subcategoryData.image_title,
      products: transformedProducts
    };

    return res.status(200).json({
      status: 1,
      message: 'Success',
      data: response
    });

  } catch (error) {
    console.error("Error fetching subcategory data:", error);
    return res.status(500).json({
      status: 0,
      message: 'Error occurred',
      error: error.message
    });
  }
};

