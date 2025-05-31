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
            await aircraft.delete(); 
            res.status(200).json({ message: 'Aircraft deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting aircraft', error: error.message });
        }
    }

    //[DELETE] /aircrafts/hard-delete/:id
    async hardDeleteAircraft(req, res) {
        try {
            const result = await Aircraft.deleteOne({ _id: req.params.id });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Aircraft not found' });
            }
            res.status(200).json({ message: 'Aircraft hard deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error hard deleting aircraft', error: error.message });
        }
    }

    // [GET] /aircrafts/deleted
    async getDeletedAircrafts(req, res) {
        try {
            const deletedAircrafts = await Aircraft.findWithDeleted({deleted:true});
            console.log('Deleted aircrafts:', deletedAircrafts);
            res.status(200).json(deletedAircrafts);
        } catch (error) {
            res.status(500).json({ message: 'Error getting deleted aircrafts', error: error.message });
        }
    }

    // [PATCH] /aircrafts/:id/restore
    async restoreAircraft(req, res) {
        try {
            const result = await Aircraft.restore({ _id: req.params.id });
            if (result.restored === 0 || (result.modifiedCount === 0 && result.matchedCount === 0)) { // mongoose-delete v1.x uses result.restored, newer might use updateWriteOpResult like modifiedCount
                return res.status(404).json({ message: 'Aircraft not found or not deleted' });
            }

            const restoredAircraft = await Aircraft.findById(req.params.id);
            if (!restoredAircraft) {
                 return res.status(404).json({ message: 'Aircraft not found after attempting restore.' });
            }
            res.status(200).json({ message: 'Aircraft restored successfully', aircraft: restoredAircraft });
        } catch (error) {
            res.status(500).json({ message: 'Error restoring aircraft', error: error.message });
        }
    }
}

module.exports = new AircraftController();