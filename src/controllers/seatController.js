import SeatService from "#services/seatService.js";
import { sendSuccess } from "../utils/response.js";

const seatService = new SeatService();

// Mendapatkan semua kursi berdasarkan studio_id
const getAllSeatsByStudioId = async (req, res, next) => {
  try {
    const { studioId } = req.params;
    const seats = await seatService.getAllSeatsByStudioId(parseInt(studioId));

    return sendSuccess(res, seats, "Kursi berhasil diambil", 200);
  } catch (error) {
    next(error);
  }
};

// Mendapatkan kursi berdasarkan ID
const getSeatById = async (req, res, next) => {
  try {
    const { seatId } = req.params;
    const seat = await seatService.getSeatById(parseInt(seatId));

    return sendSuccess(res, seat, "Kursi berhasil diambil", 200);
  } catch (error) {
    next(error);
  }
};

// Mendapatkan kursi yang tersedia pada jadwal tertentu
const getAvailableSeatsBySchedule = async (req, res, next) => {
  try {
    const { scheduleId } = req.params;
    const { showDate } = req.query;

    if (!showDate) {
      return res.status(400).json({
        status: false,
        message: "Tanggal pertunjukan diperlukan",
      });
    }

    const availableSeats = await seatService.getAvailableSeatsBySchedule(
      parseInt(scheduleId),
      showDate
    );

    return sendSuccess(res, availableSeats, "Kursi tersedia berhasil diambil", 200);
  } catch (error) {
    next(error);
  }
};

// Mendapatkan status kursi pada jadwal tertentu (tersedia/tidak tersedia)
const getSeatStatusBySchedule = async (req, res, next) => {
  try {
    const { scheduleId } = req.params;
    const { showDate } = req.query;

    if (!showDate) {
      return res.status(400).json({
        status: false,
        message: "Tanggal pertunjukan diperlukan",
      });
    }

    const seatStatus = await seatService.getSeatStatusBySchedule(
      parseInt(scheduleId),
      showDate
    );

    return sendSuccess(res, seatStatus, "Status kursi berhasil diambil", 200);
  } catch (error) {
    next(error);
  }
};

// Validasi ketersediaan kursi
const validateSeatAvailability = async (req, res, next) => {
  try {
    const { scheduleId, seatId } = req.params;
    const { showDate } = req.query;

    if (!showDate) {
      return res.status(400).json({
        status: false,
        message: "Tanggal pertunjukan diperlukan",
      });
    }

    const isAvailable = await seatService.validateSeatAvailability(
      parseInt(scheduleId),
      parseInt(seatId),
      showDate
    );

    return sendSuccess(res, { is_available: isAvailable }, "Validasi kursi berhasil", 200);
  } catch (error) {
    next(error);
  }
};

export {
  getAllSeatsByStudioId,
  getSeatById,
  getAvailableSeatsBySchedule,
  getSeatStatusBySchedule,
  validateSeatAvailability,
};