const { StatusCodes } = require("http-status-codes");

const User = require("../models/userModel");

const { generateToken } = require("../utils/jwt");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../errors");

const register = async (req, res, next) => {
  const { username, password, email, profile } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
      profile,
    });

    if (user) {
      res.status(StatusCodes.CREATED).json({
        message: "User created successfully!",
        user: {
          _id: user.id,
          username,
        },
        accessToken: generateToken(user._id),
      });
    }
  } catch (err) {
    // console.log(err)
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, username, password } = req.body;
  try {
    if (!(email || username)) {
      throw new BadRequestError(
        "Email or Username must be provided for login!"
      );
    }

    if (!password) {
      throw new BadRequestError("Password must be provided for login!");
    }

    const user = await User.findOne(email ? { email } : { username });

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
  res.json("logout");
};

module.exports = {
  register,
  login,
  logout
};
