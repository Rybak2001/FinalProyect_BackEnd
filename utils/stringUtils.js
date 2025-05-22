// Capitalizar la primera letra de una palabra
const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  // Convertir un string a slug (útil para URLs amigables)
  const generateSlug = (string) => {
    return string
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')  // Elimina caracteres no deseados
      .replace(/[\s_-]+/g, '-')  // Reemplaza espacios y guiones bajos por guiones
      .replace(/^-+|-+$/g, '');  // Elimina guiones al inicio y al final
  };
  
  // Limitar la longitud de un string
  const limitString = (string, maxLength) => {
    if (string.length <= maxLength) return string;
    return string.substring(0, maxLength) + '...';
  };
  
  module.exports = {
    capitalizeFirstLetter,
    generateSlug,
    limitString,
  };
  