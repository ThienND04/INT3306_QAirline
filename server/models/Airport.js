const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const airportSchema = new mongoose.Schema({
    IATACode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
});

airportSchema.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
    deleted: true,
});

airportSchema.pre(['aggregate', 'aggregateDeleted', 'aggregateWithDeleted'], function () {
    this.pipeline().reverse();
});

module.exports = mongoose.model('Airport', airportSchema);
