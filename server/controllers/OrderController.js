const { Op } = require('sequelize');
const sequelize = require('../config/connection');
const Razorpay = require("razorpay");
const { Order, Cart, Ratting, Payment, User, Notification, Transaction, Settings, Variation, Coupons, Attribute } = require('../models'); 
// const stripe = require('stripe')('your_stripe_secret_key');
const moment = require('moment');
const crypto = require("crypto");
const apiUrl = process.env.apiUrl;
const { sendEmail } = require('../middleware/mailMiddleware');

exports.initiatePayment = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    let amount = req.body.amount;

    if (req.body.coupon_id) {
      const coupon = await Coupons.findOne({
        where: { id: req.body.coupon_id }
      });

      if (coupon) {
        let discountAmount = 0;
        if (coupon.percentage) {
          discountAmount = (amount * coupon.percentage) / 100;
        } else if (coupon.amount) {
          discountAmount = coupon.amount;
        }

        // Ensure discount doesn't exceed the total amount
        discountAmount = Math.min(discountAmount, amount);

        amount -= discountAmount;
      }
    }
    
    amount = Math.round(amount * 100);

    const options = {
      amount: amount,
      currency: req.body.currency,
      receipt: 'receipt_' + Math.random().toString(36).substring(7),
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).json({ status: 0, message: "Failed to create razorpay order" });

    return res.status(200).json({ status: 1, message: "razorpay order successful", data: order });
  } catch (error) {
    console.error("Error in initiatePayment:", error);
    return res.status(500).json({ status: 0, message: "Failed to create razorpay order", error: error.message });
  }
}

exports.verifyPayment = async (req, res) => {
  try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
          .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
          .update(sign)
          .digest("hex");

      if (razorpay_signature === expectedSign) {
          return res.status(200).json({ status: 1, message: "Payment verified successfully" });
      } else {
          return res.status(400).json({ status: 0, message: "Invalid signature sent!" });
      }
  } catch (error) {
      console.error("Error verifying payment:", error);
      return res.status(500).json({ status: 0, message: "Internal server error", error: error.message });
  }
};

exports.order = async (req, res) => {
  const { 
    user_id, 
    payment_type,
    payment_id,
    grand_total,
    discount_amount, 
    coupon_name, 
    order_notes, 
    full_name, 
    email, 
    mobile, 
    landmark, 
    street_address, 
    pincode,
    latitude,
    longitude,
    desired_time,
    desired_date
  } = req.body;

  if (!user_id) {
    return res.status(400).json({ status: 0, message: "Please login to save address" });
  }

  try {
    let formattedTime = desired_time;
    if (desired_time) {
      formattedTime = moment(desired_time, 'hh:mm A').format('HH:mm');
    }

    const lastOrder = await Order.findOne({
      order: [['id', 'DESC']]
    });

    const lastOrderNumber = lastOrder ? parseInt(lastOrder.order_number) : 10000;
    const order_number = (lastOrderNumber + 1).toString();

    const cartItems = await Cart.findAll({ where: { user_id }, order: [['id', 'DESC']] });

    if (cartItems.length === 0) {
      return res.status(200).json({ status: 0, message: "Your cart is empty" });
    }

    const { wallet } = await User.findByPk(user_id);

    const orders = [];

    for (const cartItem of cartItems) {
      const { vendor_id, product_id, product_name, image, qty, price, attribute, variation, tax, shipping_cost } = cartItem;

      const discountAmount = discount_amount/cartItems.length;

      const variationDetails = await Variation.findOne({
        where: { id: variation, product_id }
      });

      const attributeDetails = await Attribute.findOne({
        where: { id: attribute }
      });

      if (variationDetails && attributeDetails.attribute.includes('AMC')) {          
        
        const { variation_interval, variation_times } = variationDetails;
        const pricePerOrder = price / variation_times;

        for (let i = 0; i < variation_times; i++) {
          const orderDate = moment(desired_date).add(i * variation_interval, 'days').format('YYYY-MM-DD');
        
          const order = await Order.create({
            user_id,
            vendor_id,
            product_id,
            order_number,
            payment_id,
            product_name,
            image,
            qty,
            price: pricePerOrder,
            attribute,
            variation,
            tax: (tax * qty) / variation_times,
            coupon_name,
            shipping_cost: shipping_cost,
            order_total: grand_total,
            order_notes,
            payment_type,
            full_name,
            email,
            mobile,
            landmark,
            street_address,
            pincode,
            latitude,
            longitude,
            discount_amount: discountAmount,
            order_status: 1,
            desired_time: formattedTime,
            desired_date: orderDate,
          });

          orders.push(order);
        }
      } else {
          
        const order = await Order.create({
          user_id,
          vendor_id,
          product_id,
          order_number,
          payment_id,
          product_name,
          image,
          qty,
          price,
          attribute,
          variation,
          tax: tax * qty,
          coupon_name,
          shipping_cost,
          order_total: grand_total,
          order_notes,
          payment_type,
          full_name,
          email,
          mobile,
          landmark,
          street_address,
          pincode,
          latitude,
          longitude,
          discount_amount: discountAmount,
          order_status: 1,
          desired_time: formattedTime,
          desired_date,
        });

        orders.push(order);
      }
    
    }

    const order_id = orders[0].id;

    await Cart.destroy({ where: { user_id } });

    const notification = await Notification.create({
      user_id,
      order_id,
      order_number,
      order_status: "1",
      message: `Order ${order_number} has been placed`,
      is_read: "1",
      type: "order",
    });

    const userData = await User.findByPk(user_id);
    if (userData?.email) {
      try {
        const subject = `Order Confirmation - Order #${order_number}`;
        const html = `
          <h1>Your order has been placed successfully!</h1>
          <p>Order Number: ${order_number}</p>
          <p>Total Amount: ₹${grand_total}</p>
          <p>Thank you for shopping with us!</p>
        `;
        await sendEmail(userData.email, subject, html);
      } catch (emailError) {
        console.error("Error sending order confirmation email:", emailError);
      }
    }

    return res.status(200).json({ status: 1, message: "Order has been placed successfully", order_number });

  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({ status: 0, message: "Failed to place order", error: error });
  }
}

exports.orderhistory = async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ status: 0, message: "Please login to save address" });
  }

  try {
    const orderData = await Order.findAll({
      attributes: [
        'id',
        'product_id',
        'product_name',
        'order_number',
        'qty',
        'price',
        'attribute',
        'variation',
        'discount_amount',
        'shipping_cost',
        'order_total',
        'coupon_name',
        'full_name',
        'email',
        'mobile',
        'payment_type',
        'status',
        'order_status',
        'desired_time',
        'desired_date',
        [sequelize.literal(`CONCAT('${apiUrl}/storage/app/public/images/products/', image)`), 'image'],
        [sequelize.fn('DATE_FORMAT', sequelize.col('Order.created_at'), '%d-%m-%Y'), 'date'],
        [sequelize.literal(`
          CASE 
            WHEN discount_amount IS NULL THEN SUM(price * qty) + SUM(tax) + SUM(shipping_cost)
            ELSE SUM(price * qty) + SUM(tax) + SUM(shipping_cost) - SUM(discount_amount)
          END
        `), 'grand_total']
      ],
      include: [
        {
          model: Payment,
          as: 'payment',
          attributes: ['payment_name']
        }
      ],
      where: { user_id },
      group: [
        'id', 'product_id', 'product_name', 'order_number', 'qty', 'price', 'attribute', 'variation',
        'discount_amount', 'shipping_cost', 'order_total', 'full_name', 'email', 'mobile', 'payment_type',
        'status', 'image'
      ],
      order: [['order_number', 'DESC'], ['id', 'DESC']],
      limit: 10
    });

    const updatedData = await Promise.all(orderData.map(async (order) => {
      const variationDetails = await Variation.findByPk(order.variation);
      const attributeDetails = await Attribute.findByPk(order.attribute);

      // Convert desired_time to 12-hour format
      const desiredTime24 = order.desired_time;
      const desiredTime12 = moment(desiredTime24, 'HH:mm').format('hh:mm A');

      return {
        ...order.toJSON(),
        desired_time: desiredTime12,
        attribute: attributeDetails?.attribute || '',
        variation: variationDetails?.variation || ''
      };
    }));

    if (updatedData.length > 0) {
      return res.status(200).json({ status: 1, message: "Order history list successful", data: updatedData });
    } else {
      return res.status(200).json({ status: 0, message: "No order history found" });
    }
  } catch (error) {
    console.error("Error fetching order history:", error);
    return res.status(500).json({ status: 0, message: "Failed to fetch order history", error });
  }
};

exports.orderdetails = async (req, res) => {
  const { order_number } = req.body;

  if (!order_number) {
      return res.status(400).json({ status: 0, message: "Order number is required" });
  }

  try {
      // Fetch basic order information
      const order_info = await Order.findOne({
          attributes: [
              'order_number',
              'order_notes',
              'payment_type',
              'full_name',
              'email',
              'mobile',
              'landmark',
              'street_address',
              'pincode',
              'coupon_name',
              'discount_amount',
              'status',
              [sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), '%d-%m-%Y'), 'date'],
              'desired_time',
              'desired_date',
          ],
          where: { order_number }
      });

      if (!order_info) {
          return res.status(404).json({ status: 0, message: "Order not found" });
      }

      // Fetch all items related to the order
      const order_data = await Order.findAll({
          attributes: [
              'id',
              'product_id',
              'product_name',
              'qty',
              'price',
              'tax',
              'shipping_cost',
              'discount_amount',
              'status',
              'attribute',
              'variation',
              [sequelize.literal(`CONCAT('${apiUrl}/storage/app/public/images/products/', image)`), 'image_url']
          ],
          where: { order_number }
      });

      // Initialize totals
      let subtotal = 0;
      let taxTotal = 0;
      let shippingTotal = 0;
      let discountTotal = 0;

      // Calculate totals
      for (const item of order_data) {
          const itemSubtotal = item.price * item.qty;
          subtotal += itemSubtotal;
          taxTotal += parseFloat(item.tax);
          shippingTotal += parseFloat(item.shipping_cost);
          discountTotal += parseFloat(item.discount_amount);
      }

      // Calculate grand total
      const grand_total = subtotal + taxTotal + shippingTotal - discountTotal;

      const response = {
          status: 1,
          message: "Order history list Successful",
          order_info: {
              ...order_info.toJSON(),
              subtotal: subtotal.toFixed(2),
              tax: taxTotal.toFixed(2),
              shipping_cost: shippingTotal.toFixed(2),
              discount_amount: discountTotal.toFixed(2),
              grand_total: grand_total.toFixed(2),
          },
          order_data: order_data.map(item => item.toJSON())
      };

      // Additional data processing
      for (const orderItem of response.order_data) {
          const variationDetails = await Variation.findByPk(orderItem.variation);
          const attributeDetails = await Attribute.findByPk(orderItem.attribute);
          orderItem.variation = variationDetails?.variation || '';
          orderItem.attribute = attributeDetails?.attribute || '';
      }

      // Convert desired_time to 12-hour format
      const desiredTime24 = response.order_info.desired_time;
      const desiredTime12 = moment(desiredTime24, 'HH:mm').format('hh:mm A');
      response.order_info.desired_time = desiredTime12;

      return res.status(200).json(response);
  } catch (error) {
      console.error("Error fetching order details:", error);
      return res.status(500).json({ status: 0, message: "Failed to fetch order details", error });
  }
};

exports.trackOrder = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ status: 0, message: "Order ID is required" });
  }

  try {
    const order = await Order.findByPk(id, {
      attributes: [
        'order_number',
        'status',
        'product_name',
        'qty',
        'price',
        'attribute',
        'variation',
        'discount_amount',
        'shipping_cost',
        'order_total',
        'full_name',
        'email',
        'mobile',
        'payment_type',
        'order_notes',
        'order_status',
        'landmark',
        'street_address',
        'pincode',
        'desired_time',
        'desired_date',
        [sequelize.literal(`CONCAT('${apiUrl}/storage/app/public/images/products/', image)`), 'image'],
        [sequelize.fn('DATE_FORMAT', sequelize.col('Order.created_at'), '%d-%m-%Y'), 'date'],
        [sequelize.literal(`
          CASE 
            WHEN discount_amount IS NULL THEN SUM(price * qty) + SUM(tax) + SUM(shipping_cost)
            ELSE SUM(price * qty) + SUM(tax) + SUM(shipping_cost) - SUM(discount_amount)
          END
        `), 'grand_total']
      ],
      include: [
        {
          model: Payment,
          attributes: ['id', 'payment_name'],
          where: { status: 1 },
          as: 'payment'
        }
      ],
      raw: true,
      nest: true
    });

    if (!order) {
      return res.status(200).json({ status: 0, message: "Order not found" });
    }

    // Convert desired_time to 12-hour format
    const desiredTime24 = order.desired_time;
    const desiredTime12 = moment(desiredTime24, 'HH:mm').format('hh:mm A');
    order.desired_time = desiredTime12;

    // Fetch Variation and Attribute details
    const variationDetails = await Variation.findByPk(order.variation);
    const attributeDetails = await Attribute.findByPk(order.attribute);

    order.variation = variationDetails?.variation || '';
    order.attribute = attributeDetails?.attribute || '';

    return res.status(200).json({ status: 1, message: "Order found", data: order });
  } catch (error) {
    console.error("Error tracking order:", error);
    return res.status(500).json({ status: 0, message: "Failed to track order", error });
  }
};

exports.rescheduleOrder = async (req, res) => {
  const { id, desired_time, desired_date } = req.body;

  if (!id || !desired_time || !desired_date) {
      return res.status(400).json({ status: 0, message: "Date & Time are required" });
  }

  try {
      const orderExists = await Order.findOne({ where: { id } });

      if (!orderExists) {
          return res.status(200).json({ status: 0, message: "Order not found" });
      }

      let formattedTime = moment(desired_time, 'hh:mm A').format('HH:mm');

      await Order.update({ desired_time: formattedTime, desired_date }, { where: { id } });

      const updatedOrder = await Order.findByPk(id, { include: [{ model: User, attributes: ['email'], as: "user" }] });
      
      if (updatedOrder.user.email) {
        try {
          const subject = `Order Rescheduled - Order #${updatedOrder.order_number}`;
          const html = `
            <h1>Your order has been rescheduled</h1>
            <p>Order Number: ${updatedOrder.order_number}</p>
            <p>New Date: ${desired_date}</p>
            <p>New Time: ${desired_time}</p>
            <p>Thank you for your patience!</p>
          `;
          await sendEmail(updatedOrder.user.email, subject, html);
        } catch (emailError) {
          console.error("Error sending order reschedule email:", emailError);
        }
      }

      return res.status(200).json({ status: 1, message: "Order rescheduled successfully" });
  } catch (error) {
      console.error("Error rescheduling order:", error);
      return res.status(500).json({ status: 0, message: "Failed to reschedule order" });
  }
};

exports.cancelOrder = async (req, res) => {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ status: 0, message: "Order number is required" });
    }

    try {
      const order = await Order.findOne({ where: { id } });

      if (!order) {
        return res.status(200).json({ status: 0, message: "Order not found" });
      }

      if (order.order_status > 1) {
        return res.status(200).json({ status: 0, message: "This order cannot be cancelled", new: order });
      }

      await Order.update({ order_status: 6 }, { where: { id } });

      await Notification.create({
        user_id: order.user_id,
        order_id: order.id,
        order_number: order.order_number,
        order_status: "6",
        message: `Order ${order.order_number} has been cancelled`,
        is_read: "1",
        type: "order",
      });

      const user = await User.findByPk(order.user_id, { attributes: ['email'] });
      if (user.email) {
        try {
          const subject = `Order Cancelled - Order #${order.order_number}`;
          const html = `
            <h1>Your order has been cancelled</h1>
            <p>Order Number: ${order.order_number}</p>
            <p>We're sorry to see you cancel. If you have any questions, please contact our support team.</p>
          `;
          await sendEmail(user.email, subject, html);
        } catch (emailError) {
          console.error("Error sending order cancellation email:", emailError);
        }
      }

      return res.status(200).json({ status: 1, message: "Order cancelled successfully" });
    } catch (error) {
      console.error("Error cancelling order:", error);
      return res.status(500).json({ status: 0, message: "Failed to cancel order" });
    }
}

exports.review = async (req, res) => {
    const { user_id, product_id, order_id, vendor_id, ratting, review } = req.body;

    if (!user_id || !product_id || !order_id || !vendor_id || !ratting || !review) {
      return res.status(400).json({ status: 0, message: "All fields are required" });
    }

    try {
      await Ratting.create({
        user_id,
        product_id,
        order_id,
        vendor_id,
        ratting,
        review,
      });

      return res.status(200).json({ status: 1, message: "Review added successfully" });
    } catch (error) {
      console.error("Error adding review:", error);
      return res.status(500).json({ status: 0, message: "Failed to add review" });
    }
  },

exports.vendororderhistory = async (req, res) => {
    const { vendor_id } = req.body;

    if (!vendor_id) {
      return res.status(400).json({ status: 0, message: "Vendor id is required" });
    }

    try {
      const orderdata = await Order.findAll({
        attributes: [
          'id',
          'order_number',
          'payment_type',
          'order_status',
          [sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), '%d-%m-%Y'), 'date'],
          [sequelize.fn('case', sequelize.literal('when discount_amount is null then SUM(price*qty)+SUM(tax)+SUM(shipping_cost) else SUM(price*qty)+SUM(tax)+SUM(shipping_cost)-SUM(discount_amount) end'), 'grand_total')]
        ],
        where: { vendor_id },
        group: 'order_number',
        order: [['id', 'DESC']],
        limit: 10,
      });

      if (orderdata.length > 0) {
        return res.status(200).json({ status: 1, message: "Vendor order history list successful", data: orderdata });
      } else {
        return res.status(200).json({ status: 0, message: "No vendor order history found" });
      }
    } catch (error) {
      console.error("Error fetching vendor order history:", error);
      return res.status(500).json({ status: 0, message: "Failed to fetch vendor order history" });
    }
}

exports.vendororderdetails = async (req, res) => {
    const { order_number } = req.body;

    if (!order_number) {
      return res.status(400).json({ status: 0, message: "Order number is required" });
    }

    try {
      const order_info = await Order.findOne({
        attributes: [
          'order_number',
          'order_notes',
          'payment_type',
          'full_name',
          'email',
          'mobile',
          'landmark',
          'street_address',
          'pincode',
          'coupon_name',
          "desired_time",
          "desired_date",
          [sequelize.fn('SUM', sequelize.col('discount_amount')), 'discount_amount'],
          'status',
          [sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), '%d-%m-%Y'), 'date'],
          [sequelize.fn('SUM', sequelize.col('price*qty')+sequelize.col('tax')+sequelize.col('shipping_cost')-sequelize.col('discount_amount')), 'grand_total']
        ],
        where: { order_number },
        group: 'order_number'
      });

      const order_details = await Order.findAll({
        attributes: [
          'id',
          'product_name',
          'image',
          'qty',
          'price',
          'attribute',
          'variation',
          'tax',
          'shipping_cost',
        ],
        where: { order_number },
      });

      return res.status(200).json({ status: 1, message: "Vendor order details fetched successfully", order_info, order_details });
    } catch (error) {
      console.error("Error fetching vendor order details:", error);
      return res.status(500).json({ status: 0, message: "Failed to fetch vendor order details" });
    }
}

exports.wallet = async (req, res) => {
    const { user_id } = req.body;
  
    if (!user_id) {
      return res.status(400).json({ status: 0, message: 'Please login to save address' });
    }
  
    try {
      const user = await User.findOne({ 
        where: { id: user_id },
        attributes: ['wallet']
      });
  
      if (!user) {
        return res.status(400).json({ status: 0, message: 'Invalid user ID' });
      }
  
      const transactions = await Transaction.findAll({
        where: { user_id },
        attributes: [
          'order_number',
          'transaction_type',
          'wallet',
          [sequelize.fn('DATE_FORMAT', sequelize.col('created_at'), '%d-%m-%Y'), 'date'],
          'username',
          'type'
        ],
        order: [['id', 'DESC']],
        limit: 10 // Paginate with a limit of 10
      });
  
      if (transactions.length > 0) {
        return res.status(200).json({
          status: 1,
          message: 'Transaction list Successful',
          walletamount: user.wallet,
          data: transactions
        });
      } else {
        return res.status(200).json({
          status: 0,
          message: 'No transactions found'
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 0,
        message: 'Something went wrong',
        error: error.message
      });
    }
}

exports.recharge = async (req, res) => {
    const { user_id, payment_type, payment_id, stripeToken, recharge_amount } = req.body;
  
    try {
      const getuserdata = await User.findOne({ 
        where: { id: user_id },
        attributes: ['token', 'email', 'name', 'wallet']
      });
  
      const gettimezone = await Settings.findOne({ 
        attributes: ['timezone'] 
      });
  
      if (!getuserdata) {
        return res.status(400).json({ status: 0, message: 'Invalid user ID' });
      }
  
      if (!gettimezone) {
        return res.status(500).json({ status: 0, message: 'Settings not found' });
      }
  
      const userTimezone = gettimezone.timezone;
      process.env.TZ = userTimezone;
  
      let paymentId = payment_id;
  
      if (payment_type == 3 || payment_type == 5 || payment_type == 6) {
        // Use provided payment_id for RazorPay, Flutterwave, or Paystack
      } else if (payment_type == 4) {
        const getstripe = await Payment.findOne({
          where: { payment_name: 'Stripe' },
          attributes: ['environment', 'test_secret_key', 'live_secret_key']
        });
  
        if (!getstripe) {
          return res.status(500).json({ status: 0, message: 'Stripe settings not found' });
        }
  
        const skey = getstripe.environment == '1' ? getstripe.test_secret_key : getstripe.live_secret_key;
  
        stripe.setApiKey(skey);
  
        const customer = await stripe.customers.create({
          email: getuserdata.email,
          source: stripeToken,
          name: getuserdata.name,
        });
  
        const charge = await stripe.charges.create({
          customer: customer.id,
          amount: recharge_amount * 100,
          currency: 'usd',
          description: 'eCommerce',
        });
  
        paymentId = charge.id;
      }
  
      await Transaction.create({
        user_id: user_id,
        order_id: null,
        order_number: null,
        wallet: recharge_amount,
        payment_id: paymentId,
        transaction_type: '4',
        username: getuserdata.name,
        type: payment_type,
      });
  
      const updatedWallet = getuserdata.wallet + recharge_amount;
  
      await User.update({ wallet: updatedWallet }, { where: { id: user_id } });
  
      return res.status(200).json({ status: 1, message: 'Recharge success' });
    } catch (error) {
      console.error('Error during recharge:', error);
      return res.status(500).json({ status: 0, message: `Error: ${error.message}` });
    }
}