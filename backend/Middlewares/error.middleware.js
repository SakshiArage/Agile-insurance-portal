const AppError = require("../Utils/appError");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate field value",
      error: err.keyValue,
    });
  }

  if (err instanceof AppError || err.isOperational) {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

module.exports = errorHandler;
