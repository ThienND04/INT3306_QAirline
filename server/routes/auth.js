const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

router.post('/register', authController.register); 
router.post('/login', authController.login); 
router.post('/forgot-password', authController.forgotPassword);
router.post('/verify-otp', authController.verifyOtp);
router.put('/reset-password', authController.resetPassword);

module.exports = router;