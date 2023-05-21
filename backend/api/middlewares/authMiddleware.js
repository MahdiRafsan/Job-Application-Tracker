const { isAccessTokenValid } = require("../utils/jwt");
const { UnauthorizedError } = require("../errors");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const isAuthorized = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];
      if (!token) {
        throw new UnauthorizedError("Invalid authorization, no token!");
      }

      const decoded = isAccessTokenValid(token);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } else {
      throw new UnauthorizedError(
        "You must be logged in to perform that function!"
      );
    }
  } catch (err) {
    next(err);
  }
};
module.exports = isAuthorized;
