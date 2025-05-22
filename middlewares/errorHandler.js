const logger = require('../logs/logger');

// Middleware global para el manejo de errores
const errorHandler = (err, req, res, next) => {
  logger.error(err.message);  // Registrar el error en el log

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message,  // Solo enviar detalles del error si es necesario
  });
};

module.exports = errorHandler;
