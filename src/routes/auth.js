import { login } from "#controllers/authController.js";
import { Router } from "express";

const router = new Router();

router.use("/login", login);

export default router;