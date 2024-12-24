const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Ratting extends Model {}

Ratting.init({
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vendor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: 'users',
        //     key: 'id'
        // }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: 'users', 
        //     key: 'id'
        // }
    },
    emp_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    emp_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ratting: { 
        type: DataTypes.FLOAT,
        allowNull: false
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'Ratting',
    tableName: 'rattings', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Ratting;
