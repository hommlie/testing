const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class About extends Model {}

About.init({
    about_content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'About',
    tableName: 'abouts', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
});

module.exports = About;
