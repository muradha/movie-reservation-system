import { sendError } from "../utils/response.js";

/**
 * ParseIntPipe: Middleware untuk mengonversi parameter menjadi integer.
 * Parameter diambil dari lokasi yang ditentukan (default: 'params').
 *
 * @param {string} paramName - Nama parameter yang akan diproses.
 * @param {object} [options] - Opsi tambahan, misalnya lokasi parameter ('query', 'params', atau 'body').
 */
function ParseIntPipe(paramName, options = {}) {
  const location = options.location || "params";

  return (req, res, next) => {
    // Ambil nilai parameter dari lokasi yang diinginkan (query, params, atau body)
    let value = req[location][paramName];
    console.log("value:", value);

    // Jika parameter tidak ada, lanjutkan ke middleware berikutnya
    if (value === undefined || value === null) {
      return next();
    }

    // Jika nilai sudah berupa number, pastikan berupa integer
    if (typeof value === "number") {
      req[location][paramName] = Math.floor(value);
      return next();
    }

    // Jika berupa string, gunakan regex untuk validasi representasi integer (termasuk angka negatif)
    if (typeof value === "string") {
      // Regex yang mendukung angka negatif (misalnya, "-123" atau "456")
      const integerRegex = /^-?\d+$/;
      if (!integerRegex.test(value)) {
        return sendError(
          res,
          `Parameter "${paramName}" harus berupa integer valid.`,
          null,
          400
        );
      }
      req[location][paramName] = parseInt(value, 10);
      return next();
    }

    // Jika tipe data tidak sesuai, kirim respons error
    return sendError(
      res,
      `Parameter "${paramName}" tidak valid. Harus berupa integer.`,
      null,
      400
    );
  };
}

export default ParseIntPipe;
