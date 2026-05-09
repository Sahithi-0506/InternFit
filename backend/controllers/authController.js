const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");


// STUDENT REGISTER
exports.registerStudent = async (req, res) => {
  const {
    name,
    email,
    password,
    year_of_study,
    branch,
    skills,
    projects,
    interests,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO students
      (name,email,password,year_of_study,branch,skills,projects,interests)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        name,
        email,
        hashedPassword,
        year_of_study,
        branch,
        skills,
        projects,
        interests,
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Student registration failed",
            error: err.message,
          });
        }

        res.status(201).json({
          message: "Student registered successfully",
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// STUDENT LOGIN
exports.loginStudent = (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM students WHERE email = ?`;

  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Login failed",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const student = result[0];

    const isMatch = await bcrypt.compare(
      password,
      student.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: student.student_id,
        email: student.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      student,
    });
  });
};


// ALUMNI REGISTER
exports.registerAlumni = async (req, res) => {
  const {
    name,
    email,
    password,
    graduation_year,
    branch,
    linkedin_url,
    college_email,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO alumni
      (name,email,password,graduation_year,branch,linkedin_url,college_email)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        name,
        email,
        hashedPassword,
        graduation_year,
        branch,
        linkedin_url,
        college_email,
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            message: "Alumni registration failed",
            error: err.message,
          });
        }

        res.status(201).json({
          message: "Alumni registered successfully",
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ALUMNI LOGIN
exports.loginAlumni = (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM alumni WHERE email = ?`;

  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Login failed",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "Alumni not found",
      });
    }

    const alumni = result[0];

    const isMatch = await bcrypt.compare(
      password,
      alumni.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: alumni.alumni_id,
        email: alumni.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      alumni,
    });
  });
};