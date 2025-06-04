// controllers/AirportController.js
const Airport = require('../models/Airport');

class AirportController {
    // [GET] /airports
    async getAllAirports(req, res) {
        try {
            const airports = await Airport.find();
            res.status(200).json(airports);
        } catch (error) {
            res.status(500).json({ message: 'Error getting airports', error });
        }
    }

    // [GET] /airports/:id
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

    // [POST] /airports
    async createAirport(req, res) {
        try {
            const airport = new Airport(req.body);
            await airport.save();
            res.status(201).json(airport);
        } catch (error) {
            res.status(500).json({ message: 'Error creating airport', error });
        }
    }

    // [PUT] /airports/:id
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

    // [DELETE] /airports/:id
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

    // [GET] /airports/iata/:iataCode
    async getAirportByIATACode(req, res) {
        try {
            const airport = await Airport.findOne({ IATACode: req.params.iataCode });
            if (!airport) {
                return res.status(404).json({ message: 'Airport not found with this IATA code' });
            }
            res.status(200).json(airport);
        } catch (error) {
            res.status(500).json({ message: 'Error getting airport by IATA code', error });
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
            const deletedAirports = await Airport.findWithDeleted({ deleted: true });
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

    //[GET] /airports/search
    async searchAirports(req, res) {
        try {
            const { query: keyword } = req.query;
            console.log(`Search query: ${keyword}`);
            if (!keyword) {
                return res.json([]);
            }
            
            const airports = await Airport.aggregate([
                {
                    $search: {
                        index: "default",
                        text: {
                            query: keyword, 
                            path: ["name", "city", "country", "IATACode"], 
                            fuzzy: {
                                maxEdits: 1
                            }
                        }
                    },
                }
            ]);
            res.status(200).json(airports);
        } catch (error) {
            res.status(500).json({ message: 'Error searching airports', error: error.message });
        }
    }
}

module.exports = new AirportController();