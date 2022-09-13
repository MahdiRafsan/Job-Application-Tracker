const ApiError = require("./apiError");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

class UnauthorizedError extends ApiError {
  constructor(message, statusCode, reason) {
    super();
    this.message = message;
    this.statusCode = StatusCodes.UNAUTHORIZED;
    this.reason = getReasonPhrase(StatusCodes.UNAUTHORIZED);
  }
}

module.exports = UnauthorizedError;
