// routes/index.js
import express from "express";
import routeUsers from "./users.js"; // Assuming users.js exports a router
import routeAuth from "./auth.js"; // Assuming users.js exports a router
import routeMovie from "./movie.js";
import routeTheater from "./theater.js";
import authenticateJWT from "#middlewares/authMiddleware.js";

const router = express.Router();

// Mount the user routes under a path, e.g. /users
router.use(authenticateJWT);
router.use("/users", routeUsers);
router.use("/auth", routeAuth);
router.use("/movies", routeMovie);
router.use("/theaters", routeTheater);

export default router;
