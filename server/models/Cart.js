const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Cart extends Model {}

Cart.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    variation: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    variation_name: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    attribute: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    attribute_name: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    shipping_cost: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tax: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: true 
    }
}, {
    sequelize,
    modelName: 'Cart',
    tableName: 'carts',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
});

module.exports = Cart;
