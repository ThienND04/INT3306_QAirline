const express = require('express');
const router = express.Router();
const aircraftController = require('../controllers/AircraftController');
const authMiddleware = require('../middlewares/AuthMiddleware');

router.use(authMiddleware); // Sử dụng middleware xác thực cho tất cả các route
router.get('/', aircraftController.getAllAircrafts); // Lấy danh sách tất cả máy bay
router.get('/:id', aircraftController.getAircraftById); // Lấy thông tin máy bay theo ID
router.post('/', aircraftController.createAircraft); // Thêm máy bay mới
router.put('/:id', aircraftController.updateAircraft); // Cập nhật thông tin máy bay
router.delete('/:id', aircraftController.deleteAircraft); // Xóa máy bay theo ID

module.exports = router;