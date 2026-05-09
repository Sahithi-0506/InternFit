const express = require("express");
const router = express.Router();

const {
  addReview,
  getReviewsByInternship,
} = require("../controllers/reviewController");

router.post("/add", addReview);
router.get("/internship/:internship_id", getReviewsByInternship);

module.exports = router;