import MovieService from "#services/movieService.js";
import { sendSuccess } from "../utils/response.js";

const movieService = new MovieService;

const getAllMovies = async (req, res, next) => {
    try {
        const movies = await movieService.fetchAllMovies();

        sendSuccess(res, movies, "Movies fetched", 200)
    } catch (error) {
        next(error);
    }
}

const createMovie = async (req, res, next) => {
    try {
        const movie = await movieService.createMovie(req.body);

        sendSuccess(res, movie, "Movie created", 201);
    } catch (error) {
        next(error);
    }
}

const updateMovie = async (req, res, next) => {
    try {
        const { movieId } = req.params;

        const movie = await movieService.updateMovie(movieId, req.body);

        sendSuccess(res, movie, "Movie updated", 200);
    } catch (error) {
        next(error);
    }
}

const deleteMovie = async (req, res, next) => {
    try {
        const { movieId } = req.params;

        const movie = await movieService.deleteMovie(movieId);

        sendSuccess(res, movie, "Movie deleted", 200);
    } catch (error) {
        next(error);
    }
}

export { getAllMovies, createMovie, updateMovie, deleteMovie };