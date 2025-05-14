import prisma from "../src/lib/prisma.js";

async function createMovieScheduleData() {
  try {
    // 1. Pastikan ada data movie_status
    const movieStatus = await prisma.movie_status.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: "Now Showing",
      },
    });

    // 2. Buat data film
    const movie = await prisma.movies.create({
      data: {
        title: "Avengers: Endgame",
        description: "Film superhero terbaik sepanjang masa",
        duration: 180, // dalam menit
        poster: "avengers_endgame.jpg",
        release_date: new Date("2023-06-01"),
        end_date: new Date("2023-07-01"),
      },
    });

    // 3. Buat data lokasi dan theater chain
    const location = await prisma.locations.create({
      data: {
        name: "Mall Central Park",
        address: "Jl. Letjen S. Parman Kav. 28, Jakarta Barat",
      },
    });

    const theaterChain = await prisma.theater_chains.create({
      data: {
        name: "CGV Cinemas",
      },
    });

    // 4. Buat data theater
    const theater = await prisma.theaters.create({
      data: {
        name: "CGV Central Park",
        capacity: 200,
        location_id: location.id,
        theater_chain_id: theaterChain.id,
      },
    });

    // 5. Buat data studio type
    const studioType = await prisma.studio_types.create({
      data: {
        name: "Regular",
        description: "Studio bioskop reguler dengan layar standar",
      },
    });

    // 6. Buat data studio
    const studio = await prisma.studios.create({
      data: {
        name: "Studio 1",
        base_price: 50000,
        theater_id: theater.id,
        studio_type_id: studioType.id,
      },
    });

    // 7. Buat beberapa jadwal studio untuk berbagai waktu
    const studioSchedules = [];
    const showTimes = [
      { time: "10:00:00", sequence: 1 },
      { time: "12:15:00", sequence: 2 },
      { time: "14:30:00", sequence: 3 },
      { time: "17:00:00", sequence: 4 },
      { time: "19:30:00", sequence: 5 },
      { time: "21:45:00", sequence: 6 },
    ];

    // Tanggal untuk jadwal film (3 hari ke depan)
    const showDates = [
      new Date("2023-06-01"),
      new Date("2023-06-02"),
      new Date("2023-06-03"),
    ];

    for (const showDate of showDates) {
      for (const { time, sequence } of showTimes) {
        // Format waktu untuk jadwal
        const [hours, minutes, seconds] = time.split(":");
        const showDateTime = new Date(showDate);
        showDateTime.setHours(parseInt(hours, 10));
        showDateTime.setMinutes(parseInt(minutes, 10));
        showDateTime.setSeconds(parseInt(seconds, 10));

        const studioSchedule = await prisma.studio_schedules.create({
          data: {
            show_time: showDateTime,
            show_date: showDate,
            sequence,
            studio_id: studio.id,
          },
        });

        studioSchedules.push(studioSchedule);
      }
    }

    // 8. Buat data ketersediaan film
    const movieAvailability = await prisma.movie_availability.create({
      data: {
        movie_id: movie.id,
        theater_id: theater.id,
        movie_status_id: movieStatus.id,
      },
    });

    // 9. Buat data jadwal film untuk setiap jadwal studio
    const movieSchedules = [];
    for (const studioSchedule of studioSchedules) {
      const movieSchedule = await prisma.movie_schedules.create({
        data: {
          movie_id: movie.id,
          theater_id: theater.id,
          studio_schedule_id: studioSchedule.id,
        },
      });
      movieSchedules.push(movieSchedule);
    }

    // 10. Buat beberapa kursi untuk studio
    const seats = [];
    const rows = ["A", "B", "C", "D", "E"];
    const columns = ["1", "2", "3", "4", "5", "6", "7", "8"];

    for (const row of rows) {
      for (const column of columns) {
        const seat = await prisma.seats.create({
          data: {
            row,
            column,
            studio_id: studio.id,
          },
        });
        seats.push(seat);
      }
    }

    // 11. Buat beberapa reservasi dan kursi yang sudah dipesan (untuk simulasi kursi yang tidak tersedia)
    // Buat user untuk reservasi
    const user = await prisma.users.upsert({
      where: { email: "user@example.com" },
      update: {},
      create: {
        name: "Test User",
        email: "user@example.com",
        password: "password123",
      },
    });

    // Buat voucher untuk reservasi
    const voucher = await prisma.vouchers.create({
      data: {
        code: "WELCOME10",
        description: "Diskon 10% untuk pengguna baru",
        discount_type: "PERCENTAGE",
        discount_value: 10,
        valid_from: new Date("2023-01-01"),
        valid_until: new Date("2023-12-31"),
        usage_limit: 100,
        is_active: true,
      },
    });

    // Buat reservasi untuk jadwal pertama (jam 12:15 tanggal 2023-06-01)
    const targetSchedule = movieSchedules.find(schedule => {
      const studioSchedule = studioSchedules.find(ss => ss.id === schedule.studio_schedule_id);
      return studioSchedule && 
             studioSchedule.show_time.getHours() === 12 && 
             studioSchedule.show_time.getMinutes() === 15 &&
             studioSchedule.show_date.toDateString() === new Date("2023-06-01").toDateString();
    });

    if (targetSchedule) {
      const reservation = await prisma.reservations.create({
        data: {
          reservation_date: new Date("2023-06-01"),
          total_price: 100000,
          movie_schedule_id: targetSchedule.id,
          user_id: user.id,
          voucher_id: voucher.id,
        },
      });

      // Pesan beberapa kursi (A1, A2, B3, B4) untuk simulasi kursi yang tidak tersedia
      const reservedSeatPositions = [
        { row: "A", column: "1" },
        { row: "A", column: "2" },
        { row: "B", column: "3" },
        { row: "B", column: "4" },
      ];

      for (const position of reservedSeatPositions) {
        const seat = seats.find(s => s.row === position.row && s.column === position.column);
        if (seat) {
          await prisma.reservation_seats.create({
            data: {
              reservation_id: reservation.id,
              seat_id: seat.id,
            },
          });
        }
      }

      console.log(`Reservasi dibuat untuk jadwal jam 12:15 tanggal 2023-06-01 dengan ${reservedSeatPositions.length} kursi`);
    }

    console.log("Data jadwal film berhasil dibuat!");
    console.log({
      movie,
      theater,
      studio,
      studioSchedules: studioSchedules.length,
      movieAvailability,
      movieSchedules: movieSchedules.length,
      seats: seats.length,
    });

    return { 
      movie, 
      theater, 
      studio, 
      studioSchedules, 
      movieAvailability, 
      movieSchedules, 
      seats 
    };
  } catch (error) {
    console.error("Error saat membuat data jadwal film:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createMovieScheduleData()
  .then(() => console.log("Selesai!"))
  .catch((error) => console.error("Terjadi kesalahan:", error));