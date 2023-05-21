const { StatusCodes } = require("http-status-codes");

const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const User = require("../models/userModel");
const ResetToken = require("../models/resetTokenModel");
const sendEmail = require("../utils/sendEmail");
const {
  generateResetToken,
  hashResetToken,
} = require("../utils/passwordReset");

const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

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
      .send({ message: "Success! Your password has been updated." });
  } catch (err) {
    next(err);
  }
};

const resetPasswordRequest = async (req, res, next) => {
  try {
    const { usernameOrEmail } = req.body;
    if (!usernameOrEmail) {
      throw new BadRequestError("Please provide an email or a username!");
    }

    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });

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
    const resetMessage = `You are receiving this auto-generated email because you (or someone else) has requested the reset of a password for your Job Tracker account.

Please use the link to reset your password:
${process.env.FRONTEND_URL}/identify/password/${resetToken.token}

Please disregard this email if you have not made this request. Your password will not be changed.

Thanks,
Job Tracker Team`;
    sendEmail({
      email: user.email,
      subject: "Job App Tracker Password Reset",
      message: resetMessage,
    });
    await resetToken.save();

    res.status(StatusCodes.ACCEPTED).send({
      message: `An email has been sent to ${user.email} with further instructions.`,
    });
  } catch (err) {
    next(err);
  }
};

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

    // delete all tokens associated with the user
    await ResetToken.deleteMany({ userId: user._id });

    const confirmMessage = `This is an auto-generated email to confirm that your password for the Job Tracker app has been successfully reset.

Thanks,
Job Tracker Team`;

    sendEmail({
      email: user.email,
      subject: "Password Reset Successfully",
      message: confirmMessage,
    });
    res.status(StatusCodes.OK).send({
      message: "Success! Your password has been updated.",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  updatePassword,
  resetPasswordRequest,
  resetPassword,
};
