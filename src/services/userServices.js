import UserRepository from "#repositories/userRepository.js";
import argon2 from "argon2";
import HttpError from "../errors/HttpError.js";

const userRepository = new UserRepository();

class UserService {
  async fetchAllUsers() {
    return await userRepository.getPaginatedUsers();
  }

  async saveUser(data) {
    const user = await userRepository.getUserByEmail(data.email);

    if (user) {
      throw new HttpError(409, "User already exists");
    }

    data.password = await argon2.hash(data.password);

    return await userRepository.createUser(data);
  }

  async updateUser({ id, data }) {
    const user = await userRepository.getUserById(id);

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    if (data?.password) {
      data.password = await argon2.hash(data.password);
    }

    const updatedUser = await userRepository.updateUserById(id, data);

    return updatedUser;
  }

  async deleteUser(id) {
    const user = await userRepository.getUserById(id);

    if (!user) {
      throw new HttpError(404, "User not found");
    }

    return await userRepository.deleteUserById(id);
  }
}

export default UserService;
