// src/middlewares/validateSchema.js
import { sendError } from "../utils/response.js";

function validateSchema(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      // Mengubah error details menjadi array pesan error
      const errors = error.details.map((detail) => detail.message);
      sendError(res, 'Validation error', errors, 400);
    }
    req.body = value; // Jika validasi berhasil, update request body dengan data yang sudah terformat
    next();
  };
}

export default validateSchema;
