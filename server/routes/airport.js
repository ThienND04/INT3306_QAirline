const express = require('express');
const router = express.Router();
const airportController = require('../controllers/AirportController');
const authenticateToken = require('../middlewares/auth/authToken');
const authorizeRoles = require('../middlewares/auth/authRoles');

router.use(authenticateToken); 
router.use(authorizeRoles('admin'));

router.get('/deleted', airportController.getDeletedAirports);
router.get('/search', airportController.searchAirports);
router.get('/iata/:iataCode', airportController.getAirportByIATACode); // New route
router.get('/:id', airportController.getAirportById);
router.get('/', airportController.getAllAirports);
router.post('/', airportController.createAirport);
router.put('/:id', airportController.updateAirport);
router.delete('/:id', airportController.deleteAirport);
router.delete('/hard-delete/:id', airportController.hardDeleteAirport);
router.patch('/restore/:id', airportController.restoreAirport);

module.exports = router;