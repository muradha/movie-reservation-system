import { fetchAllTheaters } from "#controllers/theaterController.js";
import { Router } from "express";

const router = new Router();

router.get("/", fetchAllTheaters);

export default router;