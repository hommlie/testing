const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
const Wallet = require('./Wallet');

class WalletTransaction extends Model {}

WalletTransaction.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED, 
        primaryKey: true,
        autoIncrement: true,
    },
    wallet_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
            model: Wallet,
            key: 'id',
        },
    },
    transaction_type: {
        type: DataTypes.ENUM('credit', 'debit'),
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'WalletTransaction',
    tableName: 'wallet_transaction',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = WalletTransaction;
