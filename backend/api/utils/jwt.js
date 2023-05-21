const jwt = require("jsonwebtoken");

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

const isAccessTokenValid = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_TOKEN, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

module.exports = {
  generateAccessToken,
  isAccessTokenValid,
  generateRefreshToken,
};
