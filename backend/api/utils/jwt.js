const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign({ payload }, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "15m",
  });
};

const isTokenValid = (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
};

module.exports = { generateToken, isTokenValid };
