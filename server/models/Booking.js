const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const bookingSchema = new mongoose.Schema({
    flightCode: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seatNo: [{ type: String, required: true }],
    class: { type: String, enum: ['Economy', 'Business', 'First'], default: 'Economy' },
    price: { type: Number, required: true },
    departure: { type: String, required: true },
    arrival: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
  
    adultCount: { type: Number, default: 1 }, // Người lớn
    infantCount: { type: Number, default: 0 }, // < 2 tuổi
    childCount: { type: Number, default: 0 },  // 2–11 tuổi
  
    bookedAt: { type: Date, default: Date.now }
  }, { timestamps: true });

// Virtual populate: flightId -> Flight._id
bookingSchema.virtual('flightInfo', {
    ref: 'Flight',
    localField: 'flightCode',
    foreignField: 'code',
    justOne: true
});

// Virtual populate: userId -> User._id
bookingSchema.virtual('userInfo', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});

module.exports = mongoose.model('Booking', bookingSchema);