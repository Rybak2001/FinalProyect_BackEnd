const UserInteraction = require('../models/userInteraction');

// Obtener todas las interacciones de usuarios
const getAllUserInteractions = async (limit, offset) => {
  return await UserInteraction.findAndCountAll({
    limit,
    offset,
  });
};

// Crear una nueva interacción de usuario
const createUserInteraction = async (interactionData) => {
  return await UserInteraction.create(interactionData);
};

// Obtener una interacción de usuario por ID
const getUserInteractionById = async (id) => {
  return await UserInteraction.findByPk(id);
};

// Actualizar una interacción de usuario
const updateUserInteraction = async (id, interactionData) => {
  const interaction = await getUserInteractionById(id);
  if (interaction) {
    return await interaction.update(interactionData);
  }
  return null;
};

// Eliminar una interacción de usuario
const deleteUserInteraction = async (id) => {
  const interaction = await getUserInteractionById(id);
  if (interaction) {
    await interaction.destroy();
    return true;
  }
  return false;
};

module.exports = {
  getAllUserInteractions,
  createUserInteraction,
  getUserInteractionById,
  updateUserInteraction,
  deleteUserInteraction,
};
