// controllers/TicketController.js
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');

class BookingController {
    // [GET] /booking
    async getAllBookings(req, res) {
        try {
            const tickets = await Booking.find().populate('flightInfo userInfo');
            res.status(200).json(tickets);
        } catch (error) {
            res.status(500).json({ message: 'Error getting tickets', error });
        }
    }

    // [GET] /bookings/:id
    async getBookingById(req, res) {
        try {
            const ticket = await Booking.findById(req.params.id).populate('flightInfo userInfo');
            if (!ticket) {
                return res.status(404).json({ message: 'Ticket not found' });
            }
            res.status(200).json(ticket);
        } catch (error) {
            res.status(500).json({ message: 'Error getting ticket', error: error.message });
        }
    }

    // [GET] /bookings/flight/:flightCode
    async getBookingsByFlightCode(req, res) {
        try {
            const { flightCode } = req.params;
            const tickets = await Booking.find({ flightCode: flightCode }).populate('flightInfo userInfo');

            if (!tickets || tickets.length === 0) {
                return res.status(404).json({ message: 'No tickets found for this flight code' });
            }

            res.status(200).json(tickets);
        } catch (error) {
            res.status(500).json({ message: 'Error getting tickets by flight code', error: error.message });
        }
    }

    // [PUT] /bookings/:id
    async updateBooking(req, res) {
        try {
            const ticket = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!ticket) {
                return res.status(404).json({ message: 'Ticket not found' });
            }
            res.status(200).json(ticket);
        } catch (error) {
            res.status(500).json({ message: 'Error updating ticket', error });
        }
    }

    // [POST] /bookings/book
    async bookTickets(req, res) {
        try {
            const { flightCode, userId, identityNo, seatNo, price } = req.body;

            if (!flightCode || !userId || !identityNo || !seatNo || !price) {
                return res.status(400).json({ message: 'Thiếu thông tin cần thiết để đặt vé.' });
            }

            const flight = await Flight.findOne({ code: flightCode });
            if (!flight) {
                return res.status(404).json({ message: 'Không tìm thấy chuyến bay.' });
            }

            const seat = flight.seats.find(seat => seat.seatNo === seatNo);
            if (!seat) {
                return res.status(400).json({ message: 'Số ghế không hợp lệ.' });
            }

            if (seat.isBooked) {
                return res.status(400).json({ message: 'Ghế này đã được đặt.' });
            }

            seat.isBooked = true;

            const newTicket = new Booking({
                flightCode,
                userId,
                identityNo,
                seatNo,
                class: seat.class || 'Economy',
                price,
                departure: flight.from,
                arrival: flight.to,
                departureTime: flight.departureTime,
                arrivalTime: flight.arrivalTime,
            });

            await newTicket.save();
            await flight.save();

            res.status(201).json({
                message: 'Đặt vé thành công',
                ticket: newTicket
            });
        } catch (error) {
            console.error('Lỗi đặt vé:', error);
            res.status(500).json({ message: 'Lỗi hệ thống khi đặt vé' });
        }
    }

    // [DELETE] /bookings/:id
    async cancelBooking(req, res) {
        try {
            const id = req.params.id;

            const ticket = await Booking.findById(id).populate('flightInfo');
            if (!ticket) {
                return res.status(404).json({ message: 'Ticket not found.' });
            }

            if (ticket.flightInfo && ticket.flightInfo.seats) {
                const seatToUnbook = ticket.flightInfo.seats.find(seat => seat.seatNo === ticket.seatNo);
                if (seatToUnbook) {
                    seatToUnbook.isBooked = false;
                    await ticket.flightInfo.save();
                }
            } else {
                console.warn(`Flight info for ticket ${id} not found or flight was deleted. Seat status not changed.`);
            }

            await ticket.delete(); 

            res.status(200).json({ message: 'Ticket cancelled successfully.' });
        } catch (error) {
            console.error('Error cancelling ticket:', error);
            res.status(500).json({ message: 'Error cancelling ticket', error: error.message });
        }
    }
}

module.exports = new BookingController();