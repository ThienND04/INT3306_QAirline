const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/TicketController');
const authMiddleware = require('../middlewares/AuthMiddleware');

router.use(authMiddleware); // Apply auth middleware to all routes

// Get all tickets
router.get('/', ticketController.getAllTickets);
// Get ticket by ID
router.get('/:id', ticketController.getTicketById);
// Create a new ticket
router.post('/', ticketController.createTicket);
// Update ticket information
router.put('/:id', ticketController.updateTicket);
// Delete ticket by ID
router.delete('/:id', ticketController.deleteTicket);

module.exports = router;