const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const aircraftSchema = new mongoose.Schema({
    AircraftID: { type: String, required: true, unique: true },
    Model: { type: String, required: true },
    Manufacturer: { type: String, required: true },
    EconomyClassSeats: { type: Number, default: 0 },
    BusinessClassSeats: { type: Number, default: 0 },
    FirstClassSeats: { type: Number, default: 0 },
    PremiumClassSeats: { type: Number, default: 0 },
    TotalSeats: { type: Number, required: true },
    RangeInKm: Number,
    Description: String
});

aircraftSchema.plugin(mongooseDelete, 
    { 
        overrideMethods: 'all',
        deletedAt: true,
    });

module.exports = mongoose.model('Aircraft', aircraftSchema);