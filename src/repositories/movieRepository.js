import prisma from "#lib/prisma.js";

class MovieRepository {
  async getAllMovies() {
    return await prisma.movies.findMany();
  }

  async getMovieById(id) {
    return await prisma.movies.findFirst({
      where: {
        id,
      },
    });
  }

  async getMoviesByStatus(status) {
    return await prisma.movies.findMany({
      where: {
        movie_status: {
          is: {
            name: status
          }
        }
      }
    })
  }

  async getMovieBytitle(title) {
    return await prisma.movies.findFirst({
      where: {
        title
      }
    })
  }

  async createMovie(data) {
    return await prisma.movies.create({
      data,
    });
  }

  async deleteMovieById(id) {
    return await prisma.movies.delete({
      where: {
        id,
      },
    });
  }

  async updateMovieById(id, data) {
    return await prisma.movies.update({
      where: {
        id,
      },
      data,
    });
  }
}

export default MovieRepository
