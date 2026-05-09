const db = require("../db");

exports.uploadResume = (req, res) => {
  const { student_id } = req.params;

  if (!req.file) {
    return res.status(400).json({
      message: "No resume uploaded",
    });
  }

  const resumePath = req.file.path;

  const sql = `
    UPDATE students
    SET resume_url = ?
    WHERE student_id = ?
  `;

  db.query(sql, [resumePath, student_id], (err) => {
    if (err) {
      return res.status(500).json({
        message: "Resume upload failed",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "Resume uploaded successfully",
      resume_url: resumePath,
    });
  });
};