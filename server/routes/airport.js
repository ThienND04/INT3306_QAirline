const express = require('express');
const router = express.Router();
const airportController = require('../controllers/AirportController');
const authMiddleware = require('../middlewares/AuthMiddleware');

router.use(authMiddleware); // Apply auth middleware to all routes

router.get('/', airportController.getAllAirports);
router.get('/:id', airportController.getAirportById);
router.post('/', airportController.createAirport);
router.put('/:id', airportController.updateAirport);
router.delete('/:id', airportController.deleteAirport);

module.exports = router;