const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    code: String,
    aircraft: String,
    from: String,
    to: String,
    departureTime: Date,
    seats: [{ seatNo: String, isBooked: Boolean }]
});

module.exports = mongoose.model('Flight', flightSchema);
