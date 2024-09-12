const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Order extends Model {}

Order.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id'
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products', 
            key: 'id'
        }
    },
    vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    order_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    attribute: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    variation: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    tax: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0
    },
    shipping_cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0
    },
    coupon_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    discount_amount: {
        type: DataTypes.STRING,
        allowNull: true
    },
    order_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    order_status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    order_notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    payment_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'payments',
            key: 'id'
        }
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    landmark: {
        type: DataTypes.STRING,
        allowNull: true
    },
    street_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pincode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    latitude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    longitude: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desired_time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desired_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
});

module.exports = Order;
