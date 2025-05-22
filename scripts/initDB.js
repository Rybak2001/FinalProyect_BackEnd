const { sequelize } = require('../config/database');
const AnchorPoint = require('../models/anchorPoint');
const AnimalModel = require('../models/AnimalModel');
const User = require('../models/User');
const UserInteraction = require('../models/UserInteraction');

// Función para inicializar la base de datos
const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to PostgreSQL has been established successfully.');

    // Sincronizar todos los modelos (force: true elimina y recrea las tablas)
    await sequelize.sync({ force: true });
    console.log('Database & tables created!');

    process.exit(0);  // Salir del proceso exitosamente
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);  // Salir del proceso con error
  }
};

initDB();
