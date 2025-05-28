const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const flightSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    aircraft: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true},
    departureTime: Date,
    arrivalTime: Date,
    airline: { type: String, required: true },
    seats: [{ 
        seatNo: String, 
        isBooked: { type: Boolean, default: false } 
    }]
});

flightSchema.plugin(mongooseDelete, 
    { 
        overrideMethods: 'all',
        deletedAt: true,
    });

module.exports = mongoose.model('Flight', flightSchema);
