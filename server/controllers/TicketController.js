// controllers/TicketController.js
const Ticket = require('../models/Ticket');
const Flight = require('../models/Flight'); // Import the Flight model

class TicketController {
    // Get all tickets
    async getAllTickets(req, res) {
        try {
            const tickets = await Ticket.find().populate('flightId userId');
            res.status(200).json(tickets);
        } catch (error) {
            res.status(500).json({ message: 'Error getting tickets', error });
        }
    }

    // Get ticket by ID
    async getTicketById(req, res) {
        try {
            const ticket = await Ticket.findById(req.params.id).populate('flightId userId');
            if (!ticket) {
                return res.status(404).json({ message: 'Ticket not found' });
            }
            res.status(200).json(ticket);
        } catch (error) {
            res.status(500).json({ message: 'Error getting ticket', error: error.message });
        }
    }

    // Create new ticket
    async createTicket(req, res) {
        try {
            const { flightId, seatNumber, ...ticketDetails } = req.body;

            if (!flightId || !seatNumber) {
                return res.status(400).json({ message: 'Flight ID and Seat Number are required.' });
            }

            const flight = await Flight.findById(flightId);
            if (!flight) {
                return res.status(404).json({ message: 'Flight not found.' });
            }

            const seatToBook = flight.seats.find(seat => seat.seatNo === seatNumber);
            if (!seatToBook) {
                return res.status(404).json({ message: 'Seat not found on this flight.' });
            }

            if (seatToBook.isBooked) {
                return res.status(400).json({ message: 'This seat is already booked.' });
            }

            seatToBook.isBooked = true;
            await flight.save();
            const ticket = new Ticket({
                ...ticketDetails,
                flightId: flight._id, // Ensure flightId is stored
                seatNumber: seatNumber, // Store the booked seat number on the ticket
                userId: req.user.id,
            });
            await ticket.save();
            res.status(201).json(ticket);
        } catch (error) {
            // It's good practice to log the error on the server for debugging
            console.error('Error creating ticket:', error);
            res.status(500).json({ message: 'Error creating ticket', error: error.message });
        }
    }

    // Update ticket
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

    // Delete ticket
    async deleteTicket(req, res) {
        try {
            const ticket = await Ticket.findByIdAndDelete(req.params.id);
            if (!ticket) {
                return res.status(404).json({ message: 'Ticket not found' });
            }
            res.status(200).json({ message: 'Ticket deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting ticket', error });
        }
    }
}

module.exports = new TicketController();