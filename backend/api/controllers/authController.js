const { StatusCodes } = require("http-status-codes");

const User = require("../models/userModel");

const { generateToken } = require("../utils/jwt");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../errors");

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
      res.status(StatusCodes.CREATED).json({
        message: "New account created successfully!",
        user: {
          _id: user.id,
          username,
        },
        accessToken: generateToken(user._id),
      });
    }
  } catch (err) {
    // console.log(err);
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

    // const user = await User.findOne(email ? { email } : { username });
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
      res.status(StatusCodes.OK).json({
        message: "Login successful!",
        user: {
          _id: user.id,
          username: user.username,
        },
        accessToken: generateToken(user._id),
      });
    }
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res) => {
  res.status(StatusCodes.OK).send("User logged out successfully");
};

module.exports = {
  register,
  login,
  logout,
};
