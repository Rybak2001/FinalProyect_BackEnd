const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    user_role: {
        type: DataTypes.ENUM('web', 'mobile', 'admin', 'editor'), // Specify the roles
        allowNull: false,
        defaultValue: 'web', // Default role is 'web'
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    hooks: {
        beforeCreate: async (user) => {
            if (user.password_hash) {
                const salt = await bcrypt.genSalt(10);
                user.password_hash = await bcrypt.hash(user.password_hash, salt);
            }
        },
        beforeUpdate: async (user) => {
            if (user.password_hash) {
                const salt = await bcrypt.genSalt(10);
                user.password_hash = await bcrypt.hash(user.password_hash, salt);
            }
        }
    },
    timestamps: false,
});

User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password_hash);
};

module.exports = User;
