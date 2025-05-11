const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const airportSchema = new mongoose.Schema({
    AirportID: { type: String, required: true, unique: true },
    Name: { type: String, required: true },
    City: { type: String, required: true },
    Country: { type: String, required: true },
    IATACode: { type: String, required: true, unique: true }
});

airportSchema.plugin(mongooseDelete,
    { 
        overrideMethods: 'all',
        deletedAt: true,
    });

module.exports = mongoose.model('Airport', airportSchema);