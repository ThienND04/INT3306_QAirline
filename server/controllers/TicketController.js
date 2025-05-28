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
            // If soft deleting, also need to unbook the seat on the flight
            const flight = await Flight.findById(ticket.flightId);
            if (flight) {
                const seatToUnbook = flight.seats.find(seat => seat.seatNo === ticket.seatNumber);
                if (seatToUnbook) {
                    seatToUnbook.isBooked = false;
                    await flight.save();
                }
            }
            res.status(200).json({ message: 'Ticket deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting ticket', error });
        }
    }

    // [GET] /tickets/deleted
    async getDeletedTickets(req, res) {
        try {
            const deletedTickets = await Ticket.findDeleted({}).populate('flightId userId');
            res.status(200).json(deletedTickets);
        } catch (error) {
            res.status(500).json({ message: 'Error getting deleted tickets', error: error.message });
        }
    }

    // [PATCH] /tickets/:id/restore
    async restoreTicket(req, res) {
        try {
            const ticketToRestore = await Ticket.findOneDeleted({ _id: req.params.id });
            if (!ticketToRestore) {
                return res.status(404).json({ message: 'Deleted ticket not found.' });
            }

            const flight = await Flight.findById(ticketToRestore.flightId);
            if (!flight) {
                return res.status(404).json({ message: 'Associated flight not found. Cannot restore ticket.' });
            }

            const seat = flight.seats.find(s => s.seatNo === ticketToRestore.seatNumber);
            if (!seat) {
                return res.status(400).json({ message: 'Seat not found on the flight. Cannot restore ticket.' });
            }

            if (seat.isBooked) {
                // Check if it's booked by this ticket (which is currently soft-deleted)
                // This check might be complex if another ticket booked it after this one was deleted.
                // For simplicity, if seat is booked, we prevent restore or allow overwrite based on policy.
                // Here, we prevent restore if seat is already booked by someone else.
                // A more robust check would be to see if another *active* ticket holds this seat.
                const activeTicketForSeat = await Ticket.findOne({ 
                    flightId: ticketToRestore.flightId, 
                    seatNumber: ticketToRestore.seatNumber, 
                    _id: { $ne: ticketToRestore._id }, // Exclude the ticket being restored
                    deleted: { $ne: true } // Ensure it's an active ticket
                });
                if (activeTicketForSeat) {
                    return res.status(400).json({ message: 'Seat is already booked by another active ticket. Cannot restore.' });
                }
            }
            
            const result = await Ticket.restore({ _id: req.params.id });
            if (result.restored === 0 || (result.modifiedCount === 0 && result.matchedCount === 0)) {
                return res.status(404).json({ message: 'Ticket not found or not deleted, or restore failed' });
            }

            // Mark seat as booked again
            seat.isBooked = true;
            await flight.save();
            
            const restoredTicket = await Ticket.findById(req.params.id).populate('flightId userId');
            if (!restoredTicket) {
                 return res.status(404).json({ message: 'Ticket not found after attempting restore.' });
            }
            res.status(200).json({ message: 'Ticket restored successfully', ticket: restoredTicket });
        } catch (error) {
            console.error('Error restoring ticket:', error);
            res.status(500).json({ message: 'Error restoring ticket', error: error.message });
        }
    }
}

module.exports = new TicketController();