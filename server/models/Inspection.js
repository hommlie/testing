const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Inspection extends Model {}

Inspection.init({
    product_id: {
        type: DataTypes.INTEGER,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    time: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    width: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    length: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    sqft: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    total_amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Inspection',
    tableName: 'inspections',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  
module.exports = Inspection;