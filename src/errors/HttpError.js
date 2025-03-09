class HttpError extends Error {
  /**
   * Membuat instance HttpError.
   * @param {number} statusCode - Kode status HTTP (misalnya, 404, 500, dll.).
   * @param {string} message - Pesan error yang menjelaskan error.
   * @param {any} [details=null] - Informasi tambahan mengenai error (opsional).
   */
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;

    // Menyimpan nama error sesuai dengan nama class
    this.name = this.constructor.name;

    // Menangkap stack trace dan menghilangkan constructor call dari stack
    Error.captureStackTrace(this, this.constructor);
  }
}

export default HttpError;
