const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Slider extends Model {}

Slider.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title_font_size: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    title_font_color: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true 
    },
    description_font_size: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    description_font_color: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    text_align: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false 
    }
}, {
    sequelize,
    modelName: 'Slider',
    tableName: 'sliders', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
});

module.exports = Slider;
