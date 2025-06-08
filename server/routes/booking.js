const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/BookingController');
const authenticateToken = require('../middlewares/auth/authToken');
const authorizeRoles = require('../middlewares/auth/authRoles');
const authorizeTicketOwner = require('../middlewares/ownership/authorizeTicketOwner');

router.use(authenticateToken);

router.get('/statistics', bookingController.getBookingStatistics);
router.get('/:id', authorizeTicketOwner, bookingController.getBookingById);
router.get('/user/:userId', bookingController.getBookingsByUserId);
router.get('/flight/:flightCode', bookingController.getBookingsByFlightCode);
router.post('/book', bookingController.bookTickets);
router.put('/:id', authorizeTicketOwner, bookingController.updateBooking);
router.delete('/cancel/:id', authorizeTicketOwner, bookingController.cancelBooking);
router.get('/', authorizeRoles('admin'), bookingController.getAllBookings);

module.exports = router;