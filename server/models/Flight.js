const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const flightSchema = new mongoose.Schema({
    code: String,
    aircraft: String,
    from: String,
    to: String,
    departureTime: Date,
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
