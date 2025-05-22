const UserInteractionService = require('../services/userInteractionService');


// Obtener todas las interacciones de usuario
const getAllUserInteractions = async (req, res, next) => {
  try {
    const interactions = await UserInteractionService.getAllUserInteractions();
    res.status(200).json(interactions);
  } catch (error) {
    next(error);
  }
};

// Crear una nueva interacción de usuario
const createUserInteraction = async (req, res, next) => {
  try {
    const newInteraction = await UserInteractionService.createUserInteraction(req.body);
    res.status(201).json(newInteraction);
  } catch (error) {
    next(error);
  }
};

// Obtener una interacción de usuario por ID
const getUserInteractionById = async (req, res, next) => {
  try {
    const interaction = await UserInteractionService.getUserInteractionById(req.params.id);
    if (!interaction) {
      return res.status(404).json({ message: 'User Interaction not found' });
    }
    res.status(200).json(interaction);
  } catch (error) {
    next(error);
  }
};

// Actualizar una interacción de usuario
const updateUserInteraction = async (req, res, next) => {
  try {
    const updatedInteraction = await UserInteractionService.updateUserInteraction(req.params.id, req.body);
    if (!updatedInteraction) {
      return res.status(404).json({ message: 'User Interaction not found' });
    }
    res.status(200).json(updatedInteraction);
  } catch (error) {
    next(error);
  }
};

// Eliminar una interacción de usuario
const deleteUserInteraction = async (req, res, next) => {
  try {
    const result = await UserInteractionService.deleteUserInteraction(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'User Interaction not found' });
    }
    res.status(200).json({ message: 'User Interaction deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUserInteractions,
  createUserInteraction,
  getUserInteractionById,
  updateUserInteraction,
  deleteUserInteraction,
};
