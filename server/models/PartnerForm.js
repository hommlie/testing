const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class PartnerForm extends Model {}

PartnerForm.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'PartnerForm',
    tableName: 'partnerforms',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  
module.exports = PartnerForm;
