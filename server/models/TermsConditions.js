const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class TermsConditions extends Model {}

TermsConditions.init({
    termsconditions_content: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'TermsConditions',
    tableName: 'terms_conditions', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = TermsConditions;