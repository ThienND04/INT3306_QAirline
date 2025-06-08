const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Chiều đi
    outbound: {
        flightCode: { type: String, required: true },
        seatNo: [{ type: String, required: true }],
        bookingClass: { type: String, enum: ['Economy', 'Business', 'First', 'Premium'], default: 'Economy' },
        price: { type: Number, required: true },
        departure: { type: String, required: true },
        arrival: { type: String, required: true },
        departureTime: { type: Date, required: true },
        arrivalTime: { type: Date, required: true },
    },

    // Chiều về (tuỳ chọn nếu là vé khứ hồi)
    returnFlight: {
        flightCode: { type: String },
        seatNo: [{ type: String }],
        bookingClass: { type: String, enum: ['Economy', 'Business', 'First', 'Premium'] },
        price: { type: Number },
        departure: { type: String },
        arrival: { type: String },
        departureTime: { type: Date },
        arrivalTime: { type: Date },
    },

    // Hành khách
    adultCount: { type: Number, default: 1 },
    infantCount: { type: Number, default: 0 },
    childCount: { type: Number, default: 0 },

    // Thời điểm đặt vé
    bookedAt: { type: Date, default: Date.now }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });


// Virtual populate: userId -> User._id
bookingSchema.virtual('userInfo', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
});

// Virtual populate for outbound flight
bookingSchema.virtual('outboundFlightInfo', {
    ref: 'Flight',
    localField: 'outbound.flightCode',
    foreignField: 'code',
    justOne: true,
    // options: { select: '-seats' } // Exclude flightSeats
});

// Virtual populate for return flight
bookingSchema.virtual('returnFlightInfo', {
    ref: 'Flight',
    localField: 'returnFlight.flightCode',
    foreignField: 'code',
    justOne: true,
    // options: { select: '-seats' } // Exclude flightSeats
});


module.exports = mongoose.model('Booking', bookingSchema);