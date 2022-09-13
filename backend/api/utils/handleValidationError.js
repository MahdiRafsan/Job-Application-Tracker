const handleValidationError = (err) => {
  const errors = {};

  // Validation Errors
  Object.values(err.errors).forEach((error) => {
    errors[error.properties.path] = error.properties.message;
  });

  return errors;
};

module.exports = handleValidationError;
