const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ThoughtfulCurations extends Model {}

ThoughtfulCurations.init({
    video: {
        type: DataTypes.STRING,
    },
    thumbnail: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    modelName: 'ThoughtfulCurations',
    tableName: 'thoughtful_curations', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
});

module.exports = ThoughtfulCurations;
