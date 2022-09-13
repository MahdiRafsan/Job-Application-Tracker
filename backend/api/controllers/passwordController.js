const { StatusCodes } = require("http-status-codes");

const { NotFoundError, BadRequestError } = require("../errors");
const User = require("../models/userModel");
const ResetToken = require("../models/resetTokenModel");
const sendEmail = require("../utils/sendEmail");
const { generateResetToken, hashResetToken} = require("../utils/passwordReset");

const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      throw new NotFoundError(
        `No user with the id ${req.params.id} is found in the database!`
      );
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      throw new BadRequestError(
        "Please provide the values for current, new and confirm password fields!"
      );
    }

    const validCurrentPassowrd = await user.comparePassword(currentPassword);
    if (!validCurrentPassowrd) {
      throw new BadRequestError(
        "Password stored in the database doesn't match with the provided current password!"
      );
    }

    if (newPassword !== confirmPassword) {
      throw new BadRequestError(
        "Values for new and confirm password fields must match!"
      );
    }

    const newPasswordCurrentlyInUse = await user.comparePassword(newPassword);
    if (newPasswordCurrentlyInUse) {
      throw new BadRequestError(
        "New password must be different from the current password!"
      );
    }

    user.password = newPassword;
    await user.save();

    res
      .status(StatusCodes.OK)
      .send({ message: "Password updated successfully." });
  } catch (err) {
    next(err);
  }
};

// takes an email or username from body →
// checks for user against database →
// generates a random token with short expiry →
// if token exists, invalidate (delete) them →
// save it to database →
// sends user an email
// show response message →
const resetPasswordRequest = async (req, res, next) => {
  try {
    const { email, username } = req.body;
    if (!(email || username)) {
      throw new BadRequestError("Please provide an email or a username!");
    }

    const user = await User.findOne(email ? { email } : { username });
    if (!user) {
      throw new NotFoundError(
        "No user with that email or username is found! Please enter a different value."
      );
    }

    // delete all previously generated tokens for the user
    // could have security issues
    // const tokenAlreadyExists = await ResetToken.find({userId: user._id})
    // if (tokenAlreadyExists) {
    //     await ResetToken.deleteMany({userId: user._id})
    // }

    const resetToken = new ResetToken({
      userId: user._id,
      token: generateResetToken(),
    });
    // sendEmail(user.email);
    console.log(resetToken); // send email with token/reset link
    await resetToken.save();

    res.status(StatusCodes.ACCEPTED).send({
      message:
        "An email with the password reset link has been sent to your email!",
    });
  } catch (err) {
    next(err);
  }
};

// user gets password reset link from email
// check to see if token exists inside database
// if token exists, check if it is valid
// get new password and confirm password from the body
// update user password
// delete the jwt token from database to ensure single use
// send user a confimation message of successful password change
const resetPassword = async (req, res, next) => {
  try {
    const hashedToken = hashResetToken(req.params.token);
    const resetToken = await ResetToken.findOne({ token: hashedToken });
    if (!resetToken) {
      throw new BadRequestError("Invalid Password Reset URL!");
    }

    const user = await User.findOne({ _id: resetToken.userId });
    if (!user) {
      throw new BadRequestError("Invalid Password Reset URL!");
    }

    const { newPassword, confirmPassword } = req.body;
    if (!newPassword || !confirmPassword) {
      throw new BadRequestError(
        "Both password and confirm password values must be provided!"
      );
    }

    if (newPassword !== confirmPassword) {
      throw new BadRequestError("Passwords must match!");
    }

    const newPasswordCurrentlyInUse = await user.comparePassword(newPassword);
    if (newPasswordCurrentlyInUse) {
      throw new BadRequestError(
        "New password must be different from the current password!"
      );
    }

    user.password = newPassword;
    await user.save();

    // remove currently used token essentially making it valid for one time use
    await resetToken.remove();

    res.send({ message: "Password updated successfully." });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  updatePassword,
  resetPasswordRequest,
  resetPassword,
};
