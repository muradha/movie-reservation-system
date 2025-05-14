import express from "express";
import {
  getAllMovieSchedules,
  getMovieScheduleById,
  getMovieSchedulesByMovieId,
  getMovieSchedulesByTheaterId,
  getAvailableMovieSchedules,
  createMovieSchedule,
  updateMovieSchedule,
  deleteMovieSchedule,
} from "../controllers/movieScheduleController.js";
import authorize from "#middlewares/authorize.js";

const router = express.Router();

// Public routes
router.get("/", getAllMovieSchedules);
router.get("/available", getAvailableMovieSchedules);
router.get("/:scheduleId", getMovieScheduleById);
router.get("/movie/:movieId", getMovieSchedulesByMovieId);
router.get("/theater/:theaterId", getMovieSchedulesByTheaterId);

// Protected routes (admin only)
router.post("/", authorize("admin"), createMovieSchedule);
router.put("/:scheduleId", authorize("admin"), updateMovieSchedule);
router.delete("/:scheduleId", authorize("admin"), deleteMovieSchedule);

export default router;