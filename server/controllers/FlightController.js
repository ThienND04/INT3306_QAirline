const Flight = require('../models/Flight');
const Aircraft = require('../models/Aircraft');
const Notification = require('../models/Notification');
const Booking = require('../models/Booking');
const User = require('../models/User');
const { sendFlightDelayNotificationEmail } = require('../utils/sendEmail');

const generateSeats = (aircraft) => {
    const seats = [];
    const seatClasses = [
        { name: 'First', type: 'F', count: aircraft.firstClassSeats },
        { name: 'Premium', type: 'P', count: aircraft.premiumClassSeats },
        { name: 'Business', type: 'B', count: aircraft.businessClassSeats },
        { name: 'Economy', type: 'E', count: aircraft.economyClassSeats }
    ];

    for (const cls of seatClasses) {
        for (let i = 1; i <= cls.count; i++) {
            seats.push({
                seatNo: `${cls.type}${i}`,
                class: cls.name,
                isBooked: false
            });
        }
    }

    return seats;
}

const preprocessFlightData = (flightDoc) => {
    const flight = flightDoc.toObject();
    console.log('Preprocessing flight data:', flightDoc._id);
    flight.remainingSeats = {
        economy: flight.seats.filter(seat => seat.class === 'Economy' && !seat.isBooked).length,
        premium: flight.seats.filter(seat => seat.class === 'Premium' && !seat.isBooked).length,
        business: flight.seats.filter(seat => seat.class === 'Business' && !seat.isBooked).length,
        first: flight.seats.filter(seat => seat.class === 'First' && !seat.isBooked).length
    };
    delete flight.seats;
    console.log('Processed flight data:', flightDoc._id, flightDoc.remainingSeats);
    return flight;
}

class FlightController {
    async getAllFlights(req, res) {
        try {
            console.log('Fetching all flights');
            const flights = await Flight.find();
            res.status(200).json(flights);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching flights', error });
        }
    }

    // [GET] /flights/search
    async searchFlights(req, res) {
        try {
            console.log('Searching flights with params:', req.query);
            const { from, to, date } = req.query;

            const startDate = new Date(date);
            startDate.setUTCHours(0, 0, 0, 0);

            const endDate = new Date(date);
            endDate.setUTCHours(23, 59, 59, 999);

            const flights = await Flight.find({
                from,
                to,
                departureTime: {
                    $gte: startDate,
                    $lt: endDate
                }
            });

            const flightsResult = flights.map(preprocessFlightData);
            res.status(200).json(flightsResult);
        } catch (error) {
            res.status(500).json({ message: 'Error searching flights', error });
        }
    }

    // [POST] /flights
    async createFlight(req, res) {
        try {
            const flight = new Flight(req.body);
            const aircraft = await Aircraft.findOne({ aircraftID: flight.aircraft });
            if (!aircraft) {
                return res.status(404).json({ message: 'Aircraft not found' });
            }
            flight.seats = generateSeats(aircraft);
            await flight.save();
            res.status(201).json(flight);
        } catch (error) {
            res.status(500).json({ message: 'Error creating flight', error: error.message });
        }
    }

    // [GET] /flights/:id
    async getFlightById(req, res) {
        try {
            console.log('Fetching flight by ID:', req.params.id);
            const flightId = req.params.id;
            const flight = await Flight.findById(flightId);
            if (!flight) {
                return res.status(404).json({ message: 'Không tìm thấy chuyến bay' });
            }

            flight.remainingSeats = {
                economy: flight.seats.filter(seat => seat.class === 'Economy' && !seat.isBooked).length,
                premium: flight.seats.filter(seat => seat.class === 'Premium' && !seat.isBooked).length,
                business: flight.seats.filter(seat => seat.class === 'Business' && !seat.isBooked).length,
                first: flight.seats.filter(seat => seat.class === 'First' && !seat.isBooked).length
            };

            delete flight.seats;

            res.status(200).json(flight);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi lấy thông tin chuyến bay', error });
        }
    }

    // [PUT] /flights/:id
    async updateFlight(req, res) {
        try {
            const flightId = req.params.id;
            const updatedFlight = await Flight.findByIdAndUpdate(flightId, req.body, { new: true });
            if (!updatedFlight) {
                return res.status(404).json({ message: 'Không tìm thấy chuyến bay' });
            }
            res.status(200).json(updatedFlight);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi cập nhật chuyến bay', error });
        }
    }

    // [DELETE] /flights/:id
    async deleteFlight(req, res) {
        try {
            const flightId = req.params.id;
            const deletedFlight = await Flight.findById(flightId);
            if (!deletedFlight) {
                return res.status(404).json({ message: 'Không tìm thấy chuyến bay để xóa' });
            }
            deletedFlight.delete();
            res.status(200).json({ message: 'Đã xóa chuyến bay thành công', flight: deletedFlight });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi xóa chuyến bay', error });
        }
    }

    // [GET] /flights/deleted
    async getDeletedFlights(req, res) {
        try {
            const deletedFlights = await Flight.findWithDeleted({ deleted: true });
            res.status(200).json(deletedFlights);
        } catch (error) {
            res.status(500).json({ message: 'Error getting deleted flights', error: error.message });
        }
    }

    // [PATCH] /flights/restore/:id
    async restoreFlight(req, res) {
        try {
            const result = await Flight.restore({ _id: req.params.id });
            if (result.restored === 0 || (result.modifiedCount === 0 && result.matchedCount === 0)) {
                return res.status(404).json({ message: 'Flight not found or not deleted' });
            }
            const restoredFlight = await Flight.findById(req.params.id);
            if (!restoredFlight) {
                return res.status(404).json({ message: 'Flight not found after attempting restore.' });
            }
            res.status(200).json({ message: 'Flight restored successfully', flight: restoredFlight });
        } catch (error) {
            res.status(500).json({ message: 'Error restoring flight', error: error.message });
        }
    }

    // [DELETE] /flights/hard-delete/:id
    async hardDeleteFlight(req, res) {
        try {
            const flightId = req.params.id;
            const result = await Flight.deleteOne({ _id: flightId });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: 'Không tìm thấy chuyến bay để xóa vĩnh viễn' });
            }
            res.status(200).json({ message: 'Đã xóa vĩnh viễn chuyến bay thành công' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi xóa vĩnh viễn chuyến bay', error });
        }
    }

    // [PUT] /flights/delay
    async delayFlight(req, res) {
        try {
            console.log('Notifying flight delay with body:', req.body);
            const {  code, newDepartureTime, newArrivalTime, delayReason } = req.body; // Renamed arrivalTime to newArrivalTime for clarity

            const flight = await Flight.findOne({code});
            if (!flight) {
                return res.status(404).json({ message: 'Chuyến bay không tồn tại' });
            }

            const originalDepartureTime = flight.departureTime;

            flight.departureTime = new Date(newDepartureTime);
            flight.arrivalTime = new Date(newArrivalTime);
            await flight.save();

            const affectedBookings = await Booking.find({
                $or: [
                    { outboundFlight: code },
                    { returnFlight: code }
                ]
            }).populate('user', 'email');

            console.log(`Found ${affectedBookings.length} affected bookings for flight ${code}`);
            for (const booking of affectedBookings) {
                if (booking.user && booking.user.email) {
                    const emailDetails = {
                        flightNo: flight.flightNo,
                        departureCity: flight.from,
                        arrivalCity: flight.to,
                        originalDepartureTime: originalDepartureTime,
                        newDepartureTime: flight.departureTime,
                        newArrivalTime: flight.arrivalTime,
                        delayReason: delayReason
                    };
                    try {
                        await sendFlightDelayNotificationEmail(booking.user.email, emailDetails);
                    } catch (emailError) {
                        console.error(`Error sending delay email to ${booking.user.email}:`, emailError);
                    }

                    const userNotification = new Notification({
                        user: booking.user._id,
                        title: 'Chuyến bay của bạn bị hoãn',
                        message: `Chuyến bay ${flight.flightNo} từ ${flight.from} đến ${flight.to} đã bị hoãn. Lý do: ${delayReason}. Thời gian khởi hành mới: ${new Date(flight.departureTime).toLocaleString('vi-VN')}.`,
                        isRead: false,
                        createdAt: new Date()
                    });
                    await userNotification.save();
                }
            }

            res.status(200).json({ message: 'Thông báo chuyến bay bị hoãn và đã gửi email cho hành khách thành công', flight });
        } catch (error) {
            console.error('Error notifying flight delay:', error);
            res.status(500).json({ message: 'Lỗi khi thông báo chuyến bay bị hoãn', error: error.message });
        }
    }
}
module.exports = new FlightController();
