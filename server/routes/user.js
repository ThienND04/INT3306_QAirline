const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authenticateToken = require('../middlewares/auth/authToken');
const authorizeRoles = require('../middlewares/auth/authRoles');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /user/update:
 *   put:
 *     summary: Update the current user's information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - phoneNumber
 *               - lastName
 *               - middleAndFirstName
 *               - gender
 *               - birthDate
 *               - nationality
 *               - language
 *             properties:
 *               email:
 *                 type: string
 *                 example: abc@gmail.com
 *               phoneNumber:
 *                 type: string
 *                 example: 0123742313
 *               lastName:
 *                 type: string
 *                 example: Nguyen
 *               middleAndFirstName:
 *                 type: string
 *                 example: Duc Thien
 *               displayOrder:
 *                 type: number
 *                 example: 1
 *               gender:
 *                 type: string
 *                 example: Nam
 *               birthDate:
 *                 type: object
 *                 properties:
 *                   day:
 *                     type: number
 *                     example: 9
 *                   month:
 *                     type: number
 *                     example: 10
 *                   year:
 *                     type: number
 *                     example: 2004
 *                 description: Birth date in the format of day/month/year
 *               address:
 *                 type: string
 *                 example: 123 Main Street, Hanoi
 *               nationality:
 *                 type: string
 *                 example: Viet Nam
 *               language:
 *                 type: string
 *                 example: Tieng Viet
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get the current user's information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You do not have permission
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /users/all:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You do not have permission
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You do not have permission
 *       404:
 *         description: User not found
 *   put:
 *     summary: Update a user by ID (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - phoneNumber
 *               - lastName
 *               - middleAndFirstName
 *               - gender
 *               - birthDate
 *               - nationality
 *               - language
 *             properties:
 *               email:
 *                 type: string
 *                 example: abc@gmail.com
 *               phoneNumber:
 *                 type: string
 *                 example: 0123742313
 *               lastName:
 *                 type: string
 *                 example: Nguyen
 *               middleAndFirstName:
 *                 type: string
 *                 example: Duc Thien
 *               displayOrder:
 *                 type: number
 *                 example: 1
 *               gender:
 *                 type: string
 *                 example: Nam
 *               birthDate:
 *                 type: object
 *                 properties:
 *                   day:
 *                     type: number
 *                     example: 9
 *                   month:
 *                     type: number
 *                     example: 10
 *                   year:
 *                     type: number
 *                     example: 2004
 *                 description: Birth date in the format of day/month/year
 *               address:
 *                 type: string
 *                 example: 123 Main Street, Hanoi
 *               nationality:
 *                 type: string
 *                 example: Viet Nam
 *               language:
 *                 type: string
 *                 example: Tieng Viet
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You do not have permission
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     summary: Delete a user by ID (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You do not have permission
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.put('/update', authenticateToken, userController.updateUser);
router.get('/me', authenticateToken, userController.getCurrentUser);
router.get('/all', authenticateToken, authorizeRoles('admin'), userController.getAllUsers);
router.get('/:id', authenticateToken, authorizeRoles('admin'), userController.getUserById);
router.put('/:id', authenticateToken, authorizeRoles('admin'), userController.updateUser);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), userController.deleteUser);

module.exports = router;
