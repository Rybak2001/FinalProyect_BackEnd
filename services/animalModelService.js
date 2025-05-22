const AnimalModel = require('../models/animalModel');

// Obtener todos los modelos de animales
const getAllAnimalModels = async (limit, offset) => {
  return await AnimalModel.findAll();
};

// Crear un nuevo modelo de animal
const createAnimalModel = async (animalModelData) => {
  return await AnimalModel.create(animalModelData);
};

// Obtener un modelo de animal por ID
const getAnimalModelById = async (id) => {
  return await AnimalModel.findByPk(id);
};

// Actualizar un modelo de animal
const updateAnimalModel = async (id, animalModelData) => {
  const animalModel = await getAnimalModelById(id);
  if (animalModel) {
    return await animalModel.update(animalModelData);
  }
  return null;
};

// Eliminar un modelo de animal
const deleteAnimalModel = async (id) => {
  const animalModel = await getAnimalModelById(id);
  if (animalModel) {
    await animalModel.destroy();
    return true;
  }
  return false;
};

module.exports = {
  getAllAnimalModels,
  createAnimalModel,
  getAnimalModelById,
  updateAnimalModel,
  deleteAnimalModel,
};
