import { Router } from "express";
import { getUsers, createUser, updateUser, deleteUser } from "#controllers/userController.js";
import validateSchema from "#middlewares/validateSchema.js";
import userSchema from "#validators/userSchema.js";
import { ParseIntPipe } from "#pipes/index.js";

const router = Router();

router.get("/", getUsers);
router.post("/", validateSchema(userSchema.create), createUser);
router.put("/:id", ParseIntPipe("id"), validateSchema(userSchema.update), updateUser);
router.delete("/:id", ParseIntPipe("id"), deleteUser);

export default router;
