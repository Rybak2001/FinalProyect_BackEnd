const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const AnimalModel = require('./AnimalModel');

const AnchorPoint = sequelize.define('AnchorPoint', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    spatial_data: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    metadata: {
        type: DataTypes.JSON,
    },
    user_data: {
        type: DataTypes.JSON,
    },
    animal_model_url: {
        type: DataTypes.TEXT,
        references: {
            model: AnimalModel,
            key: 'model_url',
        },
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

module.exports = AnchorPoint;
