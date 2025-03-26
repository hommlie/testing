const sequelize = require("../config/connection");
const { Settings } = require("../models");
const apiUrl = process.env.apiUrl;

exports.settings = async (req, res) => {
  try {
    const settings = await Settings.findAll({
      attributes: [
        "currency",
        "currency_position",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/settings/', logo)`
          ),
          "logo",
        ],
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/settings/', favicon)`
          ),
          "favicon",
        ],
        "copyright",
        "address",
        "contact",
        "email",
        "site_title",
        "meta_title",
        "meta_description",
        [
          sequelize.literal(
            `CONCAT('${apiUrl}/storage/app/public/images/settings/', og_image)`
          ),
          "og_image",
        ],
        "facebook",
        "twitter",
        "instagram",
        "linkedin",
        "youtube",
        "locations",
      ],
    });

    if (settings.length > 0) {
      return res.status(200).json({ status: 1, message: "Success", settings });
    } else {
      return res.status(200).json({ status: 0, message: "No data found" });
    }
  } catch (error) {
    console.error("Error fetching settings:", error);
    return res
      .status(500)
      .json({ status: 0, message: "Failed to fetch settings", error });
  }
};

exports.getAppVersions = async (req, res) => {
  try {
    const appVersions = await Settings.findOne({
      attributes: ["version_code_user", "version_code_partner"],
    });

    if (appVersions.length > 0) {
      return res
        .status(200)
        .json({ status: 1, message: "Success", appVersions });
    } else {
      return res.status(200).json({ status: 0, message: "No data found" });
    }
  } catch (error) {
    console.error("Error fetching app versions:", error);
    return res
      .status(500)
      .json({ status: 0, message: "Failed to fetch app versions", error });
  }
};
