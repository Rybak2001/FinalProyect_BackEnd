const express = require('express');
const router = express.Router();
const animalModelController = require('../controllers/animalModelController');
const authenticateJWT = require('../middlewares/authMiddleware');

// Rutas para los modelos de animales
router.get('/', animalModelController.getAllAnimalModels);
router.post('/', animalModelController.createAnimalModel);
router.get('/:id', animalModelController.getAnimalModelById);
router.put('/:id', animalModelController.updateAnimalModel);
router.delete('/:id', animalModelController.deleteAnimalModel);

module.exports = router;
