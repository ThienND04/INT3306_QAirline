const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const ticketSchema = new mongoose.Schema({
    flightCode: { type: String, required: true },
    userId: { type: String, ref: 'User', required: true },
    identityNo: { type: String, required: true }, // Identity number or passport number
    seatNo: { type: String, required: true },
    class: { type: String, enum: ['Economy', 'Business', 'First'], default: 'Economy' },
    price: { type: Number, required: true },
    departure: { type: String, required: true }, // Departure airport IATACode
    arrival: { type: String, required: true }, // Arrival airport IATACode
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    bookedAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Virtual populate: flightId -> Flight._id
ticketSchema.virtual('flightInfo', {
    ref: 'Flight',
    localField: 'flightCode',
    foreignField: 'code',
    justOne: true
});

// Virtual populate: userId -> User._id
ticketSchema.virtual('userInfo', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});

module.exports = mongoose.model('Ticket', ticketSchema);