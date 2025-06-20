const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Banner extends Model {}

Banner.init({
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cat_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    positions: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING
    },
    alt_tag: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    image_title: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: true 
    },
}, {
    sequelize,
    modelName: 'Banner',
    tableName: 'banners',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
});

module.exports = Banner;
