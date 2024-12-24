const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Ratting = require('./Ratting');

class ReviewImage extends Model {}

ReviewImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    review_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Ratting,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'ReviewImage',
    tableName: 'review_images',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = ReviewImage;
