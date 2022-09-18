const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "1h",
  });
};

const isTokenValid = (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
};

module.exports = { generateToken, isTokenValid };
