const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Subcategory extends Model {}

Subcategory.init({
    cat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subcategory_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false 
    }
}, {
    sequelize,
    modelName: 'Subcategory',
    tableName: 'subcategories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
});

module.exports = Subcategory;
