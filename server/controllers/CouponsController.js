// // controllers/couponsController.js
// const { Op } = require("sequelize");
// const sequelize = require("../config/connection");
// const { Coupons, Order } = require("../models");
// const moment = require("moment");

// const FIRST_TIME_COUPON = "HOMMLIEFIRST"; // Flat ₹200, new-user only

// exports.coupons = async (req, res) => {
//   const { cat_id, user_id } = req.body; // accept user_id to filter first-time coupon
//   const now = new Date().toISOString().split("T")[0];

//   try {
//     const baseWhere = {
//       status: 1,
//       start_date: { [Op.lte]: now },
//       end_date: { [Op.gte]: now },
//     };

//     const whereCondition = cat_id
//       ? { ...baseWhere, [Op.or]: [{ cat_id }, { cat_id: null }] }
//       : { ...baseWhere, cat_id: null };

//     let coupons = await Coupons.findAll({
//       attributes: [
//         "id",
//         "coupon_name",
//         "type",
//         "percentage",
//         "amount",
//         [
//           sequelize.fn("DATE_FORMAT", sequelize.col("start_date"), "%d-%m-%Y"),
//           "start_date",
//         ],
//         [
//           sequelize.fn("DATE_FORMAT", sequelize.col("end_date"), "%d-%m-%Y"),
//           "end_date",
//         ],
//       ],
//       where: whereCondition,
//       order: [["id", "DESC"]],
//       limit: 10,
//     });

//     // Hide HOMMLIEFIRST for existing customers (any prior order)
//     if (user_id) {
//       const priorOrders = await Order.count({ where: { user_id } });
//       if (priorOrders > 0) {
//         coupons = coupons.filter(
//           (c) => (c.coupon_name || "").toUpperCase() !== FIRST_TIME_COUPON
//         );
//       }
//     }

//     if (coupons.length > 0) {
//       return res.status(200).json({ status: 1, message: "Success", data: coupons });
//     } else {
//       return res.status(200).json({ status: 0, message: "No data found" });
//     }
//   } catch (error) {
//     console.error("Error fetching coupons:", error);
//     return res.status(500).json({
//       status: 0,
//       message: "Failed to fetch coupons",
//       error: error.message,
//     });
//   }
// };

// exports.applycoupons = async (req, res) => {
//   const { coupon_name, user_id /* , total_amount */ } = req.body;

//   if (!coupon_name) {
//     return res.status(400).json({ status: 0, message: "Please apply coupon" });
//   }
//   if (!user_id) {
//     return res.status(400).json({ status: 0, message: "User id is required" });
//   }

//   try {
//     const normalizedName = String(coupon_name).toUpperCase();

//     // New-user only rule for HOMMLIEFIRST
//     const userTotalOrders = await Order.count({ where: { user_id } });
//     if (normalizedName === FIRST_TIME_COUPON && userTotalOrders > 0) {
//       return res.status(200).json({
//         status: 0,
//         message: "This coupon is only for new users on their first booking.",
//       });
//     }

//     // How many orders used this coupon already (per-user)
//     const orderCountWithThisCoupon = await Order.count({
//       where: { user_id, coupon_name },
//     });

//     const coupon = await Coupons.findOne({
//       attributes: [
//         "id",
//         "coupon_name",
//         "type",
//         "percentage",
//         "amount",
//         "quantity",
//         "times",
//         "end_date",
//         "status",
//       ],
//       where: { status: 1, coupon_name },
//     });

//     const now = moment().format("YYYY-MM-DD");

//     if (!coupon || coupon.end_date < now) {
//       return res.status(200).json({
//         status: 0,
//         message: "This coupon code is invalid or has expired.",
//       });
//     }

//     // Usage gating by quantity/times (keep existing semantics)
//     if (coupon.quantity == 1) {
//       if (orderCountWithThisCoupon > coupon.times) {
//         return res.status(200).json({
//           status: 0,
//           message: "Coupon usage limit has been reached.",
//         });
//       }
//     }

//     // 🔒 STRICT: prefer flat amount if present; otherwise percentage
//     // If you pass total_amount from FE you can clamp here; otherwise FE will clamp.
//     // const total = Number(total_amount || 0);
//     let rawDiscount = 0;

//     if (coupon.amount != null && coupon.amount !== "") {
//       // Flat ₹ amount — this is what HOMMLIEFIRST uses (₹200)
//       rawDiscount = Number(coupon.amount);
//     } else if (coupon.percentage != null && coupon.percentage !== "") {
//       // Percentage (for other coupons, if any)
//       // rawDiscount = total ? (total * Number(coupon.percentage)) / 100 : 0;
//       // If you don't pass total_amount, FE will compute/clamp with its current total.
//       rawDiscount = 0; // leave as 0 so FE will compute with its own total
//     }

//     // Return coupon + a calculatedDiscount hint (flat value known now; percent left 0)
//     return res.status(200).json({
//       status: 1,
//       message: "Success",
//       data: {
//         ...coupon.toJSON(),
//         calculatedDiscount: rawDiscount, // for HOMMLIEFIRST this will be 200
//       },
//     });
//   } catch (error) {
//     console.error("Error applying coupon:", error);
//     return res
//       .status(500)
//       .json({ status: 0, message: "Failed to apply coupon", error });
//   }
// };

// exports.getCoupons = async (req, res) => {
//   try {
//     const couponsdata = await Coupons.findAll();
//     if (couponsdata.length > 0) {
//       return res
//         .status(200)
//         .json({ status: 1, message: "Success", data: couponsdata });
//     } else {
//       return res.status(200).json({ status: 0, message: "No data found" });
//     }
//   } catch (error) {
//     console.error("Error fetching coupons:", error);
//     return res
//       .status(500)
//       .json({ status: 0, message: "Failed to fetch coupons", error });
//   }
// };


// controllers/couponsController.js
const { Op } = require("sequelize");
const sequelize = require("../config/connection");
const { Coupons, Order } = require("../models");
const moment = require("moment");

const FIRST_TIME_COUPON = "HOMMLIEFIRST"; // Flat ₹200, new-user only

// LIST: now supports `is_default` behavior and server-side search
exports.coupons = async (req, res) => {
  const { cat_id, user_id, query } = req.body; // query is optional search text
  const searchTerm = (query || "").trim();
  const now = new Date().toISOString().split("T")[0];

  try {
    const baseWhere = {
      status: 1,
      start_date: { [Op.lte]: now },
      end_date: { [Op.gte]: now },
    };

    // Category filter (same as before)
    const catFilter = cat_id
      ? { [Op.or]: [{ cat_id }, { cat_id: null }] }
      : { cat_id: null };

    // Visibility:
    // - No search → show only defaults (is_default = 1)
    // - With search → match by name (include both default and non-default)
    const visibilityFilter = !searchTerm
      ? { is_default: 1 }
      : { coupon_name: { [Op.substring]: searchTerm } };

    const whereCondition = { ...baseWhere, ...catFilter, ...visibilityFilter };

    let coupons = await Coupons.findAll({
      attributes: [
        "id",
        "coupon_name",
        "type",
        "percentage",
        "amount",
        "is_default",
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

    // Hide HOMMLIEFIRST for existing customers ONLY on the normal (non-search) list.
    if (user_id && !searchTerm) {
      const priorOrders = await Order.count({ where: { user_id } });
      if (priorOrders > 0) {
        coupons = coupons.filter(
          (c) => (c.coupon_name || "").toUpperCase() !== FIRST_TIME_COUPON
        );
      }
    }

    if (coupons.length > 0) {
      return res
        .status(200)
        .json({ status: 1, message: "Success", data: coupons });
    } else {
      return res.status(200).json({ status: 0, message: "No data found" });
    }
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return res.status(500).json({
      status: 0,
      message: "Failed to fetch coupons",
      error: error.message,
    });
  }
};

// APPLY: unchanged (still enforces new-user rule and usage gating)
exports.applycoupons = async (req, res) => {
  const { coupon_name, user_id /* , total_amount */ } = req.body;

  if (!coupon_name) {
    return res.status(400).json({ status: 0, message: "Please apply coupon" });
  }
  if (!user_id) {
    return res.status(400).json({ status: 0, message: "User id is required" });
  }

  try {
    const normalizedName = String(coupon_name).toUpperCase();

    // New-user only rule for HOMMLIEFIRST
    const userTotalOrders = await Order.count({ where: { user_id } });
    if (normalizedName === FIRST_TIME_COUPON && userTotalOrders > 0) {
      return res.status(200).json({
        status: 0,
        message: "This coupon is only for new users on their first booking.",
      });
    }

    // How many orders used this coupon already (per-user)
    const orderCountWithThisCoupon = await Order.count({
      where: { user_id, coupon_name },
    });

    const coupon = await Coupons.findOne({
      attributes: [
        "id",
        "coupon_name",
        "type",
        "percentage",
        "amount",
        "quantity",
        "times",
        "end_date",
        "status",
      ],
      where: { status: 1, coupon_name },
    });

    const now = moment().format("YYYY-MM-DD");

    if (!coupon || coupon.end_date < now) {
      return res.status(200).json({
        status: 0,
        message: "This coupon code is invalid or has expired.",
      });
    }

    // Usage gating by quantity/times (keep existing semantics)
    if (coupon.quantity == 1) {
      if (orderCountWithThisCoupon > coupon.times) {
        return res.status(200).json({
          status: 0,
          message: "Coupon usage limit has been reached.",
        });
      }
    }

    // Prefer flat amount if present; otherwise percentage (computed on FE)
    let rawDiscount = 0;
    if (coupon.amount != null && coupon.amount !== "") {
      rawDiscount = Number(coupon.amount);
    } else if (coupon.percentage != null && coupon.percentage !== "") {
      // If you pass total_amount, compute here; otherwise FE will compute & clamp
      rawDiscount = 0;
    }

    return res.status(200).json({
      status: 1,
      message: "Success",
      data: {
        ...coupon.toJSON(),
        calculatedDiscount: rawDiscount, // for flat coupons this will be > 0
      },
    });
  } catch (error) {
    console.error("Error applying coupon:", error);
    return res
      .status(500)
      .json({ status: 0, message: "Failed to apply coupon", error });
  }
};

// (unchanged) fetch-all admin util if you use it elsewhere
exports.getCoupons = async (req, res) => {
  try {
    // Support optional search via query param `q`. If absent, return only default-visible coupons.
    const q = (req.query.q || "").trim();
    const where = q
      ? { coupon_name: { [Op.substring]: q } }
      : { is_default: 1 };

    const couponsdata = await Coupons.findAll({ where });
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
