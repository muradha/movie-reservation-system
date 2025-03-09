import UserService from "#services/userServices.js";

const userService = new UserService();

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.fetchAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const user = await userService.saveUser(req.body);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export { getUsers, createUser };
