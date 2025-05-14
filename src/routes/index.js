// routes/index.js
import express from "express";
import authenticateJWT from "#middlewares/authMiddleware.js";
import routeUsers from "./users.js"; // Assuming users.js exports a router
import routeAuth from "./auth.js"; // Assuming users.js exports a router
import routeMovie from "./movie.js";
import routeTheater from "./theater.js";
import movieScheduleRoutes from "./movieSchedule.js";
import seatRoutes from "./seat.js";

const router = express.Router();

// Mount the user routes under a path, e.g. /users
router.use("/users", authenticateJWT, routeUsers);
router.use("/auth", routeAuth);
router.use("/movies", routeMovie);
router.use("/theaters", routeTheater);
router.use("/movie-schedules", movieScheduleRoutes);
router.use("/seats", seatRoutes);

export default router;
