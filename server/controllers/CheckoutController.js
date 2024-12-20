const { Op } = require('sequelize');
const { Cart, Order, Coupons } = require('../models');
const { Sequelize } = require('sequelize');
const apiUrl = process.env.apiUrl;

exports.checkout = async(req, res) => {
    const { 
      user_id, 
      // coupon_name 
    } = req.body;

    try {
      if (!user_id) {
        return res.status(400).json({ status: 0, message: 'User id is required' });
      }

      // Check if there are existing orders with the coupon for the user
      const orderCount = await Order.count({
        where: { 
          user_id, 
          // coupon_name 
        }
      });

      // Fetch coupon details
      // const coupon = await Coupons.findOne({
      //   attributes: ['quantity', 'times', 'end_date', 'coupon_name', 'type', 'percentage', 'amount'],
      //   where: {
      //     status: 1,
      //     coupon_name
      //   }
      // });

      // Fetch cart items for the user
      const cartItems = await Cart.findAll({
        attributes: [
          'id',
          'product_id',
          'vendor_id',
          'product_name',
          'qty',
          'price',
          'attribute',
          'variation',
          'tax',
          'shipping_cost',
          [Sequelize.literal(`CONCAT('${apiUrl}/storage/app/public/images/products/', image)`), 'image_url']
        ],
        where: { user_id },
        order: [['id', 'DESC']]
      });

      let cdata = [];
      let discount_amount = 0;

      for (const value of cartItems) {
        // if (coupon_name) {
        //   const now = new Date().toISOString().slice(0, 10);

        //   if (coupon.end_date >= now) {
        //     if (coupon.quantity === 1) {
        //       if (orderCount > coupon.times) {
        //         return res.status(200).json({ status: 0, message: 'Coupon Usage Limit Has Been Reached' });
        //       } else {
        //         if (coupon.type === '1') {
        //           if (value.price * value.qty > coupon.amount) {
        //             discount_amount = value.price * value.qty - coupon.amount;
        //           } else {
        //             return res
        //               .status(200)
        //               .json({ status: 0, message: `Each item amount should be more than ${Helper.CurrencyFormatter(coupon.amount)}` });
        //           }
        //         }

        //         if (coupon.type === '0') {
        //           discount_amount = (value.price * value.qty * coupon.percentage) / 100;
        //         }
        //       }
        //     } else {
        //       if (coupon.type === '1') {
        //         if (value.price * value.qty > coupon.amount) {
        //           discount_amount = value.price * value.qty - coupon.amount;
        //         } else {
        //           return res
        //             .status(200)
        //             .json({ status: 0, message: `Amount should be more than ${Helper.CurrencyFormatter(coupon.amount)}` });
        //         }
        //       }

        //       if (coupon.type === '0') {
        //         discount_amount = (value.price * value.qty * coupon.percentage) / 100;
        //       }
        //     }
        //   } else {
        //     return res.status(200).json({ status: 0, message: 'This coupon code is invalid or has expired.' });
        //   }
        // }

        cdata.push({
          id: value.id,
          product_id: value.product_id,
          product_name: value.product_name,
          vendor_id: value.vendor_id,
          qty: value.qty,
          price: value.price,
          attribute: value.attribute,
          variation: value.variation,
          tax: value.tax * value.qty,
          shipping_cost: value.shipping_cost,
          image_url: value.image_url,
          discount_amount: discount_amount || 0
        });
      }

      // Calculate totals from cart data
      const cartSummary = await Cart.findOne({
        attributes: [
          'id',
          [Sequelize.literal('SUM(price*qty)'), 'subtotal'],
          [Sequelize.literal('SUM(tax*qty)'), 'tax'],
          [Sequelize.literal('SUM(shipping_cost)'), 'shipping_cost'],
          'vendor_id'
        ],
        where: { user_id }
      });

      if (cartSummary) {

        return res.status(200).json({
          status: 1,
          message: 'Success',
          data: cartSummary,
          cartdata: cdata,
          // coupon_name: coupon ? coupon.coupon_name : ''
        });

      } else {
        return res.status(200).json({ status: 0, message: 'Something went wrong' });
      }
    } catch (error) {
      return res.status(500).json({ status: 0, message: 'Something went wrong', error: error.message });
    }
}