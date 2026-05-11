const express = require("express");
const multer = require("multer");
const db = require("../db");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/apply", upload.single("resume"), (req, res) => {
  const {
    student_id,
    internship_id,
    full_name,
    email,
    phone,
    cover_letter,
  } = req.body;

  const resume_url = req.file ? req.file.filename : null;

  if (!student_id || !internship_id || !full_name || !email || !phone || !resume_url) {
    return res.status(400).json({
      message: "All required fields are missing",
    });
  }

  const sql = `
    INSERT INTO applications
    (student_id, internship_id, full_name, email, phone, cover_letter, resume_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [student_id, internship_id, full_name, email, phone, cover_letter, resume_url],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Application submission failed",
          error: err,
        });
      }

      res.status(201).json({
        message: "Application submitted successfully",
        application_id: result.insertId,
      });
    }
  );
});

module.exports = router;