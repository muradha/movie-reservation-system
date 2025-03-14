// src/utils/response.js
const sendSuccess = (
  res,
  data = null,
  message = "",
  statusCode = 200,
  meta = null
) => {
  const response = {
    statusCode,
    success: true,
    message,
  };
  if (meta) response.meta = meta;
  if (data) response.data = data;
  return res.status(statusCode).json(response);
};

const sendError = (res, message = "Error", err, statusCode = 500) => {
  const errorMessage = err instanceof Error ? err.message : err;
  return res.status(statusCode).json({
    statusCode: statusCode,
    success: false,
    message,
    error: errorMessage,
    data: null,
  });
};

export { sendSuccess, sendError };
