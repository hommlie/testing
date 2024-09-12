const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Employee extends Model {}

Employee.init({
    emp_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    emp_phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    emp_email: {
        type: DataTypes.STRING,
        allowNull: true,
    },

}, {
    sequelize,
    modelName: 'Employee',
    tableName: 'employees',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Employee;
