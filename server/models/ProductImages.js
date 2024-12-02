const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProductImage extends Model {}

ProductImage.init({
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    alt_tag: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    image_title: {
        type: DataTypes.STRING,
        allowNull: true 
    },
}, {
    sequelize,
    modelName: 'ProductImage',
    tableName: 'product_images', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
});

module.exports = ProductImage;
