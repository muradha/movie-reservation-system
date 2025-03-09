import { sendError } from "../utils/response.js";
import { Prisma } from "@prisma/client";

const errorHandler = (err, req, res, next) => {

  // Tangani error dari Prisma berdasarkan referensi: https://www.prisma.io/docs/orm/reference/error-reference
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Contoh: kode P2002 untuk unique constraint violation
    if (err.code === "P2002") {
      return sendError(
        res,
        409,
        "Unique constraint violation",
        err.meta && err.meta.target ? err.meta.target : null
      );
    }
    // Tangani error Prisma lainnya
    return sendError(res, 500, "Database error", err.message);
  }

  // Tangani error Prisma lainnya, misalnya PrismaClientInitializationError atau PrismaClientRustPanicError
  if (err instanceof Prisma.PrismaClientInitializationError) {
    return sendError(res, 500, "Database initialization error", err.message);
  }
  if (err instanceof Prisma.PrismaClientRustPanicError) {
    return sendError(res, 500, "Internal database error", err.message);
  }

  // Tangani error lain (generic)
  console.error("Unhandled error:", err);
  return sendError(res, 500, err.message || "Internal server error");
};

export default errorHandler;
