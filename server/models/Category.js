const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Category extends Model {}

Category.init({
    category_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sub_title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "default.png"
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1 
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
    modelName: 'Category',
    tableName: 'categories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Category;
