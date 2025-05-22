const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/users-by-role', analyticsController.getUsersByRole);
router.get('/active-users-count', analyticsController.getActiveUsersCount);
router.get('/interactions-by-type', analyticsController.getInteractionsByType);
router.get('/active-animal-models', analyticsController.getActiveAnimalModels);
router.get('/anchor-points-by-location', analyticsController.getAnchorPointsByLocation);
router.get('/users-status', analyticsController.getUsersStatus);
router.get('/total-interactions', analyticsController.getTotalInteractions);
router.get('/last-access-dates', analyticsController.getLastAccessDates);
// Nueva ruta para el total de registros en cada modelo
router.get('/total-counts', analyticsController.getTotalCounts);
module.exports = router;
