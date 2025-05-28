const express = require('express');
const router = express.Router();
const flightController = require('../controllers/FlightController');
const authenticateToken = require('../middlewares/auth/authToken');
const authorizeRoles = require('../middlewares/auth/authRoles');

router.use(authenticateToken); 
router.use(authorizeRoles('admin'));

router.get('/', flightController.getAllFlights);
router.get('/search', flightController.searchFlights);
router.get('/:id', flightController.getFlightById); 
router.post('/', flightController.createFlight);     
router.put('/:id', flightController.updateFlight);
router.delete('/:id', flightController.deleteFlight); 

module.exports = router;
