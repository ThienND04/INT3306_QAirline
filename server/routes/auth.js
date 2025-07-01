const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: User registration
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
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
 *               password:
 *                 type: string
 *                 example: 12345678
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
 *         description: Registration successful
 *       400:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags:
 *      - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: abc@gmail.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: abc@gmail.com
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/forgot-password', authController.forgotPassword);

/**
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     summary: Verify OTP for password reset
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 example: abc@gmail.com
 *               otp:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid OTP
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/verify-otp', authController.verifyOtp);

/**
 * @swagger
 * /auth/reset-password:
 *   put:
 *     summary: Reset password
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - resetToken
 *               - newPassword
 *             properties:
 *               resetToken:
 *                 type: string
 *                 example: ajcnhhj12yusdcwfdb87123tyygdsy17gdwdg1827y3ubwdyd781gehbcdyud76218273
 *               newPassword:
 *                 type: string
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put('/reset-password', authController.resetPassword);

module.exports = router;
