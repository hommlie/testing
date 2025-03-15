const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const nodemailer = require('nodemailer');
const sequelize = require("../config/connection");
const { Op } = require("sequelize");
const axios = require("axios");
const { Settings, User, Wallet, Cart } = require("../models");
const Help = require("../models/Help");
// const { sendEmail } = require('../utils/email');
const apiUrl = process.env.apiUrl;
const profileApiUrl = process.env.profileApiUrl;
const MSG91_TEMPLATEID = process.env.MSG91_TEMPLATEID;
const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
const {
  sendWhatsAppNotification,
} = require("../utils/sendWhatsAppNotification");

exports.registerOrLogin = async (req, res) => {
  const { mobile } = req.body;

  try {
    if (!mobile) {
      return res.status(200).json({ status: 0, message: "Mobile is required" });
    }

    let user = await User.findOne({ where: { mobile } });

    var options = {
      method: "POST",
      url: "https://control.msg91.com/api/v5/otp",
      params: {
        otp_expiry: "3",
        template_id: "67d0065ad6fc055648017574",
        mobile: mobile,
        authkey: "403754ASWGpJz366b09ec2P1",
        realTimeResponse: "1",
      },
      headers: { "Content-Type": "application/JSON" },
    };

    axios
      .request(options)
      .then(function (response) {
        if (response.data.type === "success") {
          const newresponse = {
            status: 1,
            message: response.data,
            mobile: mobile,
            user_name: user ? user.name : null,
          };
          return res.status(200).json(newresponse);
        } else {
          return res
            .status(200)
            .json({ status: 0, message: response.data.message });
        }
      })
      .catch(function (error) {
        console.error(error);
        return res
          .status(200)
          .json({ status: 0, message: "OTP generation failed", error });
      });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 0, message: "Something went wrong", error });
  }
};

function generateReferralCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "HM";
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

exports.verifyOtp = async (req, res) => {
  const { mobile, otp, referral_code, name, app_token } = req.body;

  if (!mobile || !otp) {
    return res
      .status(200)
      .json({ status: 0, message: "Mobile and OTP are required" });
  }

  try {
    let user = await User.findOne({ where: { mobile } });

    let referringUser = null;
    if (referral_code) {
      referringUser = await User.findOne({ where: { referral_code } });
      if (!referringUser) {
        return res
          .status(200)
          .json({ status: 0, message: "Invalid referral code" });
      }
    }

    if (!user) {
      const newReferralCode = generateReferralCode();

      user = await User.create({
        name,
        mobile,
        profile_pic: "default.png",
        type: 2,
        login_type: "mobile",
        referred_id: referringUser ? referringUser.id : null,
        referral_code: newReferralCode,
        is_verified: 1,
        token: app_token,
      });
    }

    await User.update({ token: app_token }, { where: { id: user.id } });

    var options = {
      method: "GET",
      url: "https://control.msg91.com/api/v5/otp/verify",
      params: { otp: otp, mobile: mobile },
      headers: { authkey: "403754ASWGpJz366b09ec2P1" },
    };

    axios
      .request(options)
      .then(function (response) {
        if (response.data.type === "success") {
          sendWhatsAppNotification({
            campaignName: "Welcome Login Message",
            phoneNumber: user.mobile,
            userName: name,
            // mediaUrl,
            // mediaName,
            templateParams: [name],
          });
          const token = jwt.sign(
            {
              id: user.id,
              mobile: user.mobile,
              referred_id: user.referred_id,
              referral_code: user.referral_code,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30d" }
          );
          return res
            .status(200)
            .json({
              status: 1,
              message: response.data.message,
              token,
              user_id: user.id,
            });
        } else {
          return res
            .status(200)
            .json({ status: 0, message: response.data.message });
        }
      })
      .catch(function (error) {
        return res
          .status(200)
          .json({ status: 0, message: "OTP verification failed", error });
      });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 0, message: "Something went wrong", error });
  }
};

exports.reSendOtp = async (req, res) => {
  const { mobile } = req.body;

  if (!mobile) {
    return res
      .status(200)
      .json({ status: 0, message: "Mobile number is required" });
  }

  try {
    var options = {
      method: "GET",
      url: "https://control.msg91.com/api/v5/otp/retry",
      params: {
        authkey: "403754ASWGpJz366b09ec2P1",
        retrytype: "text",
        mobile: mobile,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        if (response.data.type === "success") {
          const newresponse = {
            status: 1,
            message: response.data.message,
            mobile: mobile,
          };
          return res.status(200).json(newresponse);
        } else {
          return res
            .status(200)
            .json({ status: 0, message: response.data.message });
        }
      })
      .catch(function (error) {
        console.error(error);
        return res
          .status(200)
          .json({ status: 0, message: "OTP resend failed", error });
      });
  } catch (error) {
    console.error(`Error in reSendOtp: ${error.message}`, error);
    return res
      .status(500)
      .json({ status: 0, message: "Something went wrong", error });
  }
};

exports.getProfile = async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ status: 0, message: "User ID is required" });
  }

  const user = await User.findOne({
    where: { id: user_id },
    attributes: [
      "id",
      "name",
      "email",
      "mobile",
      "facebook",
      "instagram",
      "google",
      "youtube",
      "twitter",
      [
        sequelize.fn(
          "CONCAT",
          sequelize.literal(`'${profileApiUrl}/images/profile/'`),
          sequelize.col("profile_pic")
        ),
        "profile_pic",
      ],
    ],
  });

  if (!user) {
    return res.status(400).json({ status: 0, message: "User not found" });
  }

  const cartItems = await Cart.findAll({
    attributes: ["product_id"],
    where: { user_id },
  });

  const wallet = await Wallet.findOne({ where: { user_id } });

  const userJson = user.toJSON();
  delete userJson.password;

  const contactInfo = await Settings.findOne({
    attributes: [
      "address",
      "contact",
      "email",
      "facebook",
      "twitter",
      "instagram",
      "linkedin",
    ],
  });

  return res.status(200).json({
    status: 1,
    message: "Profile data",
    data: userJson,
    contactInfo,
    cartLength: cartItems ? cartItems.length : 0,
    walletBalance: wallet ? wallet.balance : 0.0,
  });
};

exports.editProfile = async (req, res) => {
  // const user_id = req.params.id;
  const { user_id, name, email } = req.body;

  if (!user_id || !name) {
    return res
      .status(400)
      .json({ status: 0, message: "User ID and name are required" });
  }

  const updates = { name, email };

  if (req.file) {
    updates.profile_pic = req.file.filename;
  }

  await User.update(updates, { where: { id: user_id } });

  const user = await User.findOne({
    where: { id: user_id },
    attributes: [
      "id",
      "name",
      "email",
      "mobile",
      "facebook",
      "instagram",
      "google",
      "youtube",
      "twitter",
      [
        sequelize.fn(
          "CONCAT",
          sequelize.literal(`'${profileApiUrl}/images/profile/'`),
          sequelize.col("profile_pic")
        ),
        "profile_pic",
      ],
    ],
  });
  const userJson = user.toJSON();
  delete userJson.password;

  return res
    .status(200)
    .json({ status: 1, message: "Profile updated", data: userJson });
};

exports.help = async (req, res) => {
  const { user_id, first_name, last_name, mobile, email, subject, message } =
    req.body;

  if (
    !user_id ||
    !first_name ||
    !last_name ||
    !mobile ||
    !email ||
    !subject ||
    !message
  ) {
    return res
      .status(400)
      .json({ status: 0, message: "All fields are required" });
  }

  const help = await Help.create({
    user_id,
    first_name,
    last_name,
    mobile,
    email,
    subject,
    message,
  });

  if (help) {
    return res.status(200).json({ status: 1, message: "Success" });
  } else {
    return res.status(500).json({ status: 0, message: "Something went wrong" });
  }
};

exports.vendors = async (req, res) => {
  const vendors = await User.findAll({
    where: {
      type: 3,
      is_available: 1,
    },
    attributes: [
      "id",
      "name",
      [
        sequelize.literal(`CONCAT('${url}/images/profile/', profile_pic)`),
        "image_url",
      ],
    ],
    include: ["rattings"],
    order: [["id", "DESC"]],
    limit: 10,
  });

  if (vendors) {
    return res.status(200).json({ status: 1, message: "Success", vendors });
  } else {
    return res.status(500).json({ status: 0, message: "Something went wrong" });
  }
};
