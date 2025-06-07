const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const flightSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    aircraft: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    departureTime: Date,
    arrivalTime: Date,
    airline: { type: String, required: true },
    economyPrice: { type: Number, required: true },
    businessPrice: { type: Number, required: true },
    firstPrice: { type: Number, required: true },
    premiumPrice: { type: Number, required: true },
    seats: [{
        seatNo: String,
        class: { type: String, enum: ['Economy', 'Business', 'First', 'Premium'], default: 'Economy' },
        isBooked: { type: Boolean, default: false }
    }]
});

// Virtual populate: aircraft -> Aircraft.aircraftID
flightSchema.virtual('aircraftInfo', {
    ref: 'Aircraft',
    localField: 'aircraft',
    foreignField: 'aircraftID',
    justOne: true
});

// Virtual populate:  from -> Airport.IATACode
flightSchema.virtual('fromAirport', {
    ref: 'Airport',
    localField: 'from',
    foreignField: 'IATACode',
    justOne: true
});

// Virtual populate:  to -> Airport.IATACode
flightSchema.virtual('toAirport', {
    ref: 'Airport',
    localField: 'to',
    foreignField: 'IATACode',
    justOne: true
});

flightSchema.plugin(mongooseDelete,
    {
        overrideMethods: 'all',
        deletedAt: true,
    });

module.exports = mongoose.model('Flight', flightSchema);
