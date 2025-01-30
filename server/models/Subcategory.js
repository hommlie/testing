const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Subcategory extends Model {}

Subcategory.init(
  {
    cat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subcategory_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    meta_title: {
      type: DataTypes.STRING,
    },
    meta_description: {
      type: DataTypes.STRING,
    },
    subcategory_title: {
      type: DataTypes.STRING,
    },
    subcategory_sub_title: {
      type: DataTypes.STRING,
    },
    specifications: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sub_cat_banner: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    total_reviews: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    avg_rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Subcategory",
    tableName: "subcategories",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Subcategory;
