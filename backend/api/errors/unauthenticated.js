const ApiError = require("./apiError");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

class UnauthenticatedError extends ApiError {
  constructor(message, statusCode, reason) {
    super();
    this.message = message;
    this.statusCode = StatusCodes.FORBIDDEN;
    this.reason = getReasonPhrase(StatusCodes.FORBIDDEN);
  }
}

module.exports = UnauthenticatedError;
