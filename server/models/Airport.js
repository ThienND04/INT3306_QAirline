const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const airportSchema = new mongoose.Schema({
    airportID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    IATACode: { type: String, required: true, unique: true }
});

airportSchema.plugin(mongooseDelete,
    { 
        overrideMethods: 'all',
        deletedAt: true,
    });

module.exports = mongoose.model('Airport', airportSchema);