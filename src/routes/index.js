// routes/index.js
import express from "express";
import routeUsers from "./users.js"; // Assuming users.js exports a router

const router = express.Router();

// Mount the user routes under a path, e.g. /users
router.use("/users", routeUsers);

export default router;
