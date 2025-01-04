const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        // unique: true
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    profile_pic: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "default.png"
    },
    login_type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "mobile"
    },
    referred_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    referral_code: {
        type: DataTypes.STRING,
        allowNull: true
    },
    referral_amount: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    // firebase: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    wallet: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // server_key: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    is_available: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    is_verified: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    facebook: {
        type: DataTypes.STRING,
        allowNull: true
    },
    instagram: {
        type: DataTypes.STRING,
        allowNull: true
    },
    google: {
        type: DataTypes.STRING,
        allowNull: true
    },
    youtube: {
        type: DataTypes.STRING,
        allowNull: true
    },
    twitter: {
        type: DataTypes.STRING,
        allowNull: true
    },
    google_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    store_address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    facebook_id: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'customers',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    defaultScope: {
        attributes: { exclude: ['password', 'remember_token'] }
    },
    scopes: {
        withPassword: {
            attributes: { }
        }
    }
});

module.exports = User;
