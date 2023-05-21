const express = require("express");
const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  getJobStats,
} = require("../controllers/jobsController");
const isAuthorized = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", isAuthorized, getJobs);
router.get("/:id", isAuthorized, getJob);
router.post("/", isAuthorized, createJob);
router.patch("/:id", isAuthorized, updateJob);
router.delete("/:id", isAuthorized, deleteJob);
router.get('/stats/all', isAuthorized, getJobStats)

module.exports = router;
