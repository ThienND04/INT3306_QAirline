const express = require("express");
const router = express.Router();
const flightController = require("../controllers/FlightController");
const authenticateToken = require("../middlewares/auth/authToken");
const authorizeRoles = require("../middlewares/auth/authRoles");

// router.use(authenticateToken);

router.get("/search", flightController.searchFlights);
router.put('/delay', authenticateToken, authorizeRoles('admin'), flightController.delayFlight);
router.put("/:id", authenticateToken, authorizeRoles("admin"), flightController.updateFlight);
router.delete("/:id", authenticateToken, authorizeRoles("admin"), flightController.deleteFlight);
router.get("/search_recent_flight", flightController.getRecentFlights);
router.delete(
	"/hard-delete/:id",
	authenticateToken,
	authorizeRoles("admin"),
	flightController.hardDeleteFlight
);
router.get(
	"/deleted",
	authenticateToken,
	authorizeRoles("admin"),
	flightController.getDeletedFlights
);
router.patch(
	"/restore/:id",
	authenticateToken,
	authorizeRoles("admin"),
	flightController.restoreFlight
);
router.get("/", flightController.getAllFlights);
router.get("/:id", flightController.getFlightById);
router.post("/", authenticateToken, authorizeRoles("admin"), flightController.createFlight);

module.exports = router;
