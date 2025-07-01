const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/BookingController');
const authenticateToken = require('../middlewares/auth/authToken');
const authorizeRoles = require('../middlewares/auth/authRoles');
const authorizeTicketOwner = require('../middlewares/ownership/authorizeTicketOwner');

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: API endpoints for managing bookings
 */

/**
 * @swagger
 * /bookings/fake-booking:
 *   post:
 *     summary: Create a fake booking for price estimation
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               outbound:
 *                 type: object
 *                 properties:
 *                   flightCode:
 *                     type: string
 *                     description: Code of the outbound flight
 *                   bookingClass:
 *                     type: string
 *                     description: Booking class (Economy, Business, etc.)
 *               returnFlight:
 *                 type: object
 *                 properties:
 *                   flightCode:
 *                     type: string
 *                     description: Code of the return flight
 *                   bookingClass:
 *                     type: string
 *                     description: Booking class (Economy, Business, etc.)
 *               adultCount:
 *                 type: integer
 *                 description: Number of adults
 *               childCount:
 *                 type: integer
 *                 description: Number of children
 *               infantCount:
 *                 type: integer
 *                 description: Number of infants
 *             required:
 *               - outbound
 *               - adultCount
 *               - childCount
 *               - infantCount
 *     responses:
 *       201:
 *         description: Fake booking created successfully
 *       400:
 *         description: Invalid input data
 */

/**
 * @swagger
 * /bookings/statistics:
 *   get:
 *     summary: Retrieve booking statistics for the last 6 months
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: Booking statistics retrieved successfully
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Retrieve booking details by ID
 *     tags: [Bookings]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the booking
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking details retrieved successfully
 *       404:
 *         description: Booking not found
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden access
 */

/**
 * @swagger
 * /bookings/user/{userId}:
 *   get:
 *     summary: Retrieve bookings by user ID
 *     tags: [Bookings]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of bookings retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /bookings/flight/{flightCode}:
 *   get:
 *     summary: Retrieve bookings by flight code
 *     tags: [Bookings]
 *     parameters:
 *       - name: flightCode
 *         in: path
 *         required: true
 *         description: Code of the flight
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of bookings retrieved successfully
 *       404:
 *         description: Flight not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /bookings/book:
 *   post:
 *     summary: Book tickets for a flight
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               outbound:
 *                 type: object
 *                 properties:
 *                   flightCode:
 *                     type: string
 *                     description: Code of the outbound flight
 *                   bookingClass:
 *                     type: string
 *                     description: Booking class (Economy, Business, etc.)
 *               returnFlight:
 *                 type: object
 *                 properties:
 *                   flightCode:
 *                     type: string
 *                     description: Code of the return flight
 *                   bookingClass:
 *                     type: string
 *                     description: Booking class (Economy, Business, etc.)
 *               adultCount:
 *                 type: integer
 *                 description: Number of adults
 *               childCount:
 *                 type: integer
 *                 description: Number of children
 *               infantCount:
 *                 type: integer
 *                 description: Number of infants
 *             required:
 *               - outbound
 *               - adultCount
 *               - childCount
 *               - infantCount
 *     responses:
 *       201:
 *         description: Tickets booked successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /bookings/{id}:
 *   put:
 *     summary: Update booking details by ID
 *     tags: [Bookings]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the booking to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tickets:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     seatNumber:
 *                       type: string
 *                       description: Seat number
 *                     price:
 *                       type: number
 *                       description: Ticket price
 *             required:
 *               - tickets
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Booking not found
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden access
 */

/**
 * @swagger
 * /bookings/cancel/{id}:
 *   delete:
 *     summary: Cancel a booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the booking to cancel
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking canceled successfully
 *       404:
 *         description: Booking not found
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden access
 */

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Retrieve all bookings (admin only)
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: List of all bookings retrieved successfully
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: Forbidden access
 */

router.use(authenticateToken);

router.post('/fake-booking', bookingController.fakeBooking);
router.get('/statistics', bookingController.getBookingStatistics);
router.get('/:id', authorizeTicketOwner, bookingController.getBookingById);
router.get('/user/:userId', bookingController.getBookingsByUserId);
router.get('/flight/:flightCode', bookingController.getBookingsByFlightCode);
router.post('/book', bookingController.bookTickets);
router.put('/:id', authorizeTicketOwner, bookingController.updateBooking);
router.delete('/cancel/:id', authorizeTicketOwner, bookingController.cancelBooking);
router.get('/', authorizeRoles('admin'), bookingController.getAllBookings);

module.exports = router;
