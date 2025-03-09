import { Router } from "express";
import { getUsers, createUser } from "#controllers/userController.js";
import validateSchema from "#middlewares/validateSchema.js";
import userSchema from "#validators/userSchema.js";

const router = Router();

router.get("/", getUsers);
router.post("/", validateSchema(userSchema), createUser);

export default router;
