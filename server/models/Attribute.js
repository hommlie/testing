const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Attribute extends Model {}

Attribute.init(
  {
    attribute: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specifications: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
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
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_recommended: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "Attribute",
    tableName: "attributes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Attribute;
