const { Op } = require("sequelize");
const sequelize = require("../config/connection");
const Razorpay = require("razorpay");
const {
  Order,
  Cart,
  Ratting,
  Payment,
  User,
  Notification,
  Transaction,
  Settings,
  Variation,
  Coupons,
  Attribute,
  Wallet,
  WalletTransaction,
} = require("../models");

const moment = require("moment");
const crypto = require("crypto");
const axios = require("axios");
const apiUrl = process.env.apiUrl;
const { sendEmail } = require("../middleware/mailMiddleware");
const {
  sendWhatsAppNotification,
} = require("../utils/sendWhatsAppNotification");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const calculateContractDates = (startDate, warrantyDays = 0) => {
  if (!startDate) return { contract_start_date: null, contract_end_date: null };

  // Ensure startDate is a moment object and is valid
  const start = moment(startDate);
  if (!start.isValid()) return { contract_start_date: null, contract_end_date: null };

  // If warrantyDays is 0 or less, no contract dates
  if (Number(warrantyDays) <= 0) {
    return { contract_start_date: null, contract_end_date: null };
  }

  // logic: Start Date + Warranty Days = End Date
  // Example: Start Jan 1 + 30 days = End Jan 31
  const addDays = Number(warrantyDays);
  const end = start.clone().add(addDays, 'days');

  return {
    contract_start_date: start.format('YYYY-MM-DD'),
    contract_end_date: end.format('YYYY-MM-DD')
  };
};

exports.initiatePayment = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    let amount = req.body.amount;

    amount = Math.round(amount * 100);

    const options = {
      amount: amount,
      currency: req.body.currency,
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    };

    const order = await instance.orders.create(options);

    if (!order)
      return res
        .status(500)
        .json({ status: 0, message: "Failed to create razorpay order" });

    return res
      .status(200)
      .json({ status: 1, message: "razorpay order successful", data: order });
  } catch (error) {
    console.error("Error in initiatePayment:", error);
    return res.status(500).json({
      status: 0,
      message: "Failed to create razorpay order",
      error: error.message,
    });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return res
        .status(200)
        .json({ status: 1, message: "Payment verified successfully" });
    } else {
      return res
        .status(400)
        .json({ status: 0, message: "Invalid signature sent!" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({
      status: 0,
      message: "Internal server error",
      error: error.message,
    });
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
    coupon_id,
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
    desired_date,
    wallet_used = 0,
    tip_amount = 0,
  } = req.body;

  if (!user_id) {
    return res.status(400).json({ status: 0, message: "Please login to save address" });
  }

  const userData = await User.findByPk(user_id);
  if (!userData) return res.status(400).json({ status: 0, message: "Invalid user ID" });

  const t = await sequelize.transaction();      // ⬅ single transaction for EVERYTHING
  try {
    let formattedTime = desired_time ? moment(desired_time, "hh:mm A").format("HH:mm") : desired_time;

    const maxOrderNumber = await Order.max("order_number", {
      where: {
        order_number: { [Op.ne]: null },
      },
      transaction: t, // keep inside same transaction
      lock: t.LOCK.UPDATE, // prevents race conditions
    });

    const order_number = ((parseInt(maxOrderNumber) || 10000) + 1).toString();

    const [[{ max_service }]] = await sequelize.query(
      `SELECT COALESCE(MAX(service_number), 0) AS max_service FROM orders FOR UPDATE`,
      { transaction: t }
    );

    // Next service number should be max_service + 1. If no existing value, start at 1.
    const service_number = parseInt(max_service || 0, 10) + 1;

    // cart
    const cartItems = await Cart.findAll({
      where: { user_id },
      order: [["id", "DESC"]],
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (cartItems.length === 0) {
      await t.rollback();
      return res.status(200).json({ status: 0, message: "Your cart is empty" });
    }

    const wantToUse = Number(wallet_used || 0);
    let walletDebited = 0;
    if (wantToUse > 0) {
      const preWalletDue = Math.max(0,
        cartItems.reduce((sum, it) =>
          sum
          + Number(it.price || 0) * Number(it.qty || 0)
          + Number(it.tax || 0) * Number(it.qty || 0)
          + Number(it.shipping_cost || 0),
          0) - Number(discount_amount || 0)
      );

      // find/create wallet and lock
      const [wallet] = await Wallet.findOrCreate({
        where: { user_id },
        defaults: { user_id, balance: 0 },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      const balance = Number(wallet.balance) || 0;
      walletDebited = Math.max(0, Math.min(wantToUse, balance, preWalletDue));

      if (walletDebited > 0) {
        wallet.balance = balance - walletDebited;
        await wallet.save({ transaction: t });

        await WalletTransaction.create({
          wallet_id: wallet.id,
          transaction_type: "debit",
          amount: walletDebited,
          payment_id: String(payment_id || `WAL-${order_number}`),
          description: `Order #${order_number} payment`,
        }, { transaction: t });
      }
    }
    const orders = [];

    // Distribute walletDebited among items
    // Let's actually calculate the total number of visits/rows that will be created
    let totalVisits = 0;
    for (const item of cartItems) {
      const v = await Variation.findOne({ where: { id: item.variation, product_id: item.product_id }, transaction: t });
      totalVisits += (v && v.variation_times && v.variation_times > 1) ? v.variation_times : 1;
    }

    const walletPerVisit = totalVisits > 0 ? walletDebited / totalVisits : 0;
    const tipPerVisit = totalVisits > 0 ? Number(tip_amount || 0) / totalVisits : 0;
    let remainingWalletToDistribute = walletDebited;

    // Use a mutable nextServiceNumber for multi-item/multi-visit increments
    let nextServiceNumber = parseInt(service_number, 10) || 1;

    for (const cartItem of cartItems) {
      const {
        vendor_id, product_id, product_name, image, qty, price,
        attribute, variation, tax, shipping_cost,
      } = cartItem;
      // Note: we ignore cartItem.wallet_amount because we are using the ACTUAL applied balance (walletDebited)

      const discountPerItem = Number(discount_amount || 0) / cartItems.length;
      const variationDetails = await Variation.findOne({ where: { id: variation, product_id }, transaction: t });
      const attributeDetails = await Attribute.findOne({ where: { id: attribute }, transaction: t });
      const warrantyDays = Number(attributeDetails?.under_warranty_day || 0);

      const getContractForDate = (startYMD) => calculateContractDates(startYMD, warrantyDays);

      const currentServiceNumber = nextServiceNumber++;
      const { contract_start_date, contract_end_date } = getContractForDate(desired_date);

      if (variationDetails && variationDetails.variation_times && variationDetails.variation_times > 1) {
        const { variation_interval, variation_times } = variationDetails;
        const pricePerOrder = price / variation_times;

        for (let i = 0; i < variation_times; i++) {
          const orderDate = moment(desired_date)
            .add(i * variation_interval, "days")
            .format("YYYY-MM-DD");


          const order = await Order.create({
            user_id,
            vendor_id,
            product_id,
            order_number,
            service_number,
            payment_id,
            product_name,
            image,
            qty,
            price: pricePerOrder * qty,
            attribute,
            variation,
            tax: (tax / variation_times) * qty,
            wallet_amount: walletPerVisit, // Store actually applied wallet balance
            tip_amount: tipPerVisit,
            coupon_name,
            coupon_id,
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
            discount_amount: discountPerItem / variation_times,
            order_status: 1,
            desired_time: formattedTime,
            desired_date: orderDate,                // booking start date (per visit)
            contract_start_date,
            contract_end_date,
            service_number: currentServiceNumber,               // Same service number for all visits
          }, { transaction: t });
          orders.push(order);
        }
      } else {
        const { contract_start_date, contract_end_date } = getContractForDate(desired_date);

        const order = await Order.create({
          user_id,
          vendor_id,
          product_id,
          order_number,
          service_number,
          payment_id,
          product_name,
          image,
          qty,
          price: price * qty,
          attribute,
          variation,
          tax: tax * qty,
          wallet_amount: walletPerVisit, // Store actually applied wallet balance
          tip_amount: tipPerVisit,
          coupon_name,
          coupon_id,
          shipping_cost,
          order_total: grand_total,                 // store full order total
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
          discount_amount: discountPerItem,
          order_status: 1,
          desired_time: formattedTime,
          desired_date,
          contract_start_date,
          contract_end_date,
          service_number: currentServiceNumber,
        }, { transaction: t });

        orders.push(order);
      }
    }

    await Cart.destroy({ where: { user_id }, transaction: t });
    await t.commit();
    try {
      const currentDate = new Date();
      const currentTime = currentDate.toLocaleTimeString();
      const firstName = userData.name;
      const firstProduct = orders[0]?.product_name || "Service";

      const aggregatedProducts = (() => {
        const map = {};
        for (const o of orders) {
          const name = o.product_name || "Product";
          const q = Number(o.qty) || 1;
          if (!map[name]) map[name] = 0;
          map[name] += q;
        }
        return Object.entries(map)
          .map(([name, q]) => `${name} (x${q})`)
          .join(", ");
      })();

      sendWhatsAppNotification({
        campaignName: "⁠Booking Service",
        phoneNumber: userData.mobile,
        userName: userData.name,
        templateParams: [
          firstName?.toString(),
          order_number?.toString(),
          currentDate.toLocaleDateString(),
          currentTime?.toString(),
          aggregatedProducts || orders.map(o => o.product_name).join(", ") || firstProduct,
          grand_total?.toString(),
        ],
      });

      if (userData?.email) {
        const subject = `Your Hommlie Service Booking is Confirmed! 🧹✨`;
        const html = `
          <h2>Your Hommlie Service Booking is Confirmed! 🧹✨</h2>
          <p>Hi ${userData.name},</p>
          <p>Thanks for booking with Hommlie! 🧹✨</p>
          <ul style="list-style:none;padding:0;">
            <li><b>🆔 Order ID:</b> ${order_number}</li>
            <li><b>🗓 Date:</b> ${orders[0]?.desired_date || "-"}</li>
            <li><b>🕒 Time:</b> ${orders[0]?.desired_time || "-"}</li>
            <li><b>🛠 Service:</b> ${aggregatedProducts || orders.map(o => o.product_name).join(", ") || firstProduct}</li>
            <li><b>💰 Amount:</b> ₹${grand_total}</li>
          </ul>
          <p>Our team is ready to make your home shine!</p>
          <br/>
          <p>Your hygiene, our priority!<br/>
          Hommlie – Your Hygiene Partner</p>
        `;
        await sendEmail(userData.email, subject, html);
      }
    } catch (e) {
      console.error("Post-commit notify error:", e);
    }

    const freshWallet = await Wallet.findOne({ where: { user_id } });
    return res.status(200).json({
      status: 1,
      message: "Order has been placed successfully",
      order_number,
      service_number,
      wallet_debited: walletDebited,
      wallet_balance: Number(freshWallet?.balance || 0),
    });
  } catch (error) {
    console.error("Error placing order:", error);
    try { await t.rollback(); } catch (e) { }
    return res.status(500).json({ status: 0, message: "Failed to place order", error: error.message });
  }
};


exports.orderhistory = async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res
      .status(400)
      .json({ status: 0, message: "Please login to save address" });
  }

  try {
    const orderData = await Order.findAll({
      attributes: [
        "id",
        "product_id",
        "product_name",
        "service_number",
        "order_number",
        "qty",
        "price",
        "attribute",
        "variation",
        "discount_amount",
        "wallet_amount",
        "tip_amount",
        "shipping_cost",
        "order_total",
        "coupon_name",
        "coupon_id",
        "full_name",
        "email",
        "mobile",
        "payment_type",
        "status",
        "order_status",
        "desired_time",
        "desired_date",
        "contract_start_date",
        "contract_end_date",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/products/', image)`
          ),
          "image",
        ],
        [sequelize.fn("DATE_FORMAT", sequelize.col("desired_date"), "%d-%m-%Y"), "booking_date"],
        [
          sequelize.literal(`
          CASE 
            WHEN discount_amount IS NULL THEN SUM(price * qty) + SUM(tax) + SUM(shipping_cost) + SUM(IFNULL(tip_amount, 0)) - SUM(IFNULL(wallet_amount, 0))
            ELSE SUM(price * qty) + SUM(tax) + SUM(shipping_cost) + SUM(IFNULL(tip_amount, 0)) - SUM(discount_amount) - SUM(IFNULL(wallet_amount, 0))
          END
        `),
          "grand_total",
        ],
      ],
      include: [
        {
          model: Payment,
          as: "payment",
          attributes: ["payment_name"],
        },
      ],
      where: { user_id },
      group: [
        "id",
        "product_id",
        "product_name",
        "service_number",
        "order_number",
        "qty",
        "price",
        "attribute",
        "variation",
        "discount_amount",
        "wallet_amount",
        "tip_amount",
        "shipping_cost",
        "order_total",
        "full_name",
        "email",
        "mobile",
        "payment_type",
        "status",
        "image",
        "contract_start_date",
        "contract_end_date",
        "payment.payment_name",
      ],
      order: [
        ["order_number", "DESC"],
        ["service_number", "DESC"],
        ["id", "DESC"],
      ],
      // limit: 10
    });

    const updatedData = await Promise.all(
      orderData.map(async (order) => {
        const variationDetails = await Variation.findByPk(order.variation);
        const attributeDetails = await Attribute.findByPk(order.attribute);

        // Convert desired_time to 12-hour format
        const desiredTime24 = order.desired_time;
        const desiredTime12 = moment(desiredTime24, "HH:mm").format("hh:mm A");

        return {
          ...order.toJSON(),
          desired_time: desiredTime12,
          attribute: attributeDetails?.attribute || "",
          variation: variationDetails?.variation || "",
        };
      })
    );

    if (updatedData.length > 0) {
      return res.status(200).json({
        status: 1,
        message: "Order history list successful",
        data: updatedData,
      });
    } else {
      return res
        .status(200)
        .json({ status: 0, message: "No order history found" });
    }
  } catch (error) {
    console.error("Error fetching order history:", error);
    return res
      .status(500)
      .json({ status: 0, message: "Failed to fetch order history", error });
  }
};

exports.orderdetails = async (req, res) => {
  const { order_number } = req.body;

  if (!order_number) {
    return res
      .status(400)
      .json({ status: 0, message: "Order number is required" });
  }

  try {
    // Fetch basic order information
    const order_info = await Order.findOne({
      attributes: [
        "order_number",
        "service_number",
        "order_notes",
        "payment_type",
        "full_name",
        "email",
        "mobile",
        "landmark",
        "street_address",
        "pincode",
        "coupon_name",
        "discount_amount",
        "wallet_amount",
        "tip_amount",
        "status",
        "order_status",
        "desired_time",
        "desired_date",
        "contract_start_date",
        "contract_end_date",
        [
          sequelize.fn("DATE_FORMAT", sequelize.col("desired_date"), "%d-%m-%Y"),
          "booking_date",
        ],
      ],
      where: { order_number },
    });

    if (!order_info) {
      return res.status(404).json({ status: 0, message: "Order not found" });
    }

    // Fetch all items related to the order
    const order_data = await Order.findAll({
      attributes: [
        "id",
        "product_id",
        "product_name",
        "qty",
        "price",
        "tax",
        "shipping_cost",
        "wallet_amount",
        "tip_amount",
        "discount_amount",
        "order_status",
        "attribute",
        "variation",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/products/', image)`
          ),
          "image_url",
        ],
      ],
      where: { order_number },
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
      // wallet_amount is subtracted from the grand total
    }

    // Calculate grand total including wallet deduction
    const walletTotal = order_data.reduce((acc, item) => acc + parseFloat(item.wallet_amount || 0), 0);
    const tipTotal = order_data.reduce((acc, item) => acc + parseFloat(item.tip_amount || 0), 0);
    const grand_total = subtotal + taxTotal + shippingTotal + tipTotal - discountTotal - walletTotal;

    const response = {
      status: 1,
      message: "Order history list Successful",
      order_info: {
        ...order_info.toJSON(),
        subtotal: subtotal.toFixed(2),
        tax: taxTotal.toFixed(2),
        shipping_cost: shippingTotal.toFixed(2),
        discount_amount: discountTotal.toFixed(2),
        wallet_amount: walletTotal.toFixed(2),
        tip_amount: tipTotal.toFixed(2),
        grand_total: grand_total.toFixed(2),
      },
      order_data: order_data.map((item) => item.toJSON()),
    };

    // Additional data processing
    for (const orderItem of response.order_data) {
      const variationDetails = await Variation.findByPk(orderItem.variation);
      const attributeDetails = await Attribute.findByPk(orderItem.attribute);
      orderItem.variation = variationDetails?.variation || "";
      orderItem.attribute = attributeDetails?.attribute || "";
    }

    // Convert desired_time to 12-hour format
    const desiredTime24 = response.order_info.desired_time;
    const desiredTime12 = moment(desiredTime24, "HH:mm").format("hh:mm A");
    response.order_info.desired_time = desiredTime12;

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching order details:", error);
    return res
      .status(500)
      .json({ status: 0, message: "Failed to fetch order details", error });
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
        "order_number",
        "status",
        "product_name",
        "qty",
        "price",
        "attribute",
        "variation",
        "discount_amount",
        "wallet_amount",
        "shipping_cost",
        "order_total",
        "full_name",
        "email",
        "mobile",
        "payment_type",
        "order_notes",
        "order_status",
        "landmark",
        "street_address",
        "pincode",
        "desired_time",
        "desired_date",
        "contract_start_date",
        "contract_end_date",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/products/', image)`
          ),
          "image",
        ],
        [sequelize.fn("DATE_FORMAT", sequelize.col("desired_date"), "%d-%m-%Y"), "booking_date"],
        [
          sequelize.literal(`
          CASE 
            WHEN discount_amount IS NULL THEN SUM(price * qty) + SUM(tax) + SUM(shipping_cost) - SUM(IFNULL(wallet_amount, 0))
            ELSE SUM(price * qty) + SUM(tax) + SUM(shipping_cost) - SUM(discount_amount) - SUM(IFNULL(wallet_amount, 0))
          END
        `),
          "grand_total",
        ],
      ],
      include: [
        {
          model: Payment,
          attributes: ["id", "payment_name"],
          where: { status: 1 },
          as: "payment",
        },
      ],
      raw: true,
      nest: true,
    });

    if (!order) {
      return res.status(200).json({ status: 0, message: "Order not found" });
    }

    // Convert desired_time to 12-hour format
    const desiredTime24 = order.desired_time;
    const desiredTime12 = moment(desiredTime24, "HH:mm").format("hh:mm A");
    order.desired_time = desiredTime12;

    // Fetch Variation and Attribute details
    const variationDetails = await Variation.findByPk(order.variation);
    const attributeDetails = await Attribute.findByPk(order.attribute);

    order.variation = variationDetails?.variation || "";
    order.attribute = attributeDetails?.attribute || "";

    return res
      .status(200)
      .json({ status: 1, message: "Order found", data: order });
  } catch (error) {
    console.error("Error tracking order:", error);
    return res
      .status(500)
      .json({ status: 0, message: "Failed to track order", error });
  }
};

exports.rescheduleOrder = async (req, res) => {
  const { id, desired_time, desired_date } = req.body;
  if (!id || !desired_time || !desired_date) {
    return res.status(400).json({ status: 0, message: "Date & Time are required" });
  }

  try {
    const order = await Order.findByPk(id);
    if (!order) return res.status(200).json({ status: 0, message: "Order not found" });

    const attributeDetails = await Attribute.findByPk(order.attribute);
    const warrantyDays = Number(attributeDetails?.under_warranty_day || 0);

    const formattedTime = moment(desired_time, 'hh:mm A').format('HH:mm');
    const { contract_start_date, contract_end_date } = calculateContractDates(desired_date, warrantyDays);

    if (!contract_start_date || !contract_end_date) {
      return res.status(400).json({ status: 0, message: "Invalid date format" });
    }

    await Order.update({
      desired_time: formattedTime,
      desired_date,
      contract_start_date,
      contract_end_date,
    }, { where: { order_number: order.order_number } });

    return res.status(200).json({ status: 1, message: "Order rescheduled successfully" });
  } catch (error) {
    console.error("Error rescheduling order:", error);
    return res.status(500).json({ status: 0, message: "Failed to reschedule order" });
  }
};

exports.cancelOrder = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ status: 0, message: "Order number is required" });
  }

  try {
    const order = await Order.findOne({ where: { id } });

    if (!order) {
      return res.status(200).json({ status: 0, message: "Order not found" });
    }

    if (order.order_status > 1) {
      return res.status(200).json({
        status: 0,
        message: "This order cannot be cancelled",
        new: order,
      });
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

    const user = await User.findByPk(order.user_id, { attributes: ["email"] });
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

    return res
      .status(200)
      .json({ status: 1, message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling order:", error);
    return res
      .status(500)
      .json({ status: 0, message: "Failed to cancel order" });
  }
};

(exports.review = async (req, res) => {
  const { user_id, product_id, order_id, vendor_id, ratting, review } =
    req.body;

  if (
    !user_id ||
    !product_id ||
    !order_id ||
    !vendor_id ||
    !ratting ||
    !review
  ) {
    return res
      .status(400)
      .json({ status: 0, message: "All fields are required" });
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

    return res
      .status(200)
      .json({ status: 1, message: "Review added successfully" });
  } catch (error) {
    console.error("Error adding review:", error);
    return res.status(500).json({ status: 0, message: "Failed to add review" });
  }
}),
  (exports.vendororderhistory = async (req, res) => {
    const { vendor_id } = req.body;

    if (!vendor_id) {
      return res
        .status(400)
        .json({ status: 0, message: "Vendor id is required" });
    }

    try {
      const orderdata = await Order.findAll({
        attributes: [
          "id",
          "order_number",
          "payment_type",
          "order_status",
          [
            sequelize.fn(
              "DATE_FORMAT",
              sequelize.col("created_at"),
              "%d-%m-%Y"
            ),
            "date",
          ],
          [
            sequelize.literal(
              "SUM(price * qty + tax + shipping_cost - IFNULL(discount_amount, 0))"
            ),
            "grand_total",
          ],

        ],
        where: { vendor_id },
        group: "order_number",
        order: [["id", "DESC"]],
        limit: 10,
      });

      if (orderdata.length > 0) {
        return res.status(200).json({
          status: 1,
          message: "Vendor order history list successful",
          data: orderdata,
        });
      } else {
        return res
          .status(200)
          .json({ status: 0, message: "No vendor order history found" });
      }
    } catch (error) {
      console.error("Error fetching vendor order history:", error);
      return res
        .status(500)
        .json({ status: 0, message: "Failed to fetch vendor order history" });
    }
  });

exports.vendororderdetails = async (req, res) => {
  const { order_number } = req.body;

  if (!order_number) {
    return res
      .status(400)
      .json({ status: 0, message: "Order number is required" });
  }

  try {
    const order_info = await Order.findOne({
      attributes: [
        "order_number",
        "order_notes",
        "payment_type",
        "full_name",
        "email",
        "mobile",
        "landmark",
        "street_address",
        "pincode",
        "coupon_name",
        "desired_time",
        "desired_date",
        "contract_start_date",
        "contract_end_date",
        [
          sequelize.fn("SUM", sequelize.col("discount_amount")),
          "discount_amount",
        ],
        "status",
        [
          sequelize.fn("DATE_FORMAT", sequelize.col("created_at"), "%d-%m-%Y"),
          "date",
        ],
        [
          sequelize.literal(
            "SUM(price * qty + tax + shipping_cost - IFNULL(discount_amount, 0))"
          ),
          "grand_total",
        ],

      ],
      where: { order_number },
      group: "order_number",
    });

    const order_details = await Order.findAll({
      attributes: [
        "id",
        "product_name",
        "image",
        "qty",
        "price",
        "attribute",
        "variation",
        "tax",
        "shipping_cost",
      ],
      where: { order_number },
    });

    return res.status(200).json({
      status: 1,
      message: "Vendor order details fetched successfully",
      order_info,
      order_details,
    });
  } catch (error) {
    console.error("Error fetching vendor order details:", error);
    return res
      .status(500)
      .json({ status: 0, message: "Failed to fetch vendor order details" });
  }
};

exports.wallet = async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res
      .status(400)
      .json({ status: 0, message: "Please login to save address" });
  }

  try {
    const user = await User.findOne({
      where: { id: user_id },
      attributes: ["wallet"],
    });

    if (!user) {
      return res.status(400).json({ status: 0, message: "Invalid user ID" });
    }

    const transactions = await Transaction.findAll({
      where: { user_id },
      attributes: [
        "order_number",
        "transaction_type",
        "wallet",
        [
          sequelize.fn("DATE_FORMAT", sequelize.col("created_at"), "%d-%m-%Y"),
          "date",
        ],
        "username",
        "type",
      ],
      order: [["id", "DESC"]],
      limit: 10, // Paginate with a limit of 10
    });

    if (transactions.length > 0) {
      return res.status(200).json({
        status: 1,
        message: "Transaction list Successful",
        walletamount: user.wallet,
        data: transactions,
      });
    } else {
      return res.status(200).json({
        status: 0,
        message: "No transactions found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.recharge = async (req, res) => {
  const { user_id, payment_type, payment_id, stripeToken, recharge_amount } =
    req.body;

  try {
    const getuserdata = await User.findOne({
      where: { id: user_id },
      attributes: ["token", "email", "name", "wallet"],
    });

    const gettimezone = await Settings.findOne({
      attributes: ["timezone"],
    });

    if (!getuserdata) {
      return res.status(400).json({ status: 0, message: "Invalid user ID" });
    }

    if (!gettimezone) {
      return res.status(500).json({ status: 0, message: "Settings not found" });
    }

    const userTimezone = gettimezone.timezone;
    process.env.TZ = userTimezone;

    let paymentId = payment_id;

    if (payment_type == 3 || payment_type == 5 || payment_type == 6) {
      // Use provided payment_id for RazorPay, Flutterwave, or Paystack
    } else if (payment_type == 4) {
      const getstripe = await Payment.findOne({
        where: { payment_name: "Stripe" },
        attributes: ["environment", "test_secret_key", "live_secret_key"],
      });

      if (!getstripe) {
        return res
          .status(500)
          .json({ status: 0, message: "Stripe settings not found" });
      }

      const skey =
        getstripe.environment == "1"
          ? getstripe.test_secret_key
          : getstripe.live_secret_key;

      stripe.setApiKey(skey);

      const customer = await stripe.customers.create({
        email: getuserdata.email,
        source: stripeToken,
        name: getuserdata.name,
      });

      const charge = await stripe.charges.create({
        customer: customer.id,
        amount: recharge_amount * 100,
        currency: "usd",
        description: "eCommerce",
      });

      paymentId = charge.id;
    }

    await Transaction.create({
      user_id: user_id,
      order_id: null,
      order_number: null,
      wallet: recharge_amount,
      payment_id: paymentId,
      transaction_type: "4",
      username: getuserdata.name,
      type: payment_type,
    });

    const updatedWallet = getuserdata.wallet + recharge_amount;

    await User.update({ wallet: updatedWallet }, { where: { id: user_id } });

    return res.status(200).json({ status: 1, message: "Recharge success" });
  } catch (error) {
    console.error("Error during recharge:", error);
    return res
      .status(500)
      .json({ status: 0, message: `Error: ${error.message}` });
  }
};

// Helper function to fetch image from URL
const fetchImageFromUrl = async (url) => {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
      timeout: 10000, // 10 second timeout
    });
    return Buffer.from(response.data);
  } catch (error) {
    console.error("Error fetching image from URL:", error.message);
    throw error;
  }
};

exports.generateInvoice = async (req, res) => {
  const { order_id } = req.params;

  try {
    // Fetch order
    const order = await Order.findByPk(order_id, {
      include: [
        { model: User, as: "user", attributes: ["name", "email", "mobile"] },
      ],
    });
    if (!order) {
      return res.status(404).json({ status: 0, message: "Order not found" });
    }

    // Fetch logo
    const settings = await Settings.findOne({ attributes: ["logo"] });

    const doc = new PDFDocument({ margin: 40 });
    const filename = `Hommlie_Invoice_${order.order_number}.pdf`;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=\"${filename}\"`);
    doc.pipe(res);

    // ===== HEADER =====
    if (settings && settings.logo) {
      try {
        const logoUrl = `${apiUrl}/storage/app/public/images/settings/${settings.logo}`;
        const logoBuffer = await fetchImageFromUrl(logoUrl);
        doc.image(logoBuffer, 460, 40, { width: 100 });
      } catch (e) {
        console.log("Logo error:", e.message);
      }
    }

    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .fillColor("#006400")
      .text("ADML TECHNOSERVICES PVT. LTD.", 40, 40);

    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor("black")
      .text(
        "Registered Office: 57 2nd floor, Place building, 6th Main Rd, Nagendra Block, Banashankari 1st Stage, Banashankari, Bengaluru, Karnataka 560050.",
        40,
        60,
        { width: 400 }
      )
      .text("Website: www.hommlie.com    Customer Care: +91 633866558", 40, 100);

    // ===== SERVICE CONTRACT FORM =====
    doc
      .moveDown()
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor("#006400")
      .text("SERVICE CONTRACT FORM", 40, 140);

    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor("black")
      .text(`PAN : AAQZ4A409K`, 40, 160)
      .text(`GSTIN : 29AAQZ4A409K1ZZ`, 200, 160)
      .text(`CIN : U96908KA2023PTC179034`, 360, 160);

    // ===== ORDER INFO =====
    const infoTop = 190;
    doc
      .font("Helvetica-Bold")
      .fillColor("black")
      .text(`Order No : #${order.order_number}`, 40, infoTop)
      .font("Helvetica")
      .text(`Order Date : ${new Date(order.created_at).toLocaleDateString()}`, 40, infoTop + 15)
      .text(`Customer Name : ${order.full_name}`, 40, infoTop + 30)
      .text(`Service Address : ${order.street_address || ""}`, 40, infoTop + 45, { width: 500 })
      .text(`House Number : ${order.house_number || ""}`, 40, infoTop + 75)
      .text(`Mobile : ${order.mobile}`, 40, infoTop + 90)
      .text(`Email : ${order.email}`, 40, infoTop + 105)
      .text(`Contract Start Date: ${order.contract_start_date || "-"}`, 40, infoTop + 120)
      .text(`Contract End Date: ${order.contract_end_date || "-"}`, 250, infoTop + 120);


    // ===== ORDER DETAILS TABLE =====
    const tableTop = infoTop + 150;

    // Title
    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor("#006400")
      .text("Order Details", 40, tableTop);

    const headers = [
      "SR-ID",
      "Name",
      "Quantity",
      "Price",
      "Discount",
      "Tax",
      "Desired Date & Time",
      "Status",
      "Order Total",
    ];

    // Adjusted widths → total = 555 exactly (fits A4 page width neatly)
    const colWidths = [50, 115, 50, 55, 55, 55, 85, 50, 90];
    const tableWidth = colWidths.reduce((a, b) => a + b, 0);

    const headerY = tableTop + 30;
    let x = 40;

    // Header background
    doc.rect(x, headerY, tableWidth, 22).fill("#f0f0f0").stroke();
    doc.font("Helvetica-Bold").fillColor("black").fontSize(8);

    // Draw headers
    let colX = x;
    headers.forEach((h, i) => {
      doc.text(h, colX + 4, headerY + 6, {
        width: colWidths[i] - 8,
        align: "left",
      });
      colX += colWidths[i];
    });

    // Row data
    const rowY = headerY + 22;
    doc.font("Helvetica").fillColor("black").fontSize(8);

    const row = [
      `SR-${order.id}`,
      order.product_name,
      order.qty.toString(),
      `₹${order.price}`,
      order.discount_amount ? `₹${order.discount_amount}` : "0",
      order.tax ? `₹${order.tax}` : "0",
      `${order.desired_date} ${order.desired_time}`,
      statusText,
      `₹${order.order_total}`,
    ];

    // Draw row with borders
    colX = x;
    row.forEach((val, i) => {
      doc.rect(colX, rowY, colWidths[i], 22).stroke();
      doc.text(val, colX + 4, rowY + 6, {
        width: colWidths[i] - 8,
        align: "left",
      });
      colX += colWidths[i];
    });


    // ===== PAYMENT TYPE =====
    const payTop = rowY + 40;

    // Title
    doc.font("Helvetica-Bold").fontSize(10).text("Payment Type", 40, payTop);

    const methods = ["COD", "Wallet", "RazorPay", "Stripe", "Flutterwave", "Paystack"];

    // Table layout
    const methodWidth = 90; // width of each column
    const methodHeight = 22;
    let payX = 40;
    const payY = payTop + 20;
    const typeMap = {
      1: "COD",
      2: "Wallet",
      3: "RazorPay",
      4: "Stripe",
      5: "Flutterwave",
      6: "Paystack",
    };
    const selectedMethod = typeMap[order.payment_type] || "";
    // Draw each payment method as a table cell
    methods.forEach((m) => {
      if (m === selectedMethod) {
        doc.rect(payX, payY, methodWidth, methodHeight).fill("#d1ffd1").stroke();
        doc.fillColor("black").font("Helvetica-Bold");
        doc.text(`● ${m}`, payX + 5, payY + 6, { width: methodWidth - 10, align: "center" });
      } else {
        doc.rect(payX, payY, methodWidth, methodHeight).stroke();
        doc.fillColor("black").font("Helvetica");
        doc.text(`○ ${m}`, payX + 5, payY + 6, { width: methodWidth - 10, align: "center" });
      }
      payX += methodWidth;
    });


    // ===== TOTALS TABLE =====
    const totalsTop = payTop + methodHeight + 40; // keep same spacing below Payment Type
    const boxX = 40;                // align with left side of Payment Type
    const boxWidth = methodWidth * methods.length; // same width as payment type row
    const rowHeight = 22;
    const padding = 8;

    // Rows (label, value)
    const totals = [
      ["Subtotal", order.price],
      ["Extra Charges", order.extra_charges || 0],
      ["Discount", order.discount_amount || 0],
      ["TAX", order.tax || 0],
    ];

    // Add the "Total" row separately (bold)
    const grandTotal = ["Total", order.order_total];

    // Calculate box height
    const boxHeight = (totals.length + 2) * rowHeight;

    // Draw outer table box
    doc.rect(boxX, totalsTop, boxWidth, boxHeight).stroke("#ccc");

    // Set font
    doc.font("Helvetica").fontSize(9);

    // Column positions (2 columns, split box width)
    const labelX = boxX + padding;
    const valueX = boxX + boxWidth - 70;

    // Starting y
    let tY = totalsTop + padding;

    // Render each row in table
    totals.forEach(([label, val]) => {
      // Row divider (except for first row)
      if (tY > totalsTop + padding) {
        doc.moveTo(boxX, tY - 4).lineTo(boxX + boxWidth, tY - 4).stroke("#eee");
      }

      // Label
      doc.text(label, labelX, tY);
      // Value (right aligned)
      doc.text(`₹${val}`, valueX, tY, { align: "right", width: 60 });

      tY += rowHeight;
    });

    // Divider line before grand total
    doc.moveTo(boxX, tY - 4).lineTo(boxX + boxWidth, tY - 4).stroke("#aaa");

    // Grand total row (bold + bigger font)
    doc.font("Helvetica-Bold").fontSize(10);
    doc.text(grandTotal[0], labelX, tY);
    doc.text(`₹${grandTotal[1]}`, valueX, tY, { align: "right", width: 60 });

    // Add margin below
    // Add margin below Totals Table
    const afterTableY = totalsTop + boxHeight + 30;

    // ===== CUSTOMER ACCEPTANCE =====
    const caTop = afterTableY; // start after totals table with margin

    // Heading
    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .fillColor("#006400") // dark green (like your style) or "black"
      .text("CUSTOMER ACCEPTANCE", 40, caTop);

    // Agreement statement
    doc
      .font("Helvetica")
      .fillColor("black")
      .fontSize(8)
      .text(
        "I/We agree that the service contract is based on the information provided above.",
        40,
        caTop + 15,
        { width: 500 }
      );

    // Name of customer with dotted line
    doc.text(
      "Name of Customer : .................................................................",
      40,
      caTop + 35,
      { width: 500 }
    );

    // Preserve note
    doc.text(
      "Preserve this contract form and payment receipt.",
      40,
      caTop + 55,
      { width: 500 }
    );

    // Signature section
    doc.text("Signature of Customer", 40, caTop + 80);


    // Finalize and send PDF
    doc.end();
  } catch (err) {
    console.error("Invoice error:", err);
    return res.status(500).json({ status: 0, message: "Failed", error: err.message });
  }
};

exports.raiseComplaint = async (req, res) => {
  try {
    const { orderId, complaintText } = req.body;
    if (!orderId || !complaintText) {
      return res.status(400).json({ error: "Order ID and complaint text are required." });
    }
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }
    order.complaint_remark = complaintText;
    await order.save();
    res.status(200).json({
      message: "Complaint received and saved successfully.",
      complaintText,
    });
  } catch (error) {
    console.error("Error in raiseComplaint:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};


exports.generateServiceReport = async (req, res) => {
  const { order_id } = req.params;

  try {
    // Fetch order details
    const order = await Order.findByPk(order_id, {
      include: [
        { model: User, as: "user", attributes: ["name", "email", "mobile"] },
      ],
    });

    if (!order) {
      return res.status(404).json({ status: 0, message: "Order not found" });
    }

    // Fetch logo
    const settings = await Settings.findOne({ attributes: ["logo"] });

    const OrderStatuses = [
      "Not Scheduled",
      "Scheduled",
      "Dispatched",
      "On Site",
      "Completed",
      "Incomplete",
      "Cancelled",
    ];
    const statusText = OrderStatuses[order.order_status] || "Order placed";
    // Create PDF
    const doc = new PDFDocument({ margin: 40 });
    const filename = `Hommlie_Service_Report_${order.order_number}.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    doc.pipe(res);

    // ===== HEADER =====
    if (settings && settings.logo) {
      try {
        const logoUrl = `${apiUrl}/storage/app/public/images/settings/${settings.logo}`;
        const logoBuffer = await fetchImageFromUrl(logoUrl);
        doc.image(logoBuffer, 460, 40, { width: 100 });
      } catch (e) {
        console.log("Logo error:", e.message);
      }
    }

    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .fillColor("#006400")
      .text("ADML TECHNOSERVICES PVT. LTD.", 40, 40);

    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor("black")
      .text(
        "Registered Office: 57 2nd floor, Place building, 6th Main Rd, Nagendra Block, Banashankari 1st Stage, Banashankari, Bengaluru, Karnataka 560050.",
        40,
        60,
        { width: 400 }
      )
      .text("Website: www.hommlie.com    Customer Care: +91 633866558", 40, 100);

    // ===== SERVICE CONTRACT FORM =====
    doc
      .moveDown()
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor("#006400")
      .text("SERVICE CONTRACT FORM", 40, 140);

    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor("black")
      .text(`PAN : AAQZ4A409K`, 40, 160)
      .text(`GSTIN : 29AAQZ4A409K1ZZ`, 200, 160)
      .text(`CIN : U96908KA2023PTC179034`, 360, 160);

    // ===== ORDER INFO =====
    const infoTop = 190;
    doc
      .font("Helvetica-Bold")
      .fillColor("black")
      .text(`Order No : #${order.order_number}`, 40, infoTop)
      .font("Helvetica")
      .text(
        `Order Date : ${new Date(order.created_at).toLocaleDateString()}`,
        40,
        infoTop + 15
      )
      .text(`Customer Name : ${order.full_name}`, 40, infoTop + 30)
      .text(
        `Service Address : ${order.street_address || ""}`,
        40,
        infoTop + 45,
        { width: 500 }
      )
      .text(`House Number : ${order.house_number || ""}`, 40, infoTop + 75)
      .text(`Mobile : ${order.mobile}`, 40, infoTop + 90)
      .text(`Email : ${order.email}`, 40, infoTop + 105)
      .text(`Service Date: ${order.desired_date}`, 40, infoTop + 120)
      .text(`Service Time: ${order.desired_time}`, 250, infoTop + 120)
      .text(`Status: ${statusText}`, 40, infoTop + 135) // <- move here
      .text(`Contract Start Date: ${order.contract_start_date || "-"}`, 40, infoTop + 150)
      .text(`Contract End Date: ${order.contract_end_date || "-"}`, 250, infoTop + 150)

      .text(
        `Status: ${OrderStatuses[order.order_status]}`,
        40,
        infoTop + 135
      );

    // ===== SERVICE DETAILS =====
    let y = infoTop + 170;
    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor("#006400")
      .text("Service Details", 40, y);

    y += 20;
    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor("black")
      .text(`Service: ${order.product_name}`, 40, y);

    if (order.attribute) {
      doc.text(
        `Type: Attribute ID ${order.attribute}${order.variation ? ` (Variation ID: ${order.variation})` : ""
        }`,
        40,
        y + 15
      );
    }

    doc
      .text(`Quantity: ${order.qty}`, 40, y + 35)
      .text(`Service Amount: ₹${order.price}`, 40, y + 50);

    // ===== NOTES =====
    if (order.order_notes) {
      y += 90;
      doc
        .font("Helvetica-Bold")
        .fontSize(11)
        .fillColor("#006400")
        .text("Service Notes", 40, y);

      y += 20;
      doc
        .font("Helvetica")
        .fontSize(9)
        .fillColor("black")
        .text(order.order_notes, 40, y, { width: 500, align: "justify" });
    }
    // ===== FOOTER =====
    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor("#666")
      .text("Thank you for choosing Hommlie Services!", 40, 530, {
        align: "center",
      })
      .text("www.hommlie.com", 40, 545, { align: "center" });

    // Finalize
    doc.end();
  } catch (err) {
    console.error("Report error:", err);
    res.status(500).json({ status: 0, message: "Failed to generate report" });
  }
};
