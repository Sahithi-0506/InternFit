const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  uploadResume,
} = require("../controllers/profileController");

router.post(
  "/resume/:student_id",
  upload.single("resume"),
  uploadResume
);

module.exports = router;