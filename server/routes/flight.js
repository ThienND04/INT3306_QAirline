const express = require('express');
const router = express.Router();
const flightController = require('../controllers/FlightController');

router.get('/', flightController.searchFlights);      // /api/flights
router.post('/', flightController.createFlight);      // Thêm chuyến bay mới

module.exports = router;
