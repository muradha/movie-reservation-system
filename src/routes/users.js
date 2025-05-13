import { Router } from "express";
import { getUsers, createUser, updateUser, deleteUser } from "#controllers/userController.js";
import validateSchema from "#middlewares/validateSchema.js";
import userSchema from "#validators/userSchema.js";
import { ParseIntPipe } from "#pipes/index.js";
import authorize from "#middlewares/authorize.js";

const router = Router();

router.get("/", authorize("users", "read"), getUsers);
router.post("/", authorize("users", "write"), validateSchema(userSchema.create), createUser);
router.put("/:id", ParseIntPipe("id"), authorize("users", "wirte"), validateSchema(userSchema.update), updateUser);
router.delete("/:id", ParseIntPipe("id"), authorize("users", "delete"), deleteUser);

export default router;
