const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Notification extends Model {}

Notification.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id'
        }
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'orders', 
            key: 'id'
        }
    },
    order_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    return_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    order_status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Notification',
    tableName: 'notifications', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
});

module.exports = Notification;
