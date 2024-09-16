const sequelize = require('../config/connection');
const { Product, User, Banner, Brand, Category, Subcategory, Innersubcategory, Attribute, ProductImage, Variation, Ratting, Wishlist } = require('../models');

const apiUrl = process.env.apiUrl;

exports.getCategory = async (req, res) => {

  try {
    const categoryData = await Category.findAll({
      attributes: ['id', 'category_name', [sequelize.literal(`CONCAT('${apiUrl}/storage/app/public/images/category/', web_icon)`), 'image_url']],
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
        [sequelize.literal(`CONCAT('${apiUrl}/storage/app/public/images/subcategory/', icon)`), 'image_url']
      ],
      where: { cat_id, status: 1 }
    });

    const subcategory = await Promise.all(subcategoryData.map(async (sub) => {
      
      const innersubcategoryData = await Innersubcategory.findAll({
        attributes: ['id', 'innersubcategory_name'],
        where: { subcat_id: sub.id, status: 1 }
      });

      const productsData = await Product.findAll({
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
            attributes: ['id', 'product_id', [sequelize.fn('CONCAT', sequelize.literal(`'${apiUrl}/storage/app/public/images/products/'`), sequelize.col('image')), 'image_url']],
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
        productsData: productsData
      };

    }));

    if (subcategory.length > 0) {
      return res.status(200).json({ status: 1, message: 'Success', data: { subcategory } });
    } else {
      return res.status(200).json({ status: 0, message: 'No data found' });
    }
  } catch (error) {
    return res.status(500).json({ status: 0, message: 'Error occurred', error: error.message });
  }
};

