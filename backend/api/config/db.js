const mongoose = require("mongoose");

const connectDB = async (dbUrl) => {
  try {
    await mongoose.connect(dbUrl);
  } catch (err) {
    console.error(err);
    process.exit(1); //exit the process with failure in case of an error
  }
};

module.exports = connectDB;
