// Generar una respuesta estándar de éxito
const successResponse = (res, data, message = 'Operación exitosa') => {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  };
  
  // Generar una respuesta de error
  const errorResponse = (res, error, statusCode = 500) => {
    return res.status(statusCode).json({
      success: false,
      message: error.message || 'Error en el servidor',
      error: error.stack || '',
    });
  };
  
  // Generar una respuesta con paginación
  const paginatedResponse = (res, data, page, totalPages, totalItems, message = 'Operación exitosa') => {
    return res.status(200).json({
      success: true,
      message,
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
      },
    });
  };
  
  module.exports = {
    successResponse,
    errorResponse,
    paginatedResponse,
  };
  