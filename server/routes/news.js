const express = require('express');
const router = express.Router();
const newsController = require('../controllers/NewsController');
const authenticateToken = require('../middlewares/auth/authToken');
const authorizeRoles = require('../middlewares/auth/authRoles');
const upload = require('../middlewares/upload');

// router.use(authenticateToken);

router.post(
    '/create',
    authenticateToken,
    authorizeRoles('admin'),
    upload.single('image'),
    newsController.createNews,
);
router.put('/:id', authenticateToken, authorizeRoles('admin'), newsController.updateNews);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), newsController.deleteNews);

router.get('/:id', newsController.getNewsById);
router.get('/', newsController.getAllNews);

module.exports = router;
