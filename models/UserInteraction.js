const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const AnchorPoint = require('./AnchorPoint');

const UserInteraction = sequelize.define('UserInteraction', {
    interaction_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'user_id',
        },
    },
    anchor_id: {
        type: DataTypes.UUID,
        references: {
            model: AnchorPoint,
            key: 'id',
        },
    },
    interaction_type: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
});

module.exports = UserInteraction;
