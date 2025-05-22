const AnchorPoint = require('../models/anchorPoint');

// Obtener todos los puntos de anclaje
const getAllAnchorPoints = async (limit, offset) => {
  return await AnchorPoint.findAll();
};

// Crear un nuevo punto de anclaje
const createAnchorPoint = async (obj) => {
  try {
    const { id, ...anchorPointData } = obj;
    return await AnchorPoint.create(anchorPointData);
  } catch (error) {
    throw console.log(error)
  }
  
};

// Obtener un punto de anclaje por ID
const getAnchorPointById = async (id) => {
  return await AnchorPoint.findByPk(id);
};

// Actualizar un punto de anclaje
const updateAnchorPoint = async (id, anchorPointData) => {
  const anchorPoint = await getAnchorPointById(id);
  if (anchorPoint) {
    return await anchorPoint.update(anchorPointData);
  }
  return null;
};

// Eliminar un punto de anclaje
const deleteAnchorPoint = async (id) => {
  const anchorPoint = await getAnchorPointById(id);
  if (anchorPoint) {
    await anchorPoint.destroy();
    return true;
  }
  return false;
};

const AnimalModel = require('../models/animalModel');

const linkAnimalModel = async (anchorPointId, animalModelId) => {
  const anchorPoint = await AnchorPoint.findByPk(anchorPointId);
  const animalModel = await AnimalModel.findByPk(animalModelId);

  if (!anchorPoint || !animalModel) {
    return null;
  }

  anchorPoint.animalModelId = animalModel.id;
  await anchorPoint.save();

  return anchorPoint;
};


module.exports = {
  getAllAnchorPoints,
  createAnchorPoint,
  getAnchorPointById,
  updateAnchorPoint,
  deleteAnchorPoint,
  linkAnimalModel,
};
