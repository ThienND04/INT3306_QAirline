const express = require('express');
const router = express.Router();
const aircraftController = require('../controllers/AircraftController');
const authenticateToken = require('../middlewares/auth/authToken');
const authorizeRoles = require('../middlewares/auth/authRoles');

/**
 * @swagger
 * components:
 *   schemas:
 *     Aircraft:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated MongoDB id of the aircraft.
 *           example: "60d0fe4f5311236168a109ca"
 *         AircraftID:
 *           type: string
 *           description: Unique identifier for the aircraft.
 *           example: "A34"
 *         Model:
 *           type: string
 *           description: Model of the aircraft.
 *           example: "Boeing 787 Dreamliner"
 *         Manufacturer:
 *           type: string
 *           description: Manufacturer of the aircraft.
 *           example: "Boeing"
 *         EconomyClassSeats:
 *           type: integer
 *           description: Number of economy class seats.
 *           example: 200
 *         BusinessClassSeats:
 *           type: integer
 *           description: Number of business class seats.
 *           example: 40
 *         FirstClassSeats:
 *           type: integer
 *           description: Number of first class seats.
 *           example: 8
 *         PremiumClassSeats:
 *           type: integer
 *           description: Number of premium class seats.
 *           example: 30
 *         TotalSeats:
 *           type: integer
 *           description: Total number of seats.
 *           example: 278
 *         RangeInKm:
 *           type: integer
 *           description: Range of the aircraft in kilometers.
 *           example: 14100
 *         Description:
 *           type: string
 *           description: Description of the aircraft.
 *           example: "A modern long-haul aircraft with advanced fuel efficiency and comfort."
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2023-01-01T12:00:00Z"
 *     AircraftInput:
 *       type: object
 *       required:
 *         - AircraftID
 *         - Model
 *         - Manufacturer
 *         - TotalSeats
 *       properties:
 *         AircraftID:
 *           type: string
 *           description: Unique identifier for the aircraft.
 *         Model:
 *           type: string
 *           description: Model of the aircraft.
 *         Manufacturer:
 *           type: string
 *           description: Manufacturer of the aircraft.
 *         EconomyClassSeats:
 *           type: integer
 *           description: Number of economy class seats.
 *         BusinessClassSeats:
 *           type: integer
 *           description: Number of business class seats.
 *         FirstClassSeats:
 *           type: integer
 *           description: Number of first class seats.
 *         PremiumClassSeats:
 *           type: integer
 *           description: Number of premium class seats.
 *         TotalSeats:
 *           type: integer
 *           description: Total number of seats.
 *         RangeInKm:
 *           type: integer
 *           description: Range of the aircraft in kilometers.
 *         Description:
 *           type: string
 *           description: Description of the aircraft.
 *       example:
 *         AircraftID: "A35"
 *         Model: "Airbus A350"
 *         Manufacturer: "Airbus"
 *         EconomyClassSeats: 220
 *         BusinessClassSeats: 45
 *         FirstClassSeats: 10
 *         PremiumClassSeats: 35
 *         TotalSeats: 310
 *         RangeInKm: 15000
 *         Description: "A wide-body aircraft known for its long range and passenger comfort."
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

router.use(authenticateToken);
router.use(authorizeRoles('admin'));

/**
 * @swagger
 * tags:
 *   name: Aircraft
 *   description: Aircraft management. Requires admin role.
 */

/**
 * @swagger
 * /api/aircraft:
 *   get:
 *     summary: Retrieve a list of all aircrafts
 *     tags: [Aircraft]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of aircrafts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aircraft'
 *       401:
 *         description: Unauthorized - JWT token is missing or invalid
 *       403:
 *         description: Forbidden - User does not have admin role
 */
router.get('/', aircraftController.getAllAircrafts);

/**
 * @swagger
 * /api/aircraft/{id}:
 *   get:
 *     summary: Get an aircraft by ID
 *     tags: [Aircraft]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The aircraft ID
 *     responses:
 *       200:
 *         description: Aircraft data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aircraft'
 *       401:
 *         description: Unauthorized - JWT token is missing or invalid
 *       403:
 *         description: Forbidden - User does not have admin role
 *       404:
 *         description: Aircraft not found
 */
router.get('/:id', aircraftController.getAircraftById);

/**
 * @swagger
 * /api/aircraft:
 *   post:
 *     summary: Create a new aircraft
 *     tags: [Aircraft]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AircraftInput'
 *     responses:
 *       201:
 *         description: Aircraft created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aircraft'
 *       400:
 *         description: Bad request - Invalid input data
 *       401:
 *         description: Unauthorized - JWT token is missing or invalid
 *       403:
 *         description: Forbidden - User does not have admin role
 */
router.post('/', aircraftController.createAircraft);

/**
 * @swagger
 * /api/aircraft/{id}:
 *   put:
 *     summary: Update an existing aircraft
 *     tags: [Aircraft]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The aircraft ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AircraftInput'
 *     responses:
 *       200:
 *         description: Aircraft updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aircraft'
 *       400:
 *         description: Bad request - Invalid input data
 *       401:
 *         description: Unauthorized - JWT token is missing or invalid
 *       403:
 *         description: Forbidden - User does not have admin role
 *       404:
 *         description: Aircraft not found
 */
router.put('/:id', aircraftController.updateAircraft);

/**
 * @swagger
 * /api/aircraft/{id}:
 *   delete:
 *     summary: Delete an aircraft
 *     tags: [Aircraft]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The aircraft ID
 *     responses:
 *       200:
 *         description: Aircraft deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Aircraft deleted successfully
 *       204:
 *         description: Aircraft deleted successfully (No content)
 *       401:
 *         description: Unauthorized - JWT token is missing or invalid
 *       403:
 *         description: Forbidden - User does not have admin role
 *       404:
 *         description: Aircraft not found
 */
router.delete('/:id', aircraftController.deleteAircraft);

module.exports = router;