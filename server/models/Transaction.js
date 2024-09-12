const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Transaction extends Model {}

Transaction.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    order_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    wallet: {
        type: DataTypes.STRING,
        allowNull: false
    },
    payment_id: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    transaction_type: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    username: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
    timestamps: true,
    createdAt: 'created_at', 
    updatedAt: 'updated_at'
});

module.exports = Transaction;
