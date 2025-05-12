const express = require('express');
const router = express.Router();
const aircraftController = require('../controllers/AircraftController');
const authenticateToken = require('../middlewares/auth/authToken');
const authorizeRoles = require('../middlewares/auth/authRoles');

router.use(authenticateToken); 
router.use(authorizeRoles('admin'));

router.get('/', aircraftController.getAllAircrafts); 
router.get('/:id', aircraftController.getAircraftById);
router.post('/', aircraftController.createAircraft);
router.put('/:id', aircraftController.updateAircraft); 
router.delete('/:id', aircraftController.deleteAircraft); 

module.exports = router;