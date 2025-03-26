const { Op } = require("sequelize");
const sequelize = require("../config/connection");
const { Coupons, Order } = require("../models");
const moment = require("moment");
const apiUrl = process.env.apiUrl;

exports.coupons = async (req, res) => {
  const { cat_id } = req.body;

  const now = new Date().toISOString().split("T")[0];

  try {
    // Base where conditions
    const baseWhere = {
      status: 1,
      start_date: { [Op.lte]: now },
      end_date: { [Op.gte]: now },
    };

    // If cat_id is provided, modify the where condition
    const whereCondition = cat_id
      ? {
          ...baseWhere,
          [Op.or]: [
            { cat_id: cat_id }, // Coupons with the specific category
            { cat_id: null }, // Coupons without any category
          ],
        }
      : {
          ...baseWhere,
          cat_id: null, // Only coupons without a category
        };

    const coupons = await Coupons.findAll({
      attributes: [
        "id",
        "coupon_name",
        "type",
        "percentage",
        "amount",
        [
          sequelize.fn("DATE_FORMAT", sequelize.col("start_date"), "%d-%m-%Y"),
          "start_date",
        ],
        [
          sequelize.fn("DATE_FORMAT", sequelize.col("end_date"), "%d-%m-%Y"),
          "end_date",
        ],
      ],
      where: whereCondition,
      order: [["id", "DESC"]],
      limit: 10,
    });

    if (coupons.length > 0) {
      return res
        .status(200)
        .json({ status: 1, message: "Success", data: coupons });
    } else {
      return res.status(200).json({ status: 0, message: "No data found" });
    }
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return res
      .status(500)
      .json({
        status: 0,
        message: "Failed to fetch coupons",
        error: error.message,
      });
  }
};

exports.applycoupons = async (req, res) => {
  const { coupon_name, user_id } = req.body;

  if (!coupon_name) {
    return res.status(400).json({ status: 0, message: "Please apply coupon" });
  }

  if (!user_id) {
    return res.status(400).json({ status: 0, message: "User id is required" });
  }

  try {
    const orderCount = await Order.count({ where: { user_id, coupon_name } });

    const coupons = await Coupons.findOne({
      attributes: [
        "quantity",
        "times",
        "end_date",
        "coupon_name",
        "type",
        "percentage",
        "amount",
      ],
      where: {
        status: 1,
        coupon_name,
      },
    });

    const now = moment().format("YYYY-MM-DD");

    if (coupons && coupons.end_date >= now) {
      if (coupons.quantity == 1) {
        if (orderCount > coupons.times) {
          return res.status(200).json({
            status: 0,
            message: "Coupon Usage Limit Has Been Reached",
          });
        } else {
          return res
            .status(200)
            .json({ status: 1, message: "Success", data: coupons });
        }
      } else {
        return res
          .status(200)
          .json({ status: 1, message: "Success", data: coupons });
      }
    } else {
      return res.status(200).json({
        status: 0,
        message: "This coupon code is invalid or has expired.",
      });
    }
  } catch (error) {
    console.error("Error applying coupon:", error);
    return res
      .status(500)
      .json({ status: 0, message: "Failed to apply coupon", error });
  }
};

exports.getCoupons = async (req, res) => {
  try {
    const couponsdata = await Coupons.findAll();

    if (couponsdata.length > 0) {
      return res
        .status(200)
        .json({ status: 1, message: "Success", data: couponsdata });
    } else {
      return res.status(200).json({ status: 0, message: "No data found" });
    }
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return res
      .status(500)
      .json({ status: 0, message: "Failed to fetch coupons", error });
  }
};
