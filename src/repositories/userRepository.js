import prisma from "#lib/prisma.js";

class UserRepository {
  async getPaginatedUsers(page = 1, perPage = 10, filter = {}) {

    const [users, meta] = await prisma.users.paginate().withPages({
      limit: perPage,
      page,
    });
    
    return {
      data: users,
      meta,
    };
  }
  async countUsers() {
    return await prisma.users.count();
  }

  async getAllUsers() {
    return await prisma.users.findMany({
      skip: 1,
      take: 1,
    });
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

  async getUserRoleByEmail(email) {
    const user = await prisma.users.findUnique({
      where: {
        email
      },
      include: {
        role_user: {
          include: {
            roles: true
          }
        }
      }
    })
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role_user[0]?.roles?.name || "guest"
    }
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
