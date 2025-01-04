const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User'); 

class Wallet extends Model {}

Wallet.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.BIGINT.UNSIGNED, 
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    balance: {
        type: DataTypes.FLOAT,
        defaultValue: 0.00,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Wallet',
    tableName: 'wallet',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Wallet;
