const express = require('express');
const router = express.Router();
const airportController = require('../controllers/AirportController');
const authenticateToken = require('../middlewares/auth/authToken');
const authorizeRoles = require('../middlewares/auth/authRoles');

router.use(authenticateToken); 
router.use(authorizeRoles('admin'));

router.get('/', airportController.getAllAirports);
router.get('/:id', airportController.getAirportById);
router.post('/', airportController.createAirport);
router.put('/:id', airportController.updateAirport);
router.delete('/:id', airportController.deleteAirport);
router.get('/deleted', airportController.getDeletedAirports);
router.patch('/restore/:id', airportController.restoreAirport);

module.exports = router;