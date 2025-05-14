import MovieRepository from "#repositories/movieRepository.js";
import HttpError from "../errors/HttpError.js";

const movieRepository = new MovieRepository;

class MovieService {
    async fetchAllMovies(page, perPage) {
        const [movies, meta] = await movieRepository.getAllMovies(page, perPage);

        return {
            data: movies,
            meta: meta
        }
    }

    async fetchMoviesByStatus(status, page, perPage) {
        const statusMap = {
            "on-showing": "On Showing"
        }
        
        const [movies, meta] = await movieRepository.getMoviesByStatus(statusMap[status], page, perPage);
        
        return {
            data: movies,
            meta: meta
        }
    }

    async createMovie(data) {
        const { title } = data

        const isMovieExist = await movieRepository.getMovieBytitle(title);

        if (isMovieExist) {
            throw new HttpError(400, "Movie already exist");
        }

        return await movieRepository.createMovie(data);
    }

    async updateMovie(id, data) {
        const isMovieExist = await movieRepository.getMovieById(id);

        if (!isMovieExist) {
            throw new HttpError(404, "Movie not found");
        }

        return await movieRepository.updateMovieById(id, data);
    }

    async deleteMovie(id) {
        const isMovieExist = await movieRepository.getMovieById(id);

        if (!isMovieExist) {
            throw new HttpError(404, "Movie not found");
        }

        return await movieRepository.deleteMovieById(id);
    }
}

export default MovieService;