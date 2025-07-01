const express = require('express');
const router = express.Router();
const flightController = require('../controllers/FlightController');
const authenticateToken = require('../middlewares/auth/authToken');
const authorizeRoles = require('../middlewares/auth/authRoles');

/**
 * @swagger
 * tags:
 *   name: Flights
 *   description: Flight management API
 */

/**
 * @swagger
 * /flights/search:
 *   get:
 *     summary: Search for flights
 *     tags: [Flights]
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *         required: true
 *         description: Departure airport IATA code
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *         required: true
 *         description: Arrival airport IATA code
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Departure date
 *     responses:
 *       200:
 *         description: List of flights matching the criteria
 *       500:
 *         description: Error searching flights
 */

/**
 * @swagger
 * /flights/delay:
 *   put:
 *     summary: Notify flight delay
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               newDepartureTime:
 *                 type: string
 *                 format: date-time
 *               newArrivalTime:
 *                 type: string
 *                 format: date-time
 *               delayReason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Flight delay notification sent successfully
 *       500:
 *         description: Error notifying flight delay
 */

/**
 * @swagger
 * /flights/{id}:
 *   put:
 *     summary: Update flight details
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flight ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Flight updated successfully
 *       404:
 *         description: Flight not found
 *       500:
 *         description: Error updating flight
 */

/**
 * @swagger
 * /flights/{id}:
 *   delete:
 *     summary: Soft delete a flight
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flight ID
 *     responses:
 *       200:
 *         description: Flight deleted successfully
 *       404:
 *         description: Flight not found
 *       500:
 *         description: Error deleting flight
 */

/**
 * @swagger
 * /flights/hard-delete/{id}:
 *   delete:
 *     summary: Permanently delete a flight
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flight ID
 *     responses:
 *       200:
 *         description: Flight permanently deleted successfully
 *       404:
 *         description: Flight not found
 *       500:
 *         description: Error deleting flight
 */

/**
 * @swagger
 * /flights/deleted:
 *   get:
 *     summary: Get all deleted flights
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of deleted flights
 *       500:
 *         description: Error fetching deleted flights
 */

/**
 * @swagger
 * /flights/restore/{id}:
 *   patch:
 *     summary: Restore a deleted flight
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flight ID
 *     responses:
 *       200:
 *         description: Flight restored successfully
 *       404:
 *         description: Flight not found or not deleted
 *       500:
 *         description: Error restoring flight
 */

/**
 * @swagger
 * /flights:
 *   get:
 *     summary: Get all flights
 *     tags: [Flights]
 *     responses:
 *       200:
 *         description: List of all flights
 *       500:
 *         description: Error fetching flights
 */

/**
 * @swagger
 * /flights/{id}:
 *   get:
 *     summary: Get flight details by ID
 *     tags: [Flights]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flight ID
 *     responses:
 *       200:
 *         description: Flight details
 *       404:
 *         description: Flight not found
 *       500:
 *         description: Error fetching flight details
 */

/**
 * @swagger
 * /flights:
 *   post:
 *     summary: Create a new flight
 *     tags: [Flights]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Flight created successfully
 *       500:
 *         description: Error creating flight
 */

router.get('/search', flightController.searchFlights);
router.put('/delay', authenticateToken, authorizeRoles('admin'), flightController.delayFlight);
router.put('/:id', authenticateToken, authorizeRoles('admin'), flightController.updateFlight);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), flightController.deleteFlight);
router.get('/search_recent_flight', flightController.getRecentFlights);
router.delete(
    '/hard-delete/:id',
    authenticateToken,
    authorizeRoles('admin'),
    flightController.hardDeleteFlight,
);
router.get(
    '/deleted',
    authenticateToken,
    authorizeRoles('admin'),
    flightController.getDeletedFlights,
);
router.patch(
    '/restore/:id',
    authenticateToken,
    authorizeRoles('admin'),
    flightController.restoreFlight,
);
router.get('/', flightController.getAllFlights);
router.get('/:id', flightController.getFlightById);
router.post('/', authenticateToken, authorizeRoles('admin'), flightController.createFlight);

module.exports = router;
