const { Op } = require('sequelize');
const axios = require('axios');
const sequelize = require('../config/connection');
const { Ratting, User, Product, Order, Employee } = require('../models'); 
const apiUrl = process.env.apiUrl;
const GOOGLE_API_KEY = process.env.GMAP_KEY;
const PLACE_ID = process.env.PLACE_ID;

exports.getGoogleReviews = async(req, res) => {
  try {
    const response = await axios.get("https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJgxuWZf0_rjsRbJaur3y9Lxo&fields=reviews&key=AIzaSyBmaR3DSseRPUCCvGT0Ru8aK-Jrm39NlTE");
    return res.status(200).json({ status: 1, message: 'Success', data: response });
  } catch (error) {
    return res.status(500).json({ status: 0, message: 'Something went wrong', error });
  }
}

exports.addRatting = async(req, res) => {
    const { product_id, order_id, user_id, ratting, comment } = req.body;

    if (!product_id) {
      return res.status(400).json({ status: 0, message: 'Invalid product ID' });
    }

    if (!order_id) {
      return res.status(400).json({ status: 0, message: 'Invalid Order ID' });
    }

    if (!user_id) {
      return res.status(400).json({ status: 0, message: 'Please login to add Wishlist' });
    }

    if (!ratting) {
      return res.status(400).json({ status: 0, message: 'Please select the rattings' });
    }

    if (!comment) {
      return res.status(400).json({ status: 0, message: 'Please write comment' });
    }

    try {
      const product = await Product.findOne({
        where: { id: product_id },
        attributes: ['id', 'vendor_id']
      });

      if (!product) {
        return res.status(400).json({ status: 0, message: 'Product not found' });
      }

      const vendor_id = product.vendor_id;

      if (!vendor_id) {
        return res.status(400).json({ status: 0, message: 'Invalid Seller ID' });
      }

      const order = await Order.findOne({
        where: { id: order_id },
        attributes: ['id', 'assigned_to']
      });

      if (!order) {
        return res.status(400).json({ status: 0, message: 'Order not found' });
      }

      const employee = await Employee.findOne({
        where: { id: order.assigned_to},
        attributes: ['id', 'emp_name']
      });

      if (!employee) {
        return res.status(400).json({ status: 0, message: 'Employee not found' });
      }

      const checkRatting = await Ratting.findAll({
        where: {
          product_id,
          vendor_id,
          user_id
        }
      });

      if (checkRatting.length > 0) {
        return res.status(200).json({ status: 0, message: 'You have already written the review.' });
      } else {

        const data = await Ratting.create({
          vendor_id,
          product_id,
          order_id,
          emp_id: employee.id,
          emp_name: emp_name,
          user_id,
          ratting,
          comment
        });

        if (data) {
          return res.status(200).json({ status: 1, message: 'Success' });
        } else {
          return res.status(500).json({ status: 0, message: 'Something went wrong' });
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 0, message: 'Something went wrong', error });
    }
}

exports.productReview = async(req, res)=> {
    const { product_id } = req.body;

    if (!product_id) {
      return res.status(400).json({ status: 0, message: 'Invalid product ID' });
    }

    try {
      const avgRatting = await Ratting.findAll({ where: { product_id } });
      const fiveRatting = await Ratting.findAll({ where: { product_id, ratting: 5 } });
      const fourRatting = await Ratting.findAll({ where: { product_id, ratting: 4 } });
      const threeRatting = await Ratting.findAll({ where: { product_id, ratting: 3 } });
      const twoRatting = await Ratting.findAll({ where: { product_id, ratting: 2 } });
      const oneRatting = await Ratting.findAll({ where: { product_id, ratting: 1 } });

      const allReview = await Ratting.findAll({
        where: { product_id },
        include: [
          {
            model: User,
            attributes: ['id', 'name'],
            as: "users"
          }
        ],
        attributes: [
          'user_id',
          'ratting',
          'emp_name',
          'comment',
          [sequelize.fn('DATE_FORMAT', sequelize.col('Ratting.created_at'), '%d-%m-%Y'), 'date']
        ],
        limit: 10
      });

      const rattings = {
        avg_ratting: avgRatting.reduce((acc, r) => acc + r.ratting, 0) / avgRatting.length,
        total: avgRatting.length,
        five_ratting: fiveRatting.length,
        four_ratting: fourRatting.length,
        three_ratting: threeRatting.length,
        two_ratting: twoRatting.length,
        one_ratting: oneRatting.length
      };

      return res.status(200).json({ status: 1, message: 'Success', reviews: rattings, all_review: allReview });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 0, message: 'Something went wrong', error });
    }
}
