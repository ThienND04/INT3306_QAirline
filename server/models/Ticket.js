const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    TicketID: { type: String, required: true, unique: true },
    FlightID: { type: String, ref: 'Flight', required: true },
    Email: { type: String, required: true },
    IdentityNo: { type: String, required: true }, // Passport number or National ID
    SeatNumber: { type: String, required: true },
    Price: { type: Number, required: true },
    Departure: { type: String, required: true }, // Departure airport IATACode
    Arrival: { type: String, required: true }, // Arrival airport IATACode
    DepartureTime: { type: Date, required: true },
    ArrivalTime: { type: Date, required: true },
    BookedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', ticketSchema);