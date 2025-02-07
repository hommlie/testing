const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Category = require("./Category");

class LandingPage extends Model {}

LandingPage.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hero_image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    banner: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //   references: {
      //     model: Category,
      //     key: "id",
      //   },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
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
    meta_title: {
      type: DataTypes.STRING,
    },
    meta_description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "LandingPage",
    tableName: "landing_pages",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = LandingPage;
