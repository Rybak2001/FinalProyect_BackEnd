const express = require('express');
const router = express.Router();
const userInteractionController = require('../controllers/userInteractionController');
const authenticateJWT = require('../middlewares/authMiddleware');

// Rutas para las interacciones de usuario
router.get('/', authenticateJWT, userInteractionController.getAllUserInteractions);
router.post('/', authenticateJWT, userInteractionController.createUserInteraction);
router.get('/:id', authenticateJWT, userInteractionController.getUserInteractionById);
router.put('/:id', authenticateJWT, userInteractionController.updateUserInteraction);
router.delete('/:id', authenticateJWT, userInteractionController.deleteUserInteraction);

module.exports = router;
