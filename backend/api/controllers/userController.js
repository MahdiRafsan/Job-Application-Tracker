const { StatusCodes } = require("http-status-codes");

const { NotFoundError } = require("../errors");
const User = require("../models/userModel");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(StatusCodes.OK).send(users);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      throw new NotFoundError(
        `No user with the id ${req.params.id} is found in the database!`
      );
    }

    res.status(StatusCodes.OK).send(user);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { username, email, profile } = req.body;
    const { bio, firstName, lastName, avatar } = profile || {};
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      throw new NotFoundError(
        `No user with the id ${req.params.id} is found in the database!`
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          username,
          email,
          "profile.lastName": lastName === "" ? undefined : lastName,
          "profile.firstName": firstName,
          "profile.avatar": avatar,
          "profile.bio": bio,
        },
      },
      { new: true, runValidators: true }
    ).select("username email profile");

    res.status(StatusCodes.OK).send({
      message: "User info updated successfully.",
      updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new NotFoundError(
        `No user with the id ${req.params.id} is found in the database!`
      );
    }

    await user.remove();

    res.status(StatusCodes.OK).send({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
