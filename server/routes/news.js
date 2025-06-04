const express = require('express');
const router = express.Router();
const newsController = require('../controllers/NewsController');
const authenticateToken = require('../middlewares/auth/authToken');
const authorizeRoles = require('../middlewares/auth/authRoles');
const upload = require('../middlewares/upload');

// Routes for admin (Create, Update, Delete)
router.post('/create', authenticateToken, authorizeRoles('admin'), upload.single('image'), newsController.createNews);
router.put('/:id', authenticateToken, authorizeRoles('admin'), newsController.updateNews);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), newsController.deleteNews);

// Public routes (Get all, Get by ID)
router.get('/:id', newsController.getNewsById); 
router.get('/', newsController.getAllNews);


module.exports = router;