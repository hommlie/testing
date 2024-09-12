const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Payment extends Model {}

Payment.init({
    payment_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    test_public_key: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    test_secret_key: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    live_public_key: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    live_secret_key: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    environment: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Payment',
    tableName: 'payments', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Payment;
