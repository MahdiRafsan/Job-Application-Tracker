const { StatusCodes } = require("http-status-codes");

const { NotFoundError, UnauthenticatedError } = require("../errors");
const { cloudinary } = require("../utils/cloudinary");
const User = require("../models/userModel");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(StatusCodes.OK).send(users);
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select("-password");

    if (!user) {
      throw new NotFoundError(
        `No user with the id ${req.params.id} is found in the database!`
      );
    }

    if (req.user._id.toString() !== req.params.id) {
      throw new UnauthenticatedError(
        "You don't have permission to access this route!"
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
    const { bio, firstName, lastName } = profile || {};

    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      throw new NotFoundError(
        `No user with the id ${req.params.id} is found in the database!`
      );
    }

    if (req.user._id.toString() !== req.params.id) {
      throw new UnauthenticatedError(
        "You don't have permission to access this route!"
      );
    }

    // delete previous image from cloudinary if user is uploading a new image
    if (req.file) {
      await cloudinary.uploader.destroy(user.profile.image.cloudinary_id);
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          username,
          email,
          "profile.firstName": firstName,
          "profile.lastName": lastName,
          "profile.bio": bio,
          "profile.image.url": req.file && req.file.path,
          "profile.image.cloudinary_id": req.file && req.file.filename,
        },
      },
      { new: true, runValidators: true }
    ).select("username email profile");
    res.status(StatusCodes.OK).send({
      message: "Account updated successfully.",
      updatedUser,
    });
  } catch (err) {
    console.log("Error from update user: ", err);
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

    if (req.user._id.toString() !== req.params.id) {
      throw new UnauthenticatedError(
        "You don't have permission to access this route!"
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
