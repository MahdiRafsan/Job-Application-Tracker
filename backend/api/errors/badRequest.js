const ApiError = require("./apiError");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

class BadRequestError extends ApiError {
  constructor(message, statusCode, reason) {
    super();
    this.message = message;
    this.statusCode = StatusCodes.BAD_REQUEST;
    this.reason = getReasonPhrase(StatusCodes.BAD_REQUEST);
  }
}

module.exports = BadRequestError;
