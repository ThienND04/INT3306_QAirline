const express = require('express');
const router = express.Router();
const airportController = require('../controllers/AirportController');
const authenticateToken = require('../middlewares/auth/authToken');
const authorizeRoles = require('../middlewares/auth/authRoles');

router.use(authenticateToken); 
router.use(authorizeRoles('admin'));

router.get('/deleted', airportController.getDeletedAirports);
router.get('/:id', airportController.getAirportById);
router.get('/', airportController.getAllAirports);
router.post('/', airportController.createAirport);
router.put('/:id', airportController.updateAirport);
router.delete('/:id', airportController.deleteAirport);
router.patch('/restore/:id', airportController.restoreAirport);

module.exports = router;