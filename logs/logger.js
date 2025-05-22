const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors } = format;

// Formato personalizado para los logs
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

// Crear el logger de Winston
const logger = createLogger({
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),  // Captura y registra el stack trace
    logFormat
  ),
  transports: [
    // Archivo para los errores
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Archivo para los logs generales
    new transports.File({ filename: 'logs/app.log', level: 'info' }),
  ],
});

// También mostrar en la consola si estamos en desarrollo
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple(),
  }));
}

module.exports = logger;
