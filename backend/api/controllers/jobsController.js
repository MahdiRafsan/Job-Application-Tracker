const { StatusCodes } = require("http-status-codes");
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
    console.log("Error from job creation route: ", err);
    next(err);
  }
};

const getJobs = async (req, res, next) => {
  try {
    const {
      searchTerm = "",
      applicationStatus = "",
      jobType = "",
      sortBy = "",
    } = req.query;

    // SEARCH AND FILTER
    let queryFilter = { userId: req.user._id };
    if (searchTerm) {
      queryFilter.$or = [
        { companyName: { $regex: searchTerm, $options: "i" } },
        { jobTitle: { $regex: searchTerm, $options: "i" } },
      ];
    }

    if (applicationStatus) {
      queryFilter.applicationStatus = applicationStatus;
    }

    if (jobType) {
      queryFilter.jobType = jobType;
    }

    let result = Job.find(queryFilter);

    // SORTING
    if (!sortBy) {
      result.sort({ created_at: "desc" });
    }

    if (sortBy === "oldest") {
      result.sort({ created_at: "asc" });
    }

    if (sortBy === "latest") {
      result.sort({ created_at: "desc" });
    }

    if (sortBy === "applicationDate") {
      result.sort({ applicationDate: "asc" });
    }

    // PAGINATION
    const currentPage = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const skip = (currentPage - 1) * limit;
    const totalJobs = await Job.countDocuments(queryFilter);
    const totalPages = Math.ceil(totalJobs / limit);

    if (totalJobs && currentPage > totalPages) {
      throw new NotFoundError(`Page ${currentPage} not found!`);
    }

    result = result.skip(skip).limit(limit);

    const jobs = await result;
    res.status(StatusCodes.OK).send({
      totalJobs,
      currentPage,
      totalPages,
      jobs,
    });
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
        "You don't have permission to access this route!"
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
    res
      .status(StatusCodes.OK)
      .send({ message: "Job deleted successfully.", id: req.params.id });
  } catch (err) {
    next(err);
  }
};

const getJobStats = async (req, res, next) => {
  const MONTHS_ARRAY = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const NOW = new Date();

  // getMonth returns a number between 0-11
  // subtract 5 from getMonths to get 6 months including current month
  const LAST_SIX_MONTHS = new Date(NOW.getFullYear(), NOW.getMonth() - 5);
  const LAST_MONTH = new Date(
    NOW.getFullYear(),
    NOW.getMonth(),
    NOW.getDate() - 31
  );
  const NEXT_THIRTY_DAYS = new Date(NOW.getFullYear(), NOW.getMonth() + 1, 31);
  // const LAST_QUARTER = new Date(NOW.getFullYear(), NOW.getMonth() - 2);

  try {
    // count of application status
    const statusCount = await Job.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: "$applicationStatus",
          total: { $count: {} },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
          status: "$_id",
        },
      },
    ]);

    let statusData = {};
    statusCount.map((el) => {
      statusData[el.status] = el.total;
    });

    // applications per month
    const applicationsPerMonth = await Job.aggregate([
      { $match: { userId: req.user._id } },
      {
        $project: {
          monthApplied: { $month: "$applicationDate" },
          _id: 0,
        },
      },
      {
        $group: {
          _id: { monthApplied: "$monthApplied" },
          total: { $count: {} },
        },
      },
      { $sort: { "_id.monthApplied": 1 } },
      {
        $project: {
          _id: 0,
          total: 1,
          month: { $arrayElemAt: [MONTHS_ARRAY, "$_id.monthApplied"] },
        },
      },
    ]);

    let dataByMonth = {};
    applicationsPerMonth.map((el) => {
      dataByMonth[el.month] = el.total;
    });

    // applications per year
    const applicationsPerYear = await Job.aggregate([
      { $match: { userId: req.user._id } },
      {
        $project: {
          yearApplied: { $year: "$applicationDate" },
          _id: 0,
        },
      },
      {
        $group: {
          _id: { yearApplied: "$yearApplied" },
          total: { $count: {} },
        },
      },
      { $sort: { "_id.yearApplied": 1 } },
      {
        $project: {
          _id: 0,
          total: 1,
          year: "$_id.yearApplied",
        },
      },
    ]);

    let dataByYear = {};
    applicationsPerYear.map((el) => {
      dataByYear[el.year] = el.total;
    });

    // most recent applications (last 6 months)
    const recentApplications = await Job.aggregate([
      {
        $match: {
          userId: req.user._id,
          applicationDate: { $gte: LAST_SIX_MONTHS, $lte: NOW },
        },
      },
      { $project: { date: "$applicationDate", _id: 0 } },
      {
        $group: {
          _id: { month: { $month: "$date" }, year: { $year: "$date" } },
          total: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      {
        $project: {
          _id: 0,
          total: 1,
          year: { $toString: "$_id.year" },
          month: { $arrayElemAt: [MONTHS_ARRAY, "$_id.month"] },
        },
      },
      { $project: { total: 1, period: { $concat: ["$month", "-", "$year"] } } },
    ]);

    let recentData = {};
    recentApplications.map((el) => {
      recentData[el.period] = el.total;
    });

    // jobTypes applied to in the last months
    // implement/replace with jobTypes applied to in the last quarter
    const jobTypesLastMonth = await Job.aggregate([
      {
        $match: {
          userId: req.user._id,
          applicationDate: { $gte: LAST_MONTH, $lte: NOW },
        },
      },
      { $project: { _id: 0, applicationDate: 1, jobType: 1 } },
      {
        $group: {
          _id: { jobType: "$jobType" },
          total: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          total: 1,
          jobType: "$_id.jobType",
        },
      },
    ]);

    let jobTypesData = {};
    jobTypesLastMonth.map((el) => {
      jobTypesData[el.jobType] = el.total;
    });

    // next 5 interviews
    // replace with upcoming interviews for next 31 days
    const upcomingInterviews = await Job.aggregate([
      {
        $match: {
          userId: req.user._id,
          interviewDate: { $gte: NOW, $lte: NEXT_THIRTY_DAYS },
        },
      },
      {
        $project: {
          companyName: 1,
          jobTitle: 1,
          jobType: 1,
          interviewDate: 1,
          applicationDate: 1,
        },
      },
      { $sort: { interviewDate: 1 } },
      { $limit: 5 },
    ]);

    res.status(StatusCodes.OK).send({
      statusData,
      dataByMonth,
      dataByYear,
      recentData,
      jobTypesData,
      upcomingInterviews,
    });
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
  getJobStats,
};
