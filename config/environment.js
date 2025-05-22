const dotenv = require('dotenv');

// Cargar las variables de entorno dependiendo del entorno actual
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  dotenv.config({ path: './.env.development' });
} else if (env === 'production') {
  dotenv.config({ path: './.env.production' });
} else if (env === 'test') {
  dotenv.config({ path: './.env.test' });
}

module.exports = {
  port: process.env.PORT || 5000,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: process.env.DB_PORT || 5432,
  jwtSecret: process.env.JWT_SECRET || 'your_secret_key',
};
