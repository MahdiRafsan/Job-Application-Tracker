require("dotenv").config();
require("colors");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const passwordRoutes = require("./routes/passwordRoutes");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const { NotFoundError } = require("./errors");
const port = process.env.PORT || 8000;

const app = express();

process.env.NODE_ENV === "production"
  ? connectDB(process.env.MONGO_DB_PRODUCTION)
  : connectDB(process.env.MONGO_DB_DEVELOPMENT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/password", passwordRoutes);

app.get("/api/v1", async (req, res) => {
  res.status(200).send({ Status: "OK" });
});

app.all("*", (req, res, next) => {
  err = new NotFoundError(
    `Can't find the route ${req.originalUrl} on this server!`
  );
  next(err);
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Database Connected Successfully!".yellow.underline);
  app.listen(port, () => {
    console.log(`Server is running on ${port}...`.rainbow.underline);
  });
});
