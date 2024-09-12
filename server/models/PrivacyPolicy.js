const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PrivacyPolicy extends Model {}

PrivacyPolicy.init({
    privacypolicy_content: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'PrivacyPolicy',
    tableName: 'privacy_policies', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = PrivacyPolicy;