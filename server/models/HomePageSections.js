const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Category = require("./Category");

class HomepageSection extends Model {}

HomepageSection.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM("hero", "offer"),
      defaultValue: "offer",
    },
    btn_text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    btn_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    alt_tag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "HomepageSection",
    tableName: "homepage_sections",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = HomepageSection;
