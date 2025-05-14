import MovieScheduleService from "#services/movieScheduleService.js";
import { sendSuccess } from "../utils/response.js";

const movieScheduleService = new MovieScheduleService();

const getAllMovieSchedules = async (req, res, next) => {
  try {
    const { page, perPage } = req.query;
    const { data, meta } = await movieScheduleService.fetchAllMovieSchedules(
      parseInt(page),
      parseInt(perPage)
    );

    return sendSuccess(res, data, "Movie schedules fetched", 200, meta);
  } catch (error) {
    next(error);
  }
};

const getMovieScheduleById = async (req, res, next) => {
  try {
    const { scheduleId } = req.params;
    const schedule = await movieScheduleService.fetchMovieScheduleById(
      parseInt(scheduleId)
    );

    return sendSuccess(res, schedule, "Movie schedule fetched", 200);
  } catch (error) {
    next(error);
  }
};

const getMovieSchedulesByMovieId = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const { page, perPage } = req.query;
    const { data, meta } =
      await movieScheduleService.fetchMovieSchedulesByMovieId(
        parseInt(movieId),
        parseInt(page),
        parseInt(perPage)
      );

    return sendSuccess(res, data, "Movie schedules fetched", 200, meta);
  } catch (error) {
    next(error);
  }
};

const getMovieSchedulesByTheaterId = async (req, res, next) => {
  try {
    const { theaterId } = req.params;
    const { page, perPage } = req.query;
    const { data, meta } =
      await movieScheduleService.fetchMovieSchedulesByTheaterId(
        parseInt(theaterId),
        parseInt(page),
        parseInt(perPage)
      );

    return sendSuccess(res, data, "Movie schedules fetched", 200, meta);
  } catch (error) {
    next(error);
  }
};

const getAvailableMovieSchedules = async (req, res, next) => {
  try {
    const { page, perPage } = req.query;
    const { data, meta } =
      await movieScheduleService.fetchAvailableMovieSchedules(
        parseInt(page),
        parseInt(perPage)
      );

    return sendSuccess(
      res,
      data,
      "Available movie schedules fetched",
      200,
      meta
    );
  } catch (error) {
    next(error);
  }
};

const createMovieSchedule = async (req, res, next) => {
  try {
    const schedule = await movieScheduleService.createMovieSchedule(req.body);

    return sendSuccess(res, schedule, "Movie schedule created", 201);
  } catch (error) {
    next(error);
  }
};

const updateMovieSchedule = async (req, res, next) => {
  try {
    const { scheduleId } = req.params;
    const schedule = await movieScheduleService.updateMovieSchedule(
      parseInt(scheduleId),
      req.body
    );

    return sendSuccess(res, schedule, "Movie schedule updated", 200);
  } catch (error) {
    next(error);
  }
};

const deleteMovieSchedule = async (req, res, next) => {
  try {
    const { scheduleId } = req.params;
    await movieScheduleService.deleteMovieSchedule(parseInt(scheduleId));

    return sendSuccess(res, null, "Movie schedule deleted", 200);
  } catch (error) {
    next(error);
  }
};

export {
  getAllMovieSchedules,
  getMovieScheduleById,
  getMovieSchedulesByMovieId,
  getMovieSchedulesByTheaterId,
  getAvailableMovieSchedules,
  createMovieSchedule,
  updateMovieSchedule,
  deleteMovieSchedule,
};
