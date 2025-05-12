const express = require('express');
const router = express.Router();
const flightController = require('../controllers/FlightController');
const authenticateToken = require('../middlewares/auth/authToken');
const authorizeRoles = require('../middlewares/auth/authRoles');

router.use(authenticateToken); 
router.use(authorizeRoles('admin'));

router.get('/', flightController.searchFlights);      // /api/flights
router.post('/', flightController.createFlight);      // Thêm chuyến bay mới

module.exports = router;
