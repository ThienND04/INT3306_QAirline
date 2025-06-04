// controllers/TicketController.js
const Ticket = require('../models/Ticket');
const Flight = require('../models/Flight');

class TicketController {
    // [GET] /tickets
    async getAllTickets(req, res) {
        try {
            const tickets = await Ticket.find().populate('flightInfo userInfo');
            res.status(200).json(tickets);
        } catch (error) {
            res.status(500).json({ message: 'Error getting tickets', error });
        }
    }

    // [GET] /tickets/:id
    async getTicketById(req, res) {
        try {
            const ticket = await Ticket.findById(req.params.id).populate('flightInfo userInfo');
            if (!ticket) {
                return res.status(404).json({ message: 'Ticket not found' });
            }
            res.status(200).json(ticket);
        } catch (error) {
            res.status(500).json({ message: 'Error getting ticket', error: error.message });
        }
    }

    // [GET] /tickets/flight/:flightCode
    async getTicketsByFlightCode(req, res) {
        try {
            const { flightCode } = req.params;
            const tickets = await Ticket.find({ flightCode: flightCode }).populate('flightInfo userInfo');

            if (!tickets || tickets.length === 0) {
                return res.status(404).json({ message: 'No tickets found for this flight code' });
            }

            res.status(200).json(tickets);
        } catch (error) {
            res.status(500).json({ message: 'Error getting tickets by flight code', error: error.message });
        }
    }

    // [PUT] /tickets/:id
    async updateTicket(req, res) {
        try {
            const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!ticket) {
                return res.status(404).json({ message: 'Ticket not found' });
            }
            res.status(200).json(ticket);
        } catch (error) {
            res.status(500).json({ message: 'Error updating ticket', error });
        }
    }

    // [POST] /tickets/book
    async bookTicket(req, res) {
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

            const newTicket = new Ticket({
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

    // [DELETE] /tickets/:id
    async cancelTicket(req, res) {
        try {
            const id = req.params.id;

            const ticket = await Ticket.findById(id).populate('flightInfo');
            if (!ticket) {
                return res.status(404).json({ message: 'Ticket not found.' });
            }

            // Unbook the seat in the flight
            // Ensure flightInfo is populated and exists
            if (ticket.flightInfo && ticket.flightInfo.seats) {
                const seatToUnbook = ticket.flightInfo.seats.find(seat => seat.seatNo === ticket.seatNo);
                if (seatToUnbook) {
                    seatToUnbook.isBooked = false;
                    await ticket.flightInfo.save();
                }
            } else {
                // Handle case where flightInfo might not be populated or flight was deleted
                console.warn(`Flight info for ticket ${id} not found or flight was deleted. Seat status not changed.`);
            }


            await ticket.delete(); // This will now use mongoose-delete for soft delete

            res.status(200).json({ message: 'Ticket cancelled successfully.' });
        } catch (error) {
            console.error('Error cancelling ticket:', error);
            res.status(500).json({ message: 'Error cancelling ticket', error: error.message });
        }
    }
}

module.exports = new TicketController();