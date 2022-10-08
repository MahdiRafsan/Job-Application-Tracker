const express = require("express");
const multer = require("multer");

const router = express.Router();
const isAuthorized = require("../middlewares/authMiddleware");
const { storage } = require("../utils/cloudinary");
const validImage = require("../utils/validImage");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => validImage(file, cb),
});

router.get("/", isAuthorized, getAllUsers);
router.get("/:id", isAuthorized, getUser);
router.patch("/:id", isAuthorized, upload.single("image"), updateUser);
router.delete("/:id", isAuthorized, deleteUser);

module.exports = router;
