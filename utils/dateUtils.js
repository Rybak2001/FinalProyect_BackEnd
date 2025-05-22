const moment = require('moment');

// Formatear una fecha en un formato específico
const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(date).format(format);
};

// Comparar dos fechas
const compareDates = (date1, date2) => {
  return moment(date1).isSameOrBefore(date2);
};

// Obtener la fecha actual en formato UTC
const getCurrentUTCDate = () => {
  return moment.utc().format('YYYY-MM-DD HH:mm:ss');
};

module.exports = {
  formatDate,
  compareDates,
  getCurrentUTCDate,
};
