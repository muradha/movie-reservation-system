import SeatRepository from "#repositories/seatRepository.js";
import MovieScheduleRepository from "#repositories/movieScheduleRepository.js";
import HttpError from "../errors/HttpError.js";

const seatRepository = new SeatRepository();
const movieScheduleRepository = new MovieScheduleRepository();

class SeatService {
  // Mendapatkan semua kursi berdasarkan studio_id
  async getAllSeatsByStudioId(studioId) {
    return await seatRepository.getAllSeatsByStudioId(studioId);
  }

  // Mendapatkan kursi berdasarkan ID
  async getSeatById(id) {
    const seat = await seatRepository.getSeatById(id);
    if (!seat) {
      throw new HttpError(404, "Kursi tidak ditemukan");
    }
    return seat;
  }

  // Mendapatkan kursi yang tersedia pada jadwal tertentu
  async getAvailableSeatsBySchedule(scheduleId, showDate) {
    // Validasi jadwal
    const schedule = await movieScheduleRepository.getMovieScheduleById(
      scheduleId
    );
    if (!schedule) {
      throw new HttpError(404, "Jadwal tidak ditemukan");
    }

    // Mendapatkan studio_id dari jadwal
    const studioId = schedule.theaters.studios[0]?.id;
    if (!studioId) {
      throw new HttpError(404, "Studio tidak ditemukan untuk jadwal ini");
    }

    // Format tanggal
    const formattedDate = new Date(showDate);
    if (isNaN(formattedDate.getTime())) {
      throw new HttpError(400, "Format tanggal tidak valid");
    }

    // Mendapatkan kursi yang tersedia
    const availableSeats = await seatRepository.getAvailableSeatsBySchedule(
      scheduleId,
      studioId,
      formattedDate
    );

    // Mengelompokkan kursi berdasarkan baris
    const seatsByRow = {};
    availableSeats.forEach((seat) => {
      if (!seatsByRow[seat.row]) {
        seatsByRow[seat.row] = [];
      }
      seatsByRow[seat.row].push(seat);
    });

    // Mengurutkan baris dan kolom
    const result = Object.keys(seatsByRow)
      .sort()
      .map((row) => ({
        row,
        seats: seatsByRow[row].sort((a, b) =>
          a.column.localeCompare(b.column, undefined, { numeric: true })
        ),
      }));

    return result;
  }

  // Mendapatkan status kursi pada jadwal tertentu (tersedia/tidak tersedia)
  async getSeatStatusBySchedule(scheduleId, showDate) {
    // Validasi jadwal
    const schedule = await movieScheduleRepository.getMovieScheduleById(
      scheduleId
    );
    if (!schedule) {
      throw new HttpError(404, "Jadwal tidak ditemukan");
    }

    // Mendapatkan studio_id dari jadwal
    const studioId = schedule.theaters.studios[0]?.id;
    if (!studioId) {
      throw new HttpError(404, "Studio tidak ditemukan untuk jadwal ini");
    }

    // Format tanggal
    const formattedDate = new Date(showDate);
    if (isNaN(formattedDate.getTime())) {
      throw new HttpError(400, "Format tanggal tidak valid");
    }

    // Mendapatkan semua kursi di studio
    const allSeats = await seatRepository.getAllSeatsByStudioId(studioId);

    // Mendapatkan kursi yang sudah dipesan
    const reservedSeats = await seatRepository.getReservedSeatsByScheduleId(
      scheduleId,
      formattedDate
    );

    // Mendapatkan ID kursi yang sudah dipesan
    const reservedSeatIds = reservedSeats.map((rs) => rs.seat_id);

    // Menyiapkan status kursi
    const seatStatus = allSeats.map((seat) => ({
      ...seat,
      is_available: !reservedSeatIds.includes(seat.id),
    }));

    // Mengelompokkan kursi berdasarkan baris
    const seatsByRow = {};
    seatStatus.forEach((seat) => {
      if (!seatsByRow[seat.row]) {
        seatsByRow[seat.row] = [];
      }
      seatsByRow[seat.row].push(seat);
    });

    // Mengurutkan baris dan kolom
    const result = Object.keys(seatsByRow)
      .sort()
      .map((row) => ({
        row,
        seats: seatsByRow[row].sort((a, b) =>
          a.column.localeCompare(b.column, undefined, { numeric: true })
        ),
      }));

    return result;
  }

  // Validasi ketersediaan kursi
  async validateSeatAvailability(scheduleId, seatId, showDate) {
    // Validasi jadwal
    const schedule = await movieScheduleRepository.getMovieScheduleById(
      scheduleId
    );
    if (!schedule) {
      throw new HttpError(404, "Jadwal tidak ditemukan");
    }

    // Validasi kursi
    const seat = await seatRepository.getSeatById(seatId);
    if (!seat) {
      throw new HttpError(404, "Kursi tidak ditemukan");
    }

    // Mendapatkan studio_id dari jadwal
    const studioId = schedule.theaters.studios[0]?.id;
    if (!studioId) {
      throw new HttpError(404, "Studio tidak ditemukan untuk jadwal ini");
    }

    // Validasi kursi berada di studio yang benar
    if (seat.studio_id !== studioId) {
      throw new HttpError(400, "Kursi tidak tersedia di studio ini");
    }

    // Format tanggal
    const formattedDate = new Date(showDate);
    if (isNaN(formattedDate.getTime())) {
      throw new HttpError(400, "Format tanggal tidak valid");
    }

    // Mendapatkan kursi yang sudah dipesan
    const reservedSeats = await seatRepository.getReservedSeatsByScheduleId(
      scheduleId,
      formattedDate
    );

    // Mendapatkan ID kursi yang sudah dipesan
    const reservedSeatIds = reservedSeats.map((rs) => rs.seat_id);

    // Validasi kursi belum dipesan
    if (reservedSeatIds.includes(seatId)) {
      throw new HttpError(400, "Kursi sudah dipesan");
    }

    return true;
  }
}
export default SeatService;
