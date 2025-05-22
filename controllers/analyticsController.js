const analyticsService = require('../services/analyticsService');

const getUsersByRole = async (req, res) => {
  try {
    const data = await analyticsService.getUsersByRole();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios por rol' });
  }
};

const getActiveUsersCount = async (req, res) => {
  try {
    const count = await analyticsService.getActiveUsersCount();
    res.json({ activeUsers: count });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener conteo de usuarios activos' });
  }
};

const getInteractionsByType = async (req, res) => {
  try {
    const data = await analyticsService.getInteractionsByType();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener interacciones por tipo' });
  }
};

const getActiveAnimalModels = async (req, res) => {
  try {
    const count = await analyticsService.getActiveAnimalModels();
    res.json({ activeAnimalModels: count });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener conteo de modelos de animales activos' });
  }
};

const getAnchorPointsByLocation = async (req, res) => {
  try {
    const data = await analyticsService.getAnchorPointsByLocation();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener puntos de anclaje por ubicación' });
  }
};
const getUsersStatus = async (req, res) => {
    try {
      const data = await analyticsService.getUsersStatus();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: `Error al obtener el estado de los usuarios: ${error.message}` });
    }
  };
  
  const getTotalInteractions = async (req, res) => {
    try {
      const data = await analyticsService.getTotalInteractions();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: `Error al obtener el total de interacciones: ${error.message}` });
    }
  };
  
  const getLastAccessDates = async (req, res) => {
    try {
      const data = await analyticsService.getLastAccessDates();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: `Error al obtener la última fecha de acceso: ${error.message}` });
    }
  };
  // Nuevo método
const getTotalCounts = async (req, res) => {
  try {
    const data = await analyticsService.getTotalCounts();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener conteo total de registros' });
  }
};
module.exports = {
  getUsersByRole,
  getActiveUsersCount,
  getInteractionsByType,
  getActiveAnimalModels,
  getAnchorPointsByLocation,getUsersStatus,
  getTotalInteractions,
  getLastAccessDates,
  getTotalCounts
};
