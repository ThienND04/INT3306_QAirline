const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/TicketController');
const authenticateToken = require('../middlewares/auth/authToken');
const authorizeRoles = require('../middlewares/auth/authRoles');
const authorizeTicketOwner = require('../middlewares/ownership/authorizeTicketOwner');

router.use(authenticateToken);

router.get('/:id', authorizeTicketOwner, ticketController.getTicketById);
router.post('/book', ticketController.bookTicket);
router.put('/:id', authorizeTicketOwner, ticketController.updateTicket);
router.delete('/cancel/:id', authorizeTicketOwner, ticketController.cancelTicket);
router.get('/', authorizeRoles('admin'), ticketController.getAllTickets);

module.exports = router;