const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class ListingForm extends Model {}

ListingForm.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    businessName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [10, 10], 
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    pincode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    area: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    landmark: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('active', 'pending', 'rejected'),
        defaultValue: 'pending'
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'ListingForm',
    tableName: 'listing_forms',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = ListingForm;