import { login, register } from "#controllers/authController.js";
import authSchema from "#validators/authSchema.js";
import validateSchema from "#middlewares/validateSchema.js";
import { Router } from "express";

const router = new Router();

router.use("/login", validateSchema(authSchema.login), login);
router.use("/register", validateSchema(authSchema.register), register);

export default router;