const express = require("express");
const router = express.Router();

const {
  register,
  login,
  refresh,
  logout,
} = require("../controllers/authController");
const isAuthorized = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get('/refresh', refresh)
router.delete("/logout", logout);

module.exports = router;
