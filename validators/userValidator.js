const Joi = require('joi');

// Validar el registro de un nuevo usuario
const createUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('admin', 'user').default('user'),
});

// Validar la actualización de un usuario
const updateUserSchema = Joi.object({
  username: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  role: Joi.string().valid('admin', 'user').optional(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};
