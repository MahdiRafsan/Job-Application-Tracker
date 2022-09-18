const mongoose = require("mongoose");
const validator = require("validator");
const uniqueValidator = require("mongoose-unique-validator");
const brcypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    username: {
      type: String,
      required: [true, "Username is a required field!"],
      unique: true,
      validate: [
        {
          validator: (value) => validator.isLength(value, { min: 5, max: 20 }),
          message: (props) =>
            `Length of username should be between 5-20 characters. Got ${props.value.length} characters!`,
        },
        {
          validator: (value) => validator.isAlphanumeric(value),
          message: "Username can only contain alphabets and numbers!",
        },
      ],
    },
    email: {
      type: String,
      required: [true, "Email address is a required field!"],
      lowercase: true,
      trim: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is a required field!"],
      validate: {
        validator: (value) => validator.isStrongPassword(value),
        message:
          "Password should be at least 8 characters long and include at least 1 uppercase, 1 lowercase, 1 number and 1 symbol characters.",
      },
    },
    profile: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      bio: {
        type: String,
        validate: {
          validator: (value) => validator.isLength(value, { max: 15 }),
          message: (props) =>
            `Bio can not be more than 15 characters. Got ${props.value.length} characters!`,
        },
      },
      avatar: {
        type: String,
      },
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "last_updated_at",
    },
  }
);

userSchema.plugin(uniqueValidator, {
  message:
    "An user with that {PATH} is already registered! Please enter a different value.",
});

// middleware to hash password before saving to database
userSchema.pre("save", async function (next) {
  // only runs if password has been modified
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await brcypt.genSalt(10);
  this.password = await brcypt.hash(this.password, salt);
  next();
});

// method to compare password using bcrypt
userSchema.methods.comparePassword = async function (plainPassword) {
  return await brcypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
