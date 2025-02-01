const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class SEOPage extends Model {}

SEOPage.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    banner: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
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
    modelName: "SEOPage",
    tableName: "seo_pages",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = SEOPage;
