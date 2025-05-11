// controllers/AircraftController.js
const Aircraft = require('../models/Aircraft');

class AircraftController {
    
    // [GET] /aircrafts/
    async getAllAircrafts(req, res) {
        try {
            const aircrafts = await Aircraft.find();
            res.status(200).json(aircrafts);
        } catch (error) {
            res.status(500).json({ message: 'Error getting aircrafts', error });
        }
    }

    // [GET] /aircrafts/:id
    async getAircraftById(req, res) {
        try {
            const aircraft = await Aircraft.findById(req.params.id);
            if (!aircraft) {
                return res.status(404).json({ message: 'Aircraft not found' });
            }
            res.status(200).json(aircraft);
        } catch (error) {
            res.status(500).json({ message: 'Error getting aircraft', error });
        }
    }

    // [POST] /aircrafts/
    async createAircraft(req, res) {
        try {
            const aircraft = new Aircraft(req.body);
            await aircraft.save();
            res.status(201).json(aircraft);
        } catch (error) {
            res.status(500).json({ message: 'Error creating aircraft', error });
        }
    }

    // [PUT] /aircrafts/:id
    async updateAircraft(req, res) {
        try {
            const aircraft = await Aircraft.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!aircraft) {
                return res.status(404).json({ message: 'Aircraft not found' });
            }
            res.status(200).json(aircraft);
        } catch (error) {
            res.status(500).json({ message: 'Error updating aircraft', error: error.message });
        }
    }

    // [DELETE] /aircrafts/:id
    async deleteAircraft(req, res) {
        try {
            const aircraft = await Aircraft.findById(req.params.id);
            if (!aircraft) {
                return res.status(404).json({ message: 'Aircraft not found' });
            }
            aircraft.delete();
            res.status(200).json({ message: 'Aircraft deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting aircraft', error: error.message });
        }
    }
}

module.exports = new AircraftController();