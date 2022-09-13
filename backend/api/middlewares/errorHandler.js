const { StatusCodes, getReasonPhrase } = require("http-status-codes");

const handleValidationError = require("../utils/handleValidationError");
const handleCastError = require("../utils/handleCastError");

const errorHandler = (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    reason: err.reason || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    details: err.message || "Something went wrong! Please try again later.",
  };

  // Validation Errors
  if (err.name === "ValidationError") {
    const error = handleValidationError(err);
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.reason = getReasonPhrase(StatusCodes.BAD_REQUEST);
    customError.details = error;
  }

  // Cast Error
  if (err.name === "CastError") {
    const error = handleCastError(err);
    customError.statusCode = StatusCodes.NOT_FOUND;
    customError.reason = getReasonPhrase(StatusCodes.NOT_FOUND);
    customError.details = error;
  }

  return res.status(customError.statusCode).send(customError);
};

module.exports = errorHandler;
