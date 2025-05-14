import express from "express";
import {
  getAllSeatsByStudioId,
  getSeatById,
  getAvailableSeatsBySchedule,
  getSeatStatusBySchedule,
  validateSeatAvailability,
} from "../controllers/seatController.js";
import authorize from "#middlewares/authorize.js";

const router = express.Router();

// Public routes
router.get("/studio/:studioId", getAllSeatsByStudioId);
router.get("/schedule/:scheduleId/available", getAvailableSeatsBySchedule);
router.get("/schedule/:scheduleId/status", getSeatStatusBySchedule);
router.get("/schedule/:scheduleId/seat/:seatId/validate", validateSeatAvailability);
router.get("/:seatId", getSeatById);

export default router;