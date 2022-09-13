const crypto = require("crypto");

const generateResetToken = () => {
  return crypto.randomBytes(16).toString("hex");
};

const hashResetToken = function (plainToken) {
  return crypto.createHash("sha256").update(plainToken).digest("hex");
};

module.exports = { generateResetToken, hashResetToken };
