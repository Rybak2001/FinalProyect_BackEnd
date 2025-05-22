const Joi = require('joi');

// Validar la creación de una nueva interacción de usuario
const createUserInteractionSchema = Joi.object({
  userId: Joi.number().required(),
  anchorPointId: Joi.number().required(),
  interactionType: Joi.string().valid('viewed', 'liked', 'visited').required(),
});

// Validar la actualización de una interacción de usuario
const updateUserInteractionSchema = Joi.object({
  interactionType: Joi.string().valid('viewed', 'liked', 'visited').optional(),
});

module.exports = {
  createUserInteractionSchema,
  updateUserInteractionSchema,
};
