const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Attribute extends Model {}

Attribute.init({
    attribute: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Attribute',
    tableName: 'attributes',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
});

module.exports = Attribute;
