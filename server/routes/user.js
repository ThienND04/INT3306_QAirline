const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authenticateToken = require('../middlewares/auth/authToken');
const authorizeRoles = require('../middlewares/auth/authRoles');

router.post('/register', userController.register); 
router.post('/login', userController.login); 
router.put('/update', authenticateToken, userController.updateUser);
router.get('/me', authenticateToken, userController.getCurrentUser);
router.post('/forgot-password', userController.forgotPassword);
router.put('/reset-password', userController.resetPassword);
router.get('/all', authenticateToken, authorizeRoles('admin'), userController.getAllUsers);
router.get('/:id', authenticateToken, authorizeRoles('admin'), userController.getUserById);
router.put('/:id', authenticateToken, authorizeRoles('admin'), userController.updateUser);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), userController.deleteUser);

module.exports = router;