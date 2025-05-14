import prisma from "#lib/prisma.js";

class MovieScheduleRepository {
  // Mendapatkan semua jadwal film dengan pagination
  async getAllMovieSchedules(page = 1, perPage = 10) {
    return await prisma.movie_schedules.paginate({
      include: {
        movies: true,
        theaters: true,
      },
    }).withPages({
      limit: perPage,
      page,
    });
  }

  // Mendapatkan jadwal film berdasarkan ID
  async getMovieScheduleById(id) {
    return await prisma.movie_schedules.findFirst({
      where: {
        id,
      },
      include: {
        movies: true,
        theaters: true,
        reservations: true,
      },
    });
  }

  // Mendapatkan jadwal film berdasarkan ID film
  async getMovieSchedulesByMovieId(movieId, page = 1, perPage = 10) {
    return await prisma.movie_schedules.paginate({
      where: {
        movie_id: movieId,
      },
      include: {
        movies: true,
        theaters: {
          include: {
            locations: true,
            studios: true,
          },
        },
      },
    }).withPages({
      limit: perPage,
      page,
    });
  }

  // Mendapatkan jadwal film berdasarkan ID teater
  async getMovieSchedulesByTheaterId(theaterId, page = 1, perPage = 10) {
    return await prisma.movie_schedules.paginate({
      where: {
        theater_id: theaterId,
      },
      include: {
        movies: true,
      },
    }).withPages({
      limit: perPage,
      page,
    });
  }

  // Mendapatkan jadwal film yang tersedia (berdasarkan movie_availability)
  async getAvailableMovieSchedules(page = 1, perPage = 10) {
    return await prisma.movie_schedules.paginate({
      where: {
        movies: {
          movie_availability: {
            some: {
              movie_status: {
                name: "Now Showing",
              },
            },
          },
        },
      },
      include: {
        movies: true,
        theaters: {
          include: {
            locations: true,
          },
        },
      },
    }).withPages({
      limit: perPage,
      page,
    });
  }

  // Membuat jadwal film baru
  async createMovieSchedule(data) {
    return await prisma.movie_schedules.create({
      data,
      include: {
        movies: true,
        theaters: true,
      },
    });
  }

  // Menghapus jadwal film berdasarkan ID
  async deleteMovieScheduleById(id) {
    return await prisma.movie_schedules.delete({
      where: {
        id,
      },
    });
  }

  // Memperbarui jadwal film berdasarkan ID
  async updateMovieScheduleById(id, data) {
    return await prisma.movie_schedules.update({
      where: {
        id,
      },
      data,
      include: {
        movies: true,
        theaters: true,
      },
    });
  }
}

export default MovieScheduleRepository;