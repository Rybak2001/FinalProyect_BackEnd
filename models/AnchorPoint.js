const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const AnimalModel = require('./animalModel');

const AnchorPoint = sequelize.define('AnchorPoint', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  anchorCode: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: false,
  },
  longitude: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: false,
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
  animalModelId: {
    type: DataTypes.UUID,
    allowNull: true, // puede estar vacío si no hay modelo asignado
    references: {
      model: 'AnimalModels',
      key: 'id',
    },
  },  
}, {
  timestamps: false, // Desactiva la creación automática de createdAt y updatedAt
});
// Relación aquí mismo
AnchorPoint.belongsTo(AnimalModel, { foreignKey: 'animalModelId', as: 'animalModel' });

module.exports = AnchorPoint;
