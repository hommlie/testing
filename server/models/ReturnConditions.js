const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ReturnConditions extends Model {}

ReturnConditions.init({
    return_conditions: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'ReturnConditions',
    tableName: 'return_conditions', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = ReturnConditions;