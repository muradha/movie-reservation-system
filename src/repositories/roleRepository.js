import prisma from "#lib/prisma.js";

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
