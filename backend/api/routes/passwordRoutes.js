const express = require("express");
const router = express.Router();

const {
  updatePassword,
  resetPasswordRequest,
  resetPassword,
} = require("../controllers/passwordController");
const isAuthorized = require("../middlewares/authMiddleware");

router.patch("/:id", isAuthorized, updatePassword);
router.post("/", resetPasswordRequest);
router.put("/:token", resetPassword);

module.exports = router;
