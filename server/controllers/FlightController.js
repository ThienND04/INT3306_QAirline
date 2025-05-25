// controllers/flightController.js
const Flight = require('../models/Flight');

class FlightController {
    async getAllFlights(req, res) {
        try {
            console.log('Fetching all flights');
            const flights = await Flight.find();
            res.status(200).json(flights);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching flights', error });
        }
    }
    

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

    // Cập nhật chuyến bay
    async updateFlight(req, res) {
        try {
            const flightId = req.params.id;
            const updatedFlight = await Flight.findByIdAndUpdate(flightId, req.body, { new: true });
            if (!updatedFlight) {
                return res.status(404).json({ message: 'Không tìm thấy chuyến bay' });
            }
            res.status(200).json(updatedFlight);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi cập nhật chuyến bay', error });
        }
    }

    // Xóa chuyến bay
    async deleteFlight(req, res) {
        try {
            const flightId = req.params.id;
            const deletedFlight = await Flight.findByIdAndDelete(flightId);
            if (!deletedFlight) {
                return res.status(404).json({ message: 'Không tìm thấy chuyến bay để xóa' });
            }
            res.status(200).json({ message: 'Đã xóa chuyến bay thành công', flight: deletedFlight });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi xóa chuyến bay', error });
        }
    }
}
module.exports = new FlightController();
