import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TheaterRepository {
  async getAllTheaters() {
    return await prisma.theaters.findMany();
  }

  async getTheaterByName(name){
    return await prisma.theaters.findFirst({
      where: {
        name,
      },
    });
  }

  async getTheaterById(id) {
    return await prisma.theaters.findFirst({
      where: {
        id,
      },
    });
  }

  async createTheater(data) {
    return await prisma.theaters.create({
      data,
    });
  }

  async deleteTheaterById(id) {
    return await prisma.theaters.delete({
      where: {
        id,
      },
    });
  }

  async updateTheaterById(id, data) {
    return await prisma.theaters.update({
      where: {
        id,
      },
      data,
    });
  }
}

export default TheaterRepository;
