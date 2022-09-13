const handleCastError = (err) => {
  return {
    message: `No user with the id ${err.value} is found in the database!`,
  };
};

module.exports = handleCastError;
