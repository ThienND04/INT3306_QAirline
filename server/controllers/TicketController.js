// controllers/TicketController.js
const Ticket = require('../models/Ticket');

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
            res.status(500).json({ message: 'Error getting ticket', error });
        }
    }

    // Create new ticket
    async createTicket(req, res) {
        try {
            const ticket = new Ticket(req.body);
            await ticket.save();
            res.status(201).json(ticket);
        } catch (error) {
            res.status(500).json({ message: 'Error creating ticket', error });
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