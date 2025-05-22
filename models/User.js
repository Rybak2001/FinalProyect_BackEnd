const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Importación correcta

// Definir el modelo User
const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
    validate: {
      isEmail: true,
    },
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_role: {
    type: DataTypes.ENUM('admin', 'user'),
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  first_lastname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  second_lastname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_card_number: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
  profile_picture_url: {
    type: DataTypes.STRING,
    allowNull: true, // Puede estar vacío si el usuario no subió una imagen
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

// Exportar el modelo User
module.exports = User;
