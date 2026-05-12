const db = require("../db");

exports.addReview = (req, res) => {
  const {
    alumni_id,
    internship_id,
    company_name,
    role,
    review_text,
    interview_questions,
    preparation_tips,
    is_genuine,
  } = req.body;

  const sql = `
    INSERT INTO reviews
    (alumni_id, internship_id, company_name, role, review_text,
     interview_questions, preparation_tips, is_genuine)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      alumni_id,
      internship_id,
      company_name,
      role,
      review_text,
      interview_questions,
      preparation_tips,
      is_genuine,
    ],
    (err) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to add review",
          error: err.message,
        });
      }

      res.status(201).json({
        message: "Review added successfully",
      });
    }
  );
};

exports.getReviewsByInternship = (req, res) => {
  const { internship_id } = req.params;

  const sql = `
    SELECT r.*, a.name AS alumni_name
    FROM reviews r
    JOIN alumni a ON r.alumni_id = a.alumni_id
    WHERE r.internship_id = ?
    ORDER BY r.review_id DESC
  `;

  db.query(sql, [internship_id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch reviews",
        error: err.message,
      });
    }

    res.status(200).json(result);
  });
};