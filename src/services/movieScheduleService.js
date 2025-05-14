import MovieScheduleRepository from "#repositories/movieScheduleRepository.js";
import MovieRepository from "#repositories/movieRepository.js";
import TheaterRepository from "#repositories/theaterRepository.js";
import HttpError from "../errors/HttpError.js";

const movieScheduleRepository = new MovieScheduleRepository();
const movieRepository = new MovieRepository();
const theaterRepository = new TheaterRepository();

class MovieScheduleService {
  async fetchAllMovieSchedules(page, perPage) {
    const [schedules, meta] =
      await movieScheduleRepository.getAllMovieSchedules(page, perPage);

    return {
      data: schedules,
      meta: meta,
    };
  }

  async fetchMovieScheduleById(id) {
    const schedule = await movieScheduleRepository.getMovieScheduleById(id);

    if (!schedule) {
      throw new HttpError(404, "Movie schedule not found");
    }

    return schedule;
  }

  async fetchMovieSchedulesByMovieId(movieId, page, perPage) {
    const movie = await movieRepository.getMovieById(movieId);

    if (!movie) {
      throw new HttpError(404, "Movie not found");
    }

    const [schedules, meta] =
      await movieScheduleRepository.getMovieSchedulesByMovieId(
        movieId,
        page,
        perPage
      );

    return {
      data: schedules,
      meta: meta,
    };
  }

  async fetchMovieSchedulesByTheaterId(theaterId, page, perPage) {
    const theater = await theaterRepository.getTheaterById(theaterId);

    if (!theater) {
      throw new HttpError(404, "Theater not found");
    }

    const [schedules, meta] =
      await movieScheduleRepository.getMovieSchedulesByTheaterId(
        theaterId,
        page,
        perPage
      );

    return {
      data: schedules,
      meta: meta,
    };
  }

  async fetchAvailableMovieSchedules(page, perPage) {
    const [schedules, meta] =
      await movieScheduleRepository.getAvailableMovieSchedules(page, perPage);

    return {
      data: schedules,
      meta: meta,
    };
  }

  async createMovieSchedule(data) {
    const { movie_id, theater_id } = data;

    const movie = await movieRepository.getMovieById(movie_id);
    if (!movie) {
      throw new HttpError(404, "Movie not found");
    }

    const theater = await theaterRepository.getTheaterById(theater_id);
    if (!theater) {
      throw new HttpError(404, "Theater not found");
    }

    return await movieScheduleRepository.createMovieSchedule(data);
  }

  async updateMovieSchedule(id, data) {
    const schedule = await movieScheduleRepository.getMovieScheduleById(id);

    if (!schedule) {
      throw new HttpError(404, "Movie schedule not found");
    }

    if (data.movie_id) {
      const movie = await movieRepository.getMovieById(data.movie_id);
      if (!movie) {
        throw new HttpError(404, "Movie not found");
      }
    }

    if (data.theater_id) {
      const theater = await theaterRepository.getTheaterById(data.theater_id);
      if (!theater) {
        throw new HttpError(404, "Theater not found");
      }
    }

    return await movieScheduleRepository.updateMovieScheduleById(id, data);
  }

  async deleteMovieSchedule(id) {
    const schedule = await movieScheduleRepository.getMovieScheduleById(id);

    if (!schedule) {
      throw new HttpError(404, "Movie schedule not found");
    }

    return await movieScheduleRepository.deleteMovieScheduleById(id);
  }
}

export default MovieScheduleService;
