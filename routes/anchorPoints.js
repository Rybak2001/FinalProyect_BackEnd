const express = require('express');
const router = express.Router();
const anchorPointController = require('../controllers/anchorPointController');
const authenticateJWT = require('../middlewares/authMiddleware');

// Rutas para los puntos de anclaje
router.get('/', anchorPointController.getAllAnchorPoints);
router.post('/', anchorPointController.createAnchorPoint);
router.get('/:id', anchorPointController.getAnchorPointById);
router.put('/:id', anchorPointController.updateAnchorPoint);
router.delete('/:id', anchorPointController.deleteAnchorPoint);

//Enlazar
router.post('/:id/link-animal-model/:modelId', anchorPointController.linkAnimalModelToAnchorPoint);

module.exports = router;
