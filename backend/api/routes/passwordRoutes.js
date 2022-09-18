const express = require("express");
const router = express.Router();

const {
  updatePassword,
  resetPasswordRequest,
  resetPassword,
} = require("../controllers/passwordController");

router.patch("/:id", updatePassword);
router.post("/", resetPasswordRequest);
router.patch("/:token", resetPassword);

module.exports = router;
