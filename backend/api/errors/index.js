const ApiError = require("./apiError");
const BadRequestError = require("./badRequest");
const NotFoundError = require("./notFound");
const UnauthenticatedError = require("./unauthenticated");
const UnauthorizedError = require("./unauthorized");

module.exports = {
  ApiError,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
};
