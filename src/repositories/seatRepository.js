import prisma from "#lib/prisma.js";

class SeatRepository {
  // Mendapatkan semua kursi berdasarkan studio_id
  async getAllSeatsByStudioId(studioId) {
    return await prisma.seats.findMany({
      where: {
        studio_id: studioId,
      },
      orderBy: [
        { row: 'asc' },
        { column: 'asc' }
      ]
    });
  }

  // Mendapatkan kursi berdasarkan ID
  async getSeatById(id) {
    return await prisma.seats.findFirst({
      where: {
        id,
      },
    });
  }

  // Mendapatkan kursi yang sudah dipesan pada jadwal tertentu
  async getReservedSeatsByScheduleId(scheduleId, showDate) {
    return await prisma.reservation_seats.findMany({
      where: {
        reservations: {
          movie_schedule_id: scheduleId,
          reservation_date: {
            gte: new Date(showDate),
            lt: new Date(new Date(showDate).setDate(new Date(showDate).getDate() + 1))
          }
        },
      },
      include: {
        seats: true,
      },
    });
  }

  // Mendapatkan kursi yang tersedia pada jadwal tertentu
  async getAvailableSeatsBySchedule(scheduleId, studioId, showDate) {
    // Mendapatkan semua kursi di studio
    const allSeats = await this.getAllSeatsByStudioId(studioId);
    
    // Mendapatkan kursi yang sudah dipesan
    const reservedSeats = await this.getReservedSeatsByScheduleId(scheduleId, showDate);
    
    // Mendapatkan ID kursi yang sudah dipesan
    const reservedSeatIds = reservedSeats.map(rs => rs.seat_id);
    
    // Filter kursi yang belum dipesan
    return allSeats.filter(seat => !reservedSeatIds.includes(seat.id));
  }

  // Membuat reservasi kursi
  async createReservationSeat(data) {
    return await prisma.reservation_seats.create({
      data,
      include: {
        seats: true,
      },
    });
  }

  // Menghapus reservasi kursi
  async deleteReservationSeat(id) {
    return await prisma.reservation_seats.delete({
      where: {
        id,
      },
    });
  }
}

export default SeatRepository;