const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const refreshTokenSchema = Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "UserId is a required field!"],
  },
  token: {
    type: String,
    required: [true, "Token is a required field!"],
  },
  used: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 129600, // expire after 15 days
  },
});

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);