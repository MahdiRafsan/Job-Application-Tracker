class ApiError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

module.exports = ApiError;
