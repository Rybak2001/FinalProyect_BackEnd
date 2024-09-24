const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AnimalModel = sequelize.define('AnimalModel', {
    model_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    model_name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    model_url: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    thumbnail_url: {
        type: DataTypes.TEXT,
    },
    description: {
        type: DataTypes.TEXT,
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
    timestamps: false,
});

module.exports = AnimalModel;
