const ApiError = require("./apiError");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

class NotFoundError extends ApiError {
  constructor(message, statusCode, reason) {
    super();
    this.message = message;
    this.statusCode = StatusCodes.NOT_FOUND;
    this.reason = getReasonPhrase(StatusCodes.NOT_FOUND);
  }
}

module.exports = NotFoundError;
