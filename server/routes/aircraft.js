const express = require('express');
const router = express.Router();
const aircraftController = require('../controllers/AircraftController');
const authenticateToken = require('../middlewares/auth/authToken');
const authorizeRoles = require('../middlewares/auth/authRoles');

/**
 * @swagger
 * tags:
 *  name: Aircrafts
 *  description: API endpoints for managing aircrafts
 */

/**
 * @swagger
 * /aircraft/{id}:
 *   put:
 *     summary: Update an aircraft by ID
 *     tags: [Aircrafts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the aircraft to update
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         required: true
 *         description: Aircraft details to update
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Name of the aircraft
 *             model:
 *               type: string
 *               description: Model of the aircraft
 *             capacity:
 *               type: number
 *               description: Capacity of the aircraft
 *           required:
 *             - name
 *             - model
 *             - capacity
 *     responses:
 *       200:
 *         description: Aircraft updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Aircraft not found
 */

/**
 * @swagger
 * /aircraft/{id}:
 *   delete:
 *     summary: Soft delete an aircraft by ID
 *     tags: [Aircrafts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the aircraft to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aircraft soft deleted successfully
 *       404:
 *         description: Aircraft not found
 */

/**
 * @swagger
 * /aircraft/hard-delete/{id}:
 *   delete:
 *     summary: Hard delete an aircraft by ID
 *     tags: [Aircrafts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the aircraft to hard delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aircraft hard deleted successfully
 *       404:
 *         description: Aircraft not found
 */

/**
 * @swagger
 * /aircraft/deleted:
 *   get:
 *     summary: Get all deleted aircrafts
 *     tags: [Aircrafts]
 *     responses:
 *       200:
 *         description: List of all deleted aircrafts
 */

/**
 * @swagger
 * /aircraft/{id}/restore:
 *   patch:
 *     summary: Restore a deleted aircraft by ID
 *     tags: [Aircrafts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the aircraft to restore
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aircraft restored successfully
 *       404:
 *         description: Aircraft not found
 */

/**
 * @swagger
 * /aircraft/{id}:
 *   get:
 *     summary: Get an aircraft by ID
 *     tags: [Aircrafts]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the aircraft to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aircraft details
 *       404:
 *         description: Aircraft not found
 */

/**
 * @swagger
 * /aircraft:
 *   post:
 *     summary: Create a new aircraft
 *     tags: [Aircrafts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the aircraft
 *               model:
 *                 type: string
 *                 description: Model of the aircraft
 *               capacity:
 *                 type: number
 *                 description: Capacity of the aircraft
 *             required:
 *               - name
 *               - model
 *               - capacity
 *     responses:
 *       201:
 *         description: Aircraft created successfully
 *       400:
 *         description: Invalid input data
 */

/**
 * @swagger
 * /aircraft:
 *   get:
 *     summary: Get all aircrafts
 *     tags: [Aircrafts]
 *     responses:
 *       200:
 *         description: List of all aircrafts
 */

router.use(authenticateToken);
router.use(authorizeRoles('admin'));

router.put('/:id', aircraftController.updateAircraft);
router.delete('/:id', aircraftController.deleteAircraft);
router.delete('/hard-delete/:id', aircraftController.hardDeleteAircraft);
router.get('/deleted', aircraftController.getDeletedAircrafts);
router.patch('/:id/restore', aircraftController.restoreAircraft);
router.get('/:id', aircraftController.getAircraftById);
router.post('/', aircraftController.createAircraft);
router.get('/', aircraftController.getAllAircrafts);

module.exports = router;
