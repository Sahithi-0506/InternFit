const express = require("express");

const router = express.Router();

const {
  registerStudent,
  loginStudent,
  registerAlumni,
  loginAlumni,
} = require("../controllers/authController");


// STUDENT
router.post("/student/register", registerStudent);
router.post("/student/login", loginStudent);


// ALUMNI
router.post("/alumni/register", registerAlumni);
router.post("/alumni/login", loginAlumni);

module.exports = router;