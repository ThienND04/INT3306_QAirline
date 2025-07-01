const express = require('express');
const router = express.Router();
const airportController = require('../controllers/AirportController');
const authenticateToken = require('../middlewares/auth/authToken');
const authorizeRoles = require('../middlewares/auth/authRoles');

/**
 * @swagger
 * tags:
 *   name: Airports
 *   description: API endpoints for managing airports
 */

/**
 * @swagger
 * /airports/deleted:
 *   get:
 *     summary: Get all deleted airports (only for admin)
 *     tags: [Airports]
 *     responses:
 *       200:
 *         description: List of all deleted airports
 *       401:
 *         description: Unauthorized access, token is invalid
 *       403:
 *         description: Unauthorized access, only admins can view deleted airports
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /airports/search:
 *   get:
 *     summary: Search airports
 *     tags: [Airports]
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         description: Search query for airports
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of airports matching the search query
 */

/**
 * @swagger
 * /airports/iata/{iataCode}:
 *   get:
 *     summary: Get airport by IATA code
 *     tags: [Airports]
 *     parameters:
 *       - name: iataCode
 *         in: path
 *         required: true
 *         description: IATA code of the airport
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Airport details
 *       404:
 *         description: Airport not found
 */

/**
 * @swagger
 * /airports/{id}:
 *   get:
 *     summary: Get airport by ID
 *     tags: [Airports]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the airport
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Airport details
 *       404:
 *         description: Airport not found
 */

/**
 * @swagger
 * /airports:
 *   get:
 *     summary: Get all airports
 *     tags: [Airports]
 *     responses:
 *       200:
 *         description: List of all airports
 */

/**
 * @swagger
 * /airports:
 *   post:
 *     summary: Create a new airport
 *     tags: [Airports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the airport
 *               iataCode:
 *                 type: string
 *                 description: IATA code of the airport
 *               location:
 *                 type: string
 *                 description: Location of the airport
 *             required:
 *               - name
 *               - iataCode
 *               - location
 *     responses:
 *       201:
 *         description: Airport created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized access, token is invalid
 *       403:
 *         description: Unauthorized access, only admins can create airports
 */

/**
 * @swagger
 * /airports/{id}:
 *   put:
 *     summary: Update an airport by ID
 *     tags: [Airports]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the airport to update
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         required: true
 *         description: Airport details to update
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Name of the airport
 *             iataCode:
 *               type: string
 *               description: IATA code of the airport
 *             location:
 *               type: string
 *               description: Location of the airport
 *           required:
 *             - name
 *             - iataCode
 *             - location
 *     responses:
 *       200:
 *         description: Airport updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Airport not found
 *       401:
 *         description: Unauthorized access, token is invalid
 *       403:
 *         description: Unauthorized access, only admins can update airports
 */

/**
 * @swagger
 * /airports/{id}:
 *   delete:
 *     summary: Soft delete an airport by ID
 *     tags: [Airports]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the airport to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Airport soft deleted successfully
 *       404:
 *         description: Airport not found
 *       401:
 *         description: Unauthorized access, token is invalid
 *       403:
 *         description: Unauthorized access, only admins can delete airports
 */

/**
 * @swagger
 * /airports/hard-delete/{id}:
 *   delete:
 *     summary: Hard delete an airport by ID
 *     tags: [Airports]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the airport to hard delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Airport hard deleted successfully
 *       404:
 *         description: Airport not found
 *       401:
 *         description: Unauthorized access, token is invalid
 *       403:
 *         description: Unauthorized access, only admins can hard delete airports
 */

/**
 * @swagger
 * /airports/restore/{id}:
 *   patch:
 *     summary: Restore a deleted airport by ID
 *     tags: [Airports]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the airport to restore
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Airport restored successfully
 *       404:
 *         description: Airport not found
 *       401:
 *         description: Unauthorized access, token is invalid
 *       403:
 *         description: Unauthorized access, only admins can restore airports
 */

router.get(
    '/deleted',
    authenticateToken,
    authorizeRoles('admin'),
    airportController.getDeletedAirports,
);
router.get('/search', airportController.searchAirports);
router.get('/iata/:iataCode', airportController.getAirportByIATACode);
router.get('/:id', airportController.getAirportById);
router.get('/', airportController.getAllAirports);
router.post('/', authenticateToken, authorizeRoles('admin'), airportController.createAirport);
router.put('/:id', authenticateToken, authorizeRoles('admin'), airportController.updateAirport);
router.delete('/:id', authorizeRoles('admin'), airportController.deleteAirport);
router.delete(
    '/hard-delete/:id',
    authenticateToken,
    authorizeRoles('admin'),
    airportController.hardDeleteAirport,
);
router.patch(
    '/restore/:id',
    authenticateToken,
    authorizeRoles('admin'),
    airportController.restoreAirport,
);

module.exports = router;
