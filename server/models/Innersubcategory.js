const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Innersubcategory extends Model {}

Innersubcategory.init({
    cat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subcat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    innersubcategory_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    banner: {
        type: DataTypes.STRING,
        allowNull: true
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Innersubcategory',
    tableName: 'innersubcategories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Innersubcategory;
