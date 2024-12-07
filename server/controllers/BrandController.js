const { Op } = require('sequelize');
const sequelize = require('../config/connection');
const { Brand, Product, Wishlist, User, ProductImage, Variation, Ratting } = require('../models');
const apiUrl = process.env.apiUrl;

exports.brands = async(req, res) => {
    try {
      const brands = await Brand.findAll({
        attributes: [
          'id',
          'brand_name',
          [sequelize.fn('CONCAT', sequelize.literal(`'${apiUrl}/storage/app/public/images/brand/'`), sequelize.col('icon')), 'image_url']
        ],
        where: { status: 1 },
        order: [['id', 'DESC']],
        limit: 10
      });

      if (brands.length > 0) {
        return res.status(200).json({ status: 1, message: 'Success', vendors: brands });
      } else {
        return res.status(200).json({ status: 0, message: 'No data available' });
      }
    } catch (error) {
      return res.status(500).json({ status: 0, message: 'Something went wrong', error: error.message });
    }
}

exports.brandsProducts = async(req, res) => {
    const apiUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
    const { brand_id, user_id } = req.body;

    if (!brand_id) {
      return res.status(400).json({ status: 0, message: 'Please select the brand' });
    }

    try {
      const products = await Product.findAll({
        attributes: [
          'id',
          'product_name',
          'product_price',
          'discounted_price',
          'is_variation',
          'sku',
          'slug',
        //   [sequelize.literal('(CASE WHEN wishlists.product_id IS NULL THEN 0 ELSE 1 END)'), 'is_wishlist']
        ],
        include: [
            { model: ProductImage, as: 'productimage', where: {media: 'Image'}, attributes: ['id', 'product_id', [sequelize.literal(`CONCAT('${apiUrl}/storage/app/public/images/products/', image)`), 'image_url']] },
            { model: Variation, as: 'variation', attributes: ['id', 'product_id', 'price', 'discounted_variation_price', 'variation', 'qty'] },
            { model: Ratting, as: 'rattings' },
            { model: Wishlist, attributes: [], where: { user_id }, required: false, as: 'wishlist' },
            { model: User, as: 'vendor', attributes: [], where: { is_available: 1 } }
        ],
        where: {
          status: 1,
          brand: brand_id
        },
        order: [['id', 'DESC']],
        limit: 10
      });

      if (products.length > 0) {
        return res.status(200).json({ status: 1, message: 'Success', data: products });
      } else {
        return res.status(200).json({ status: 0, message: 'No data available' });
      }
    } catch (error) {
      return res.status(500).json({ status: 0, message: 'Something went wrong', error: error.message });
    }
}
