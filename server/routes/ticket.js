const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/TicketController');
const authenticateToken = require('../middlewares/auth/authToken');
const authorizeRoles = require('../middlewares/auth/authRoles');
const authorizeTicketOwner = require('../middlewares/ownership/authorizeTicketOwner');

router.use(authenticateToken);

router.get('/', authorizeRoles('admin'), ticketController.getAllTickets);
router.get('/:id', authorizeTicketOwner, ticketController.getTicketById);
router.post('/', ticketController.createTicket);
router.put('/:id', authorizeTicketOwner, ticketController.updateTicket);
router.delete('/:id', authorizeTicketOwner, ticketController.deleteTicket);

module.exports = router;