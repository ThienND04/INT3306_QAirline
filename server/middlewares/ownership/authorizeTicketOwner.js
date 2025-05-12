const Ticket = require('../../models/Ticket'); 

const authorizeTicketOwner = async (req, res, next) => {
    try {
        const ticketId = req.params.id;
        const userId = req.user.id;
        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        if (req.user.role !== 'admin' && ticket.userId.toString() !== userId) {
            return res.status(403).json({ message: 'You do not have permission to access this ticket' });
        }

        next();
    }
    catch (error) {
        console.error('Error authorizing ticket owner:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = authorizeTicketOwner;