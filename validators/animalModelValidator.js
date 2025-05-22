const Joi = require('joi');

// Validar la creación de un nuevo modelo de animal
const createAnimalModelSchema = Joi.object({
  name: Joi.string().required(),
  species: Joi.string().required(),
  modelURL: Joi.string().uri().required(),
  description: Joi.string().optional(),
});

// Validar la actualización de un modelo de animal
const updateAnimalModelSchema = Joi.object({
  name: Joi.string().optional(),
  species: Joi.string().optional(),
  modelURL: Joi.string().uri().optional(),
  description: Joi.string().optional(),
});

module.exports = {
  createAnimalModelSchema,
  updateAnimalModelSchema,
};
