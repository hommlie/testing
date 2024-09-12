const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Brand extends Model {}

Brand.init({
    brand_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1 
    }
}, {
    sequelize,
    modelName: 'Brand',
    tableName: 'brands', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Brand;
