import MovieService from "#services/movieService.js";
import { sendSuccess } from "../utils/response.js";

const movieService = new MovieService();

const getAllMovies = async (req, res, next) => {
  try {
    const { page, perPage } = req.query;
    const { data, meta } = await movieService.fetchAllMovies(
      parseInt(page),
      parseInt(perPage)
    );

    return sendSuccess(res, data, "Movies fetched", 200, meta);
  } catch (error) {
    next(error);
  }
};

const getMoviesByStatus = async (req, res, next) => {
  try {
    const { page, perPage } = req.query;
    const { status } = req.params;

    const { data, meta } = await movieService.fetchMoviesByStatus(
      status,
      parseInt(page),
      parseInt(perPage)
    );

    return sendSuccess(res, data, "Movies fetched", 200, meta);
  } catch (error) {
    next(error);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const movie = await movieService.createMovie(req.body);

    return sendSuccess(res, movie, "Movie created", 201);
  } catch (error) {
    next(error);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const movie = await movieService.updateMovie(movieId, req.body);

    return sendSuccess(res, movie, "Movie updated", 200);
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const movie = await movieService.deleteMovie(movieId);

    return sendSuccess(res, movie, "Movie deleted", 200);
  } catch (error) {
    next(error);
  }
};

export {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getMoviesByStatus,
};
