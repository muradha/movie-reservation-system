import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class RoleRepository {
  async getAllRoles() {
    return await prisma.roles.findMany();
  }

  async createRoles(data) {
    return await prisma.roles.create({
      data,
    });
  }
}

export default RoleRepository;
