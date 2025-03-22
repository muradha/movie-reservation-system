import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserRepository {
  /**
   * Mengambil daftar user dengan pagination dan metadata.
   * @param {number} page - Halaman saat ini.
   * @param {number} perPage - Jumlah data per halaman.
   * @param {object} filter - (Opsional) kondisi filter.
   * @returns {Promise<{data: Array, meta: object}>}
   */
  async getPaginatedUsers(page = 1, perPage = 1, filter = {}) {
    const skip = (page - 1) * perPage;

    // Ambil data dan total count secara paralel
    const [data, totalCount] = await Promise.all([
      prisma.users.findMany({
        where: filter,
        skip,
        take: perPage,
        select: { id: true, email: true, name: true }, // ambil field yang diperlukan
      }),
      prisma.users.count({ where: filter }),
    ]);

    const totalPages = Math.ceil(totalCount / perPage);

    return {
      meta: {
        totalCount,
        totalPages,
        currentPage: page,
        perPage,
      },
      data,
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
