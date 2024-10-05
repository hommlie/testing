const { sequelize, Op, fn, col, literal } = require('sequelize');
const Wishlist = require('../models/Wishlist');
const Products = require('../models/Products');
const Users = require('../models/User');
const apiUrl = process.env.apiUrl;

exports.addToWishlist = async (req, res) => {
  const { product_id, user_id } = req.body;

  if (!product_id) {
    return res.status(400).json({ status: 0, message: 'Invalid product ID' });
  }

  if (!user_id) {
    return res.status(400).json({ status: 0, message: 'Please login to add Wishlist' });
  }

  try {
    const check = await Wishlist.findOne({ where: { product_id, user_id } });

    if (check) {
      return res.status(200).json({ status: 1, message: 'Already available in wishlist' });
    } else {
      const data = await Wishlist.create({ product_id, user_id });

      if (data) {
        return res.status(200).json({ status: 1, message: 'Success' });
      } else {
        return res.status(200).json({ status: 0, message: 'Something went wrong' });
      }
    }
  } catch (error) {
    return res.status(500).json({ status: 0, message: 'Something went wrong', error: error.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  const { product_id, user_id } = req.body;

  if (!product_id) {
    return res.status(400).json({ status: 0, message: 'Invalid product ID' });
  }

  if (!user_id) {
    return res.status(400).json({ status: 0, message: 'Please login to add wishlist' });
  }

  try {
    const data = await Wishlist.destroy({ where: { product_id, user_id } });

    if (data) {
      return res.status(200).json({ status: 1, message: 'Success' });
    } else {
      return res.status(200).json({ status: 0, message: 'Something went wrong' });
    }
  } catch (error) {
    return res.status(500).json({ status: 0, message: 'Something went wrong', error: error.message });
  }
};

exports.getWishlist = async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ status: 0, message: 'Please login to check Wishlist' });
  }

  try {
    const wishlistData = await Products.findAll({
      attributes: [
        'id', 'product_name', 'product_price', 'discounted_price', 'is_variation', 'sku',
        [literal('(CASE WHEN wishlist.product_id IS NULL THEN 0 ELSE 1 END)'), 'is_wishlist']
      ],
      include: [
        {
          model: Wishlist,
          as: 'wishlist',
          attributes: [],
          where: { user_id },
          required: false,
        },
        {
          model: Users,
          as: 'vendor',
          attributes: [],
          where: { is_available: 1 },
          required: true,
        }
      ],
      where: {
        status: 1
      },
      order: [['id', 'DESC']],
      subQuery: false,
    });

    if (wishlistData) {
      return res.status(200).json({ status: 1, message: 'Success', data: wishlistData });
    } else {
      return res.status(200).json({ status: 0, message: 'Something went wrong' });
    }
  } catch (error) {
    return res.status(500).json({ status: 0, message: 'Something went wrong', error: error.message });
  }
};
