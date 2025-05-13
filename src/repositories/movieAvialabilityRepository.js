import prisma from "#lib/prisma.js";


class MovieAvialabilityRepository {
    async createMovieAvialability(data) {
        return await prisma.movie_availability.create({
            data
        })
    }

    async getMovieAvailability(movieId) {
        return await prisma.movie_availability.findMany({
            where: {
                movie_id: movieId
            },
            include: {
                theaters: true,
                movie_status: true
            }
        })
    }

    async getMovieAvailabilityByTheater(movieId, theaterId) {
        return await prisma.movie_availability.findFirst({
            where: {
                movie_id: movieId,
                theater_id: theaterId
            },
            include: {
                movie_status: true
            }
        })
    }

    async updateMovieAvailability(id, data) {
        return await prisma.movie_availability.update({
            where: { id },
            data
        })
    }

    async deleteMovieAvailability(id) {
        return await prisma.movie_availability.delete({
            where: { id }
        })
    }
}

export default MovieAvialabilityRepository;