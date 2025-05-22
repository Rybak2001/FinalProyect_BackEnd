// Crear un objeto de paginación
const getPagination = (page, size) => {
    const limit = size ? +size : 10; // Número máximo de registros por página
    const offset = page ? page * limit : 0; // Desplazamiento para los registros
    return { limit, offset };
  };
  
  // Formatear la respuesta de paginación
  const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: items } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, items, totalPages, currentPage };
  };
  
  module.exports = {
    getPagination,
    getPagingData,
  };
  