import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserRepository {
  async getAllUsers() {
    return await prisma.users.findMany();
  }

  async createUser(data) {
    return await prisma.users.create({ data });
  }
}

export default UserRepository;
