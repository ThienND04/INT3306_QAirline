// controllers/AirportController.js
const Airport = require('../models/Airport');

class AirportController {
    // Get all airports
    async getAllAirports(req, res) {
        try {
            const airports = await Airport.find();
            res.status(200).json(airports);
        } catch (error) {
            res.status(500).json({ message: 'Error getting airports', error });
        }
    }

    // Get airport by ID
    async getAirportById(req, res) {
        try {
            const airport = await Airport.findById(req.params.id);
            if (!airport) {
                return res.status(404).json({ message: 'Airport not found' });
            }
            res.status(200).json(airport);
        } catch (error) {
            res.status(500).json({ message: 'Error getting airport', error });
        }
    }

    // Create new airport
    async createAirport(req, res) {
        try {
            const airport = new Airport(req.body);
            await airport.save();
            res.status(201).json(airport);
        } catch (error) {
            res.status(500).json({ message: 'Error creating airport', error });
        }
    }

    // Update airport
    async updateAirport(req, res) {
        try {
            const airport = await Airport.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!airport) {
                return res.status(404).json({ message: 'Airport not found' });
            }
            res.status(200).json(airport);
        } catch (error) {
            res.status(500).json({ message: 'Error updating airport', error });
        }
    }

    // Delete airport
    async deleteAirport(req, res) {
        try {
            const airport = await Airport.findByIdAndDelete(req.params.id);
            if (!airport) {
                return res.status(404).json({ message: 'Airport not found' });
            }
            res.status(200).json({ message: 'Airport deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting airport', error });
        }
    }
}

module.exports = new AirportController();