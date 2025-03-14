// src/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import { sendError } from "../utils/response.js";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    sendError(
      res,
      "Token tidak ditemukan. Harap sertakan token dalam header Authorization.",
      null,
      401
    );
  }

  // Token diharapkan dalam format "Bearer <token>"
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    sendError(
      res,
      'Format token tidak valid. Harus "Bearer <token>".',
      null,
      401
    );
  }

  const token = parts[1];

  try {
    // Verifikasi token menggunakan secret (pastikan JWT_SECRET didefinisikan di environment variable)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Tempatkan payload token ke req.user
    next();
  } catch (error) {
    sendError(res, "Token tidak valid atau sudah kadaluarsa.", error, 401);
  }
};

export default authenticateJWT;
