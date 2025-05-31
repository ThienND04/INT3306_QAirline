const express = require('express');
const router = express.Router();
const flightController = require('../controllers/FlightController');
const authenticateToken = require('../middlewares/auth/authToken');
const authorizeRoles = require('../middlewares/auth/authRoles');

router.use(authenticateToken); 

router.get('/search', flightController.searchFlights);    
router.put('/:id', authorizeRoles('admin'), flightController.updateFlight);
router.delete('/:id', authorizeRoles('admin'), flightController.deleteFlight); 
router.delete('/hard-delete/:id', authorizeRoles('admin'), flightController.hardDeleteFlight); 
router.get('/deleted', authorizeRoles('admin'), flightController.getDeletedFlights);
router.patch('/restore/:id', authorizeRoles('admin'), flightController.restoreFlight);
router.get('/', flightController.getAllFlights);
router.get('/:id', flightController.getFlightById); 
router.post('/', authorizeRoles('admin'), flightController.createFlight); 

module.exports = router;
