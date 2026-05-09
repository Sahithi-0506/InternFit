const express = require("express");
const router = express.Router();

const {
  addInternship,
  getAllInternships,
  getVerifiedInternships,
} = require("../controllers/internshipController");

router.post("/add", addInternship);
router.get("/all", getAllInternships);
router.get("/verified", getVerifiedInternships);

module.exports = router;