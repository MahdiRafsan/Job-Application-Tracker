const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const RefreshToken = require("../models/refreshTokenModel");

const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../errors");

const { COOKIE_OPTIONS } = require("../config/constants");

const register = async (req, res, next) => {
  try {
    const { username, password, confirmPassword, email, profile } = req.body;

    if (password && !confirmPassword) {
      throw new BadRequestError("Confirm Password is a required field");
    }

    if (password && password !== confirmPassword) {
      throw new BadRequestError("Passwords must match!");
    }

    const user = await User.create({
      username,
      email,
      password,
      profile,
    });

    if (user) {
      const refreshToken = generateRefreshToken(user.id);

      await RefreshToken.create({
        userId: user.id,
        token: refreshToken,
      });

      res.cookie("rt", refreshToken, COOKIE_OPTIONS);
      res.status(StatusCodes.CREATED).json({
        message: "New account created successfully!",
        id: user.id,
        accessToken: generateAccessToken(user._id),
      });
    }
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { usernameOrEmail, password } = req.body;
  try {
    if (!usernameOrEmail) {
      throw new BadRequestError(
        "Email or Username must be provided for login!"
      );
    }

    if (!password) {
      throw new BadRequestError("Password must be provided for login!");
    }

    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });

    if (!user) {
      throw new NotFoundError(
        "User with that email or username does not exist in the database!"
      );
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedError("Invalid Credentials");
    }

    if (user && isPasswordCorrect) {
      const refreshToken = generateRefreshToken(user.id);

      await RefreshToken.create({
        userId: user.id,
        token: refreshToken,
      });

      res.cookie("rt", refreshToken, COOKIE_OPTIONS);
      res.status(StatusCodes.OK).json({
        message: "Login successful!",
        id: user.id,
        accessToken: generateAccessToken(user._id),
      });
    }
  } catch (err) {
    next(err);
  }
};

// store refresh token in DB anytime it is issued
// have a flag in refresh tokens that say if it is used or not
// anytime a refresh token comes back check if it is used or not
// if it is used delete all refresh tokens from db
// it unused, issue a new access and refresh token pair and store refresh token in db

const refresh = async (req, res, next) => {
  try {
    const { rt: refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new UnauthorizedError("Invalid authorization, no refresh token!");
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN,
      (err, decoded) => {
        if (err) {
          throw new UnauthorizedError(
            "Session expired! You must login again with your credentials"
          );
        }
        return decoded;
      }
    );

    const user = await User.findById(decoded.id);
    if (!user) {
      throw new NotFoundError("User not found!");
    }
    const token = await RefreshToken.findOne({ token: refreshToken });

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "No token present. Login with your credentials.",
      });
    }
    if (token.used) {
      await RefreshToken.deleteMany({ userId: decoded.id });
      throw new UnauthorizedError(
        "Token reuse attempted. You must login again using your credentials!"
      );
    }
    token.used = true;
    await token.save();

    const newRefreshToken = generateRefreshToken(decoded.id);
    await RefreshToken.create({
      userId: decoded.id,
      token: newRefreshToken,
    });

    res.cookie("rt", newRefreshToken, COOKIE_OPTIONS);
    res.status(StatusCodes.OK).json({
      accessToken: generateAccessToken(decoded.id),
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    const { rt: refreshToken } = req.cookies;
    
    // check to see if refresh token is in database
    const token = await RefreshToken.findOne({ token: refreshToken });
    if (!token) {
      res.clearCookie("rt");
    }

    // verify refresh token and extract the payload
    let decoded
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN)
    } catch (err) {
      // decode expired token if needed
      if (err.name === "TokenExpiredError") {
        decoded = jwt.decode(refreshToken)
      } else {
        throw err
      }
    }
    
    // delete refresh tokens associated with user from database
    await RefreshToken.deleteMany({ userId: decoded.id });

    res.clearCookie("rt");
    res
      .status(StatusCodes.OK)
      .json({ message: "User logged out successfully!" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout,
};
