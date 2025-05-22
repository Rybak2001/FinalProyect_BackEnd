const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user');
const AnchorPoint = require('./anchorPoint');

const UserInteraction = sequelize.define('UserInteraction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  interactionType: {
    type: DataTypes.STRING,
    allowNull: false,  // Tipo de interacción, por ejemplo, "viewed", "liked", "visited"
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, // Por defecto activo será 'true'
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
  timestamps: false, // Desactiva la creación automática de createdAt y updatedAt
});

// Definir las relaciones entre los modelos
UserInteraction.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
UserInteraction.belongsTo(AnchorPoint, { foreignKey: 'anchorPointId', onDelete: 'CASCADE' });

module.exports = UserInteraction;
