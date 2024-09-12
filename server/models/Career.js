const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Career extends Model {}

Career.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    applyingFor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    resume: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Career',
    tableName: 'careers',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  
module.exports = Career;
