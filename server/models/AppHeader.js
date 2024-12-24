const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class AppHeader extends Model {}

AppHeader.init({
    bg_color: {
        type: DataTypes.STRING,
    },
    text_color: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
    sub_text_color: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'AppHeader',
    tableName: 'app_header',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = AppHeader;
