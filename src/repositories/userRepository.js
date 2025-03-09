import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserRepository {
  async getAllUsers() {
    return await prisma.users.findMany();
  }

  async getUserByEmail(email) {
    return await prisma.users.findUnique({
      where: {
        email,
      },
    });
  }

  async getUserById(id) {
    return await prisma.users.findFirst({
      where: {
        id,
      },
    });
  }

  async createUser(data) {
    return await prisma.users.create({ data });
  }

  async updateUserById(id, data) {
    return await prisma.users.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteUserById(id) {
    return await prisma.users.delete({
      where: {
        id,
      },
    });
  }
}

export default UserRepository;
