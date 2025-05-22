const AnchorPointService = require('../services/anchorPointService');

// Obtener todos los puntos de anclaje
const getAllAnchorPoints = async (req, res, next) => {
  try {
    const anchorPoints = await AnchorPointService.getAllAnchorPoints();
    res.status(200).json(anchorPoints);
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo punto de anclaje
const createAnchorPoint = async (req, res, next) => {
  try {
    const newAnchorPoint = await AnchorPointService.createAnchorPoint(req.body);
    res.status(201).json(newAnchorPoint);
  } catch (error) {
    next(error);
  }
};

// Obtener un punto de anclaje por ID
const getAnchorPointById = async (req, res, next) => {
  try {
    const anchorPoint = await AnchorPointService.getAnchorPointById(req.params.id);
    if (!anchorPoint) {
      return res.status(404).json({ message: 'Anchor Point not found' });
    }
    res.status(200).json(anchorPoint);
  } catch (error) {
    next(error);
  }
};

// Actualizar un punto de anclaje
const updateAnchorPoint = async (req, res, next) => {
  try {
    const updatedAnchorPoint = await AnchorPointService.updateAnchorPoint(req.params.id, req.body);
    if (!updatedAnchorPoint) {
      return res.status(404).json({ message: 'Anchor Point not found' });
    }
    res.status(200).json(updatedAnchorPoint);
  } catch (error) {
    next(error);
  }
};

// Eliminar un punto de anclaje
const deleteAnchorPoint = async (req, res, next) => {
  try {
    const result = await AnchorPointService.deleteAnchorPoint(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Anchor Point not found' });
    }
    res.status(200).json({ message: 'Anchor Point deleted successfully' });
  } catch (error) {
    next(error);
  }
};
//ENlazar
const linkAnimalModelToAnchorPoint = async (req, res, next) => {
  const { id, modelId } = req.params;
  try {
    const updated = await AnchorPointService.linkAnimalModel(id, modelId);
    if (!updated) {
      return res.status(404).json({ message: 'No se pudo vincular. Ancla o Modelo no encontrado.' });
    }
    res.status(200).json({ message: 'Modelo vinculado correctamente', anchorPoint: updated });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllAnchorPoints,
  createAnchorPoint,
  getAnchorPointById,
  updateAnchorPoint,
  deleteAnchorPoint,
  linkAnimalModelToAnchorPoint,
};
