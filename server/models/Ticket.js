const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const ticketSchema = new mongoose.Schema({
    ticketId: { type: String, required: true, unique: true },
    flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
    userId: { type: String, ref: 'User', required: true },
    identityNo: { type: String, required: true }, // Passport number or National ID
    seatNumber: { type: String, required: true },
    price: { type: Number, required: true },
    departure: { type: String, required: true }, // Departure airport IATACode
    arrival: { type: String, required: true }, // Arrival airport IATACode
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    bookedAt: { type: Date, default: Date.now }
});

ticketSchema.plugin(mongooseDelete, 
    { 
        overrideMethods: 'all',
        deletedAt: true,
    });

module.exports = mongoose.model('Ticket', ticketSchema);