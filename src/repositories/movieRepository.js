import prisma from "#lib/prisma.js";

class MovieRepository {
  async getAllMovies() {
    return await prisma.movies.paginate().withPages({});
  }

  async getMovieById(id) {
    return await prisma.movies.findFirst({
      where: {
        id,
      },
    });
  }

  async getMoviesByStatus(status, page = 1, perPage = 10) {
   return await prisma.movies.paginate({
      where: {
        movie_status: {
          is: {
            name: status
          }
        }
      }
    }).withPages({
      limit: perPage,
      page,
    });
  }

  async getMoviesByLocations(){
    return await prisma.movies.findMany({
      
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
