const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/NotificationController');
const authenticateToken = require('../middlewares/auth/authToken');
const authorizeRoles = require('../middlewares/auth/authRoles');

router.use(authenticateToken);

router.get('/:userId', notificationController.getNotificationsByUser);
router.post('/', authorizeRoles('admin'), notificationController.createNotification);
router.put('/:id/mark-as-read', notificationController.markAsRead);
router.delete('/:id', notificationController.deleteNotification);


module.exports = router;