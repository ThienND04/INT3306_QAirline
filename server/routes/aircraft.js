const express = require('express');
const router = express.Router();
const aircraftController = require('../controllers/AircraftController');
const authenticateToken = require('../middlewares/auth/authToken');
const authorizeRoles = require('../middlewares/auth/authRoles');

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