const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const aircraftSchema = new mongoose.Schema({
    aircraftID: { type: String, required: true, unique: true },
    model: { type: String, required: true },
    manufacturer: { type: String, required: true },
    economyClassSeats: { type: Number, default: 0 },
    businessClassSeats: { type: Number, default: 0 },
    firstClassSeats: { type: Number, default: 0 },
    premiumClassSeats: { type: Number, default: 0 },
    rangeInKm: Number,
    description: String
});

aircraftSchema.plugin(mongooseDelete, 
    { 
        overrideMethods: 'all',
        deletedAt: true,
    });

module.exports = mongoose.model('Aircraft', aircraftSchema);