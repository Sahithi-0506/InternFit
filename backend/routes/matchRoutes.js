const express = require("express");

const router = express.Router();

const {
  calculateMatch,
} = require("../controllers/matchController");

router.get(
  "/:student_id/:internship_id",
  calculateMatch
);

module.exports = router;