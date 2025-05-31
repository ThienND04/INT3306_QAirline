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
            const airport = await Airport.findById(req.params.id); 
            if (!airport) {
                return res.status(404).json({ message: 'Airport not found' });
            }
            airport.delete(); 
            res.status(200).json({ message: 'Airport deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting airport', error });
        }
    }

    //[DELETE] /airports/hard-delete/:id
    async hardDeleteAirport(req, res) {
        try {
            const result = await Airport.deleteOne({ _id: req.params.id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Airport not found' });
            }
            res.status(200).json({ message: 'Airport permanently deleted' });
        } catch (error) {
            res.status(500).json({ message: 'Error permanently deleting airport', error });
        }
    }

    // [GET] /airports/deleted
    async getDeletedAirports(req, res) {
        try {
            const deletedAirports = await Airport.findWithDeleted({deleted:true});
            res.status(200).json(deletedAirports);
        } catch (error) {
            res.status(500).json({ message: 'Error getting deleted airports', error: error.message });
        }
    }

    // [PATCH] /airports/restore/:id
    async restoreAirport(req, res) {
        try {
            console.log(`Attempting to restore airport with ID: ${req.params.id}`);
            const result = await Airport.restore({ _id: req.params.id });
            if (result.restored === 0 || (result.modifiedCount === 0 && result.matchedCount === 0)) {
                return res.status(404).json({ message: 'Airport not found or not deleted' });
            }
            const restoredAirport = await Airport.findById(req.params.id);
            if (!restoredAirport) {
                 return res.status(404).json({ message: 'Airport not found after attempting restore.' });
            }
            res.status(200).json({ message: 'Airport restored successfully', airport: restoredAirport });
        } catch (error) {
            res.status(500).json({ message: 'Error restoring airport', error: error.message });
        }
    }
}

module.exports = new AirportController();