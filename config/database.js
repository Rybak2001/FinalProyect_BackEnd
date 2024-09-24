require('dotenv').config();
const pg = require('pg');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectModule: pg
  });

sequelize.authenticate()
    .then(() => {
        console.log('Conexión establecida correctamente.');
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });

module.exports = sequelize;