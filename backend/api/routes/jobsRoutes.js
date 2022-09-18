const express = require("express");
const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobsController");
const isAuthorized = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", isAuthorized, getJobs);
router.get("/:id", isAuthorized, getJob);
router.post("/", isAuthorized, createJob);
router.patch("/:id", isAuthorized, updateJob);
router.delete("/:id", isAuthorized, deleteJob);

module.exports = router;
