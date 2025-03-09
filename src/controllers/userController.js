import UserService from "#services/userServices.js";
import { sendError, sendSuccess } from "../utils/response.js";

const userService = new UserService();

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.fetchAllUsers();

    sendSuccess(res, users, "User fetched", 200);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await userService.saveUser(req.body);

    sendSuccess(res, user, "User created", 201);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.updateUser({ id, data: req.body });

    sendSuccess(res, user, "User updated", 200);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userService.deleteUser(id);

    sendSuccess(res, user, "User deleted", 400);
  } catch (error) {
    next(error);
  }
};

export { getUsers, createUser, updateUser, deleteUser };
