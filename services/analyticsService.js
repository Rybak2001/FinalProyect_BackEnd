const { Sequelize } = require('sequelize'); // Asegúrate de importar Sequelize
const User = require('../models/user');
const UserInteraction = require('../models/userInteraction');
const AnchorPoint = require('../models/anchorPoint');
const AnimalModel = require('../models/animalModel');

const getUsersByRole = async () => {
  try {
    return await User.findAll({
      attributes: ['user_role', [Sequelize.fn('COUNT', Sequelize.col('user_role')), 'count']],
      group: ['user_role'],
      where: { active: true },
    });
  } catch (error) {
    console.error('Error in getUsersByRole:', error.message);
    throw new Error(`Failed to get users by role: ${error.message}`);
  }
};

const getActiveUsersCount = async () => {
  try {
    return await User.count({
      where: { active: true },
    });
  } catch (error) {
    console.error('Error in getActiveUsersCount:', error.message);
    throw new Error(`Failed to get active users count: ${error.message}`);
  }
};

const getInteractionsByType = async () => {
  try {
    return await UserInteraction.findAll({
      attributes: ['interactionType', [Sequelize.fn('COUNT', Sequelize.col('interactionType')), 'count']],
      group: ['interactionType'],
    });
  } catch (error) {
    console.error('Error in getInteractionsByType:', error.message);
    throw new Error(`Failed to get interactions by type: ${error.message}`);
  }
};

const getActiveAnimalModels = async () => {
  try {
    return await AnimalModel.count({
      where: { active: true },
    });
  } catch (error) {
    console.error('Error in getActiveAnimalModels:', error.message);
    throw new Error(`Failed to get active animal models: ${error.message}`);
  }
};

const getAnchorPointsByLocation = async () => {
  try {
    return await AnchorPoint.findAll({
      attributes: ['latitude', 'longitude', 'name', 'description'],
      where: { active: true },
    });
  } catch (error) {
    console.error('Error in getAnchorPointsByLocation:', error.message);
    throw new Error(`Failed to get anchor points by location: ${error.message}`);
  }
};

const getUsersStatus = async () => {
    try {
      return await User.findAll({
        attributes: ['user_role', [Sequelize.fn('COUNT', Sequelize.col('user_role')), 'count']],
        group: ['user_role'],
        where: { active: true },
      });
    } catch (error) {
      console.error('Error in getUsersStatus:', error.message);
      throw new Error(`Failed to get users status: ${error.message}`);
    }
  };
  
  const getTotalInteractions = async () => {
    try {
      const totalInteractions = await UserInteraction.count();
      return { totalInteractions };
    } catch (error) {
      console.error('Error in getTotalInteractions:', error.message);
      throw new Error(`Failed to get total interactions: ${error.message}`);
    }
  };
  
  const getLastAccessDates = async () => {
    try {
      const lastAccesses = await UserInteraction.findAll({
        attributes: ['userId', [Sequelize.fn('MAX', Sequelize.col('created_at')), 'lastAccessDate']],
        group: ['userId'],
        order: [[Sequelize.fn('MAX', Sequelize.col('created_at')), 'DESC']]
      });
      return lastAccesses;
    } catch (error) {
      console.error('Error in getLastAccessDates:', error.message);
      throw new Error(`Failed to get last access dates: ${error.message}`);
    }
  };
// Nuevos métodos para obtener conteos totales de registros en cada modelo
const getTotalCounts = async () => {
  try {
    const userCount = await User.count();
    const interactionCount = await UserInteraction.count();
    const anchorPointCount = await AnchorPoint.count();
    const animalModelCount = await AnimalModel.count();

    return {
      userCount,
      interactionCount,
      anchorPointCount,
      animalModelCount,
    };
  } catch (error) {
    console.error('Error in getTotalCounts:', error.message);
    throw new Error(`Failed to get total counts: ${error.message}`);
  }
};
module.exports = {
  getUsersByRole,
  getActiveUsersCount,
  getInteractionsByType,
  getActiveAnimalModels,
  getAnchorPointsByLocation,getUsersStatus,getTotalInteractions,getLastAccessDates,
  getTotalCounts
};
