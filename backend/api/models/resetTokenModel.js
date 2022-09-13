const mongoose = require("mongoose");

const { hashResetToken } = require("../utils/passwordReset");

const Schema = mongoose.Schema;

const resetTokenSchema = Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "UserId is a required field!"],
  },
  token: {
    type: String,
    required: [true, "Token is a required field!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 900, // expire after 15 minutes
  },
});

// middleware to hash resetToken before saving to database
resetTokenSchema.pre("save", function (next) {
  this.token = hashResetToken(this.token);
  next();
});

module.exports = mongoose.model("ResetToken", resetTokenSchema);
