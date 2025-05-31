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

    // Lấy thông tin chuyến bay bằng ID
    async getFlightById(req, res) {
        try {
            const flightId = req.params.id;
            const flight = await Flight.findById(flightId);
            if (!flight) {
                return res.status(404).json({ message: 'Không tìm thấy chuyến bay' });
            }
            res.status(200).json(flight);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi lấy thông tin chuyến bay', error });
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
            const deletedFlight = await Flight.findById(flightId);
            if (!deletedFlight) {
                return res.status(404).json({ message: 'Không tìm thấy chuyến bay để xóa' });
            }
            deletedFlight.delete(); 
            res.status(200).json({ message: 'Đã xóa chuyến bay thành công', flight: deletedFlight });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi xóa chuyến bay', error });
        }
    }

    // [GET] /flights/deleted
    async getDeletedFlights(req, res) {
        try {
            const deletedFlights = await Flight.findWithDeleted({ deleted: true });
            res.status(200).json(deletedFlights);
        } catch (error) {
            res.status(500).json({ message: 'Error getting deleted flights', error: error.message });
        }
    }

    // [PATCH] /flights/restore/:id
    async restoreFlight(req, res) {
        try {
            const result = await Flight.restore({ _id: req.params.id });
            if (result.restored === 0 || (result.modifiedCount === 0 && result.matchedCount === 0)) {
                return res.status(404).json({ message: 'Flight not found or not deleted' });
            }
            const restoredFlight = await Flight.findById(req.params.id);
            if (!restoredFlight) {
                 return res.status(404).json({ message: 'Flight not found after attempting restore.' });
            }
            res.status(200).json({ message: 'Flight restored successfully', flight: restoredFlight });
        } catch (error) {
            res.status(500).json({ message: 'Error restoring flight', error: error.message });
        }
    }

    // [DELETE] /flights/hard-delete/:id
    async hardDeleteFlight(req, res) {
        try {
            const flightId = req.params.id;
            const result = await Flight.deleteOne({ _id: flightId });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Không tìm thấy chuyến bay để xóa vĩnh viễn' });
            }
            res.status(200).json({ message: 'Đã xóa vĩnh viễn chuyến bay thành công' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi xóa vĩnh viễn chuyến bay', error });
        } 
    }
}
module.exports = new FlightController();
