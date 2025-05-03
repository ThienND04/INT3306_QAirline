// controllers/flightController.js
const Flight = require('../models/Flight');

class FlightController {
    // Tìm kiếm chuyến bay
    async searchFlights(req, res) {
        try {
            const { from, to, date } = req.query;
            const flights = await Flight.find({
                from,
                to,
                departureTime: { $gte: new Date(date) }
            });
            res.status(200).json(flights);
        } catch (error) {
            res.status(500).json({ message: 'Error searching flights', error });
        }
    }

    // Thêm chuyến bay mới
    async createFlight(req, res) {
        try {
            const flight = new Flight(req.body);
            await flight.save();
            res.status(201).json(flight);
        } catch (error) {
            res.status(500).json({ message: 'Error creating flight', error });
        }
    }
}
module.exports = new FlightController();
