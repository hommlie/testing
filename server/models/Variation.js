const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Variation extends Model {}

Variation.init({
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    attribute_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'attributes',
            key: 'id'
        }
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    discounted_variation_price: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    variation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    variation_interval: {
        type: DataTypes.STRING,
        allowNull: true
    },
    variation_times: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    total_reviews: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    avg_rating: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Variation',
    tableName: 'variations', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
});

module.exports = Variation;
