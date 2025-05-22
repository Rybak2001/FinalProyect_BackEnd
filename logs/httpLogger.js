const morgan = require('morgan');
const logger = require('./logger');

// Crear un formato de logs para HTTP requests
const httpLogger = morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim()),  // Log HTTP requests como "info"
  },
});

module.exports = httpLogger;
