const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Coupon extends Model {}

Coupon.init({
    coupon_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
    percentage: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true 
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    times: {
        type: DataTypes.INTEGER,
        allowNull: true 
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1 
    }
}, {
    sequelize,
    modelName: 'Coupon',
    tableName: 'coupons', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Coupon;
