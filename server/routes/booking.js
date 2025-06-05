const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/BookingController');
const authenticateToken = require('../middlewares/auth/authToken');
const authorizeRoles = require('../middlewares/auth/authRoles');
const authorizeTicketOwner = require('../middlewares/ownership/authorizeTicketOwner');

router.use(authenticateToken);

router.get('/:id', authorizeTicketOwner, ticketController.getBookingById);
router.get('/flight/:flightCode', ticketController.getBookingsByFlightCode);
router.post('/book', ticketController.bookTickets);
router.put('/:id', authorizeTicketOwner, ticketController.updateBooking);
router.delete('/cancel/:id', authorizeTicketOwner, ticketController.cancelBooking);
router.get('/', authorizeRoles('admin'), ticketController.getAllBookings);

module.exports = router;