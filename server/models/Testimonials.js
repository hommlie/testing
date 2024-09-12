const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Testimonials extends Model {}

Testimonials.init({
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    feedback: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Testimonials',
    tableName: 'testimonials',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Testimonials;
