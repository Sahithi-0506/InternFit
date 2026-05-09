const express = require("express");
const router = express.Router();

const {
  verifyExternalInternship,
  getExternalVerifications,
} = require("../controllers/verificationController");

router.post("/external", verifyExternalInternship);
router.get("/external/:student_id", getExternalVerifications);

module.exports = router;