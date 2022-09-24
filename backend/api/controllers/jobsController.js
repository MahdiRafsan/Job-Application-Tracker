const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const User = require("../models/userModel");
const Job = require("../models/jobsModel");
const { NotFoundError, UnauthenticatedError } = require("../errors");

const createJob = async (req, res, next) => {
  try {
    const job = await Job.create({
      userId: req.user._id,
      ...req.body,
    });
    if (job) {
      res.status(StatusCodes.CREATED).send({
        message: "New job added successfully!",
        job,
      });
    }
  } catch (err) {
    console.log("Error from user creation route: ", err);
    // res.send(err)
    next(err);
  }
};

const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ userId: req.user._id });
    res.status(StatusCodes.OK).send(jobs);
  } catch (err) {
    next(err);
  }
};

const getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      throw new NotFoundError("Job not found!");
    }

    // javascript compares memory addresses of objects
    // convert to strings to compare
    if (job.userId.toString() !== req.user._id.toString()) {
      throw new UnauthenticatedError(
        "You don't have permission to access this route!"
      );
    }
    res.status(StatusCodes.OK).send(job);
  } catch (err) {
    next(err);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      throw new NotFoundError("Job not found!");
    }
    if (job.userId.toString() !== req.user._id.toString()) {
      throw new UnauthenticatedError(
        "You are not permitted to access this route!"
      );
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(StatusCodes.OK).send({
      message: "Job updated successfully.",
      updatedJob,
    });
  } catch (err) {
    next(err);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      throw new NotFoundError("Job not found!");
    }

    if (job.userId.toString() !== req.user._id.toString()) {
      throw new UnauthenticatedError(
        "You don't have permission to access this route!"
      );
    }
    await job.remove();
    res.status(StatusCodes.OK).send({ message: "Job deleted successfully." });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
};
