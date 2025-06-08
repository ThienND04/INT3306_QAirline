const express = require('express');
const router = express.Router();
const airportController = require('../controllers/AirportController');
const authenticateToken = require('../middlewares/auth/authToken');
const authorizeRoles = require('../middlewares/auth/authRoles');

// router.use(authenticateToken); 
// router.use(authorizeRoles('admin'));

router.get('/deleted', authenticateToken, authorizeRoles('admin'), airportController.getDeletedAirports);
router.get('/search', airportController.searchAirports);
router.get('/iata/:iataCode', airportController.getAirportByIATACode); 
router.get('/:id', airportController.getAirportById);
router.get('/', airportController.getAllAirports);
router.post('/', authenticateToken, authorizeRoles('admin'), airportController.createAirport);
router.put('/:id', authenticateToken, authorizeRoles('admin'), airportController.updateAirport);
router.delete('/:id', authorizeRoles('admin'), airportController.deleteAirport);
router.delete('/hard-delete/:id', authenticateToken, authorizeRoles('admin'), airportController.hardDeleteAirport);
router.patch('/restore/:id', authenticateToken, authorizeRoles('admin'), airportController.restoreAirport);

module.exports = router;