require('dotenv').config();
const { Sequelize } = require('sequelize');
const { pg } = require('pg');
// Obtener la cadena de conexión desde las variables de entorno
const connectionString = process.env.DATABASE_URL;

// Crear una instancia de Sequelize usando la cadena de conexión
const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: console.log,  // Cambiar a true si quieres ver las consultas SQL
});

// Función para conectar a la base de datos
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente a PostgreSQL.');
    // Sincronizar los modelos con la base de datos
    await sequelize.sync({ force: false });  // { force: true } para sobrescribir las tablas
    //console.log('Tablas sincronizadas correctamente.');
    
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error.message);
    process.exit(1);  // Terminar el proceso si no se puede conectar a la base de datos
  }
};

// Exportar sequelize y la función connectDB
module.exports = {
  sequelize,
  connectDB,
};
