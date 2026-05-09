const db = require("../db");

const calculateScore = (data) => {
  let score = 0;
  let penalty = 0;

  const desc = (data.description || "").toLowerCase();

  if (data.company_email && !data.company_email.includes("@gmail.com") && !data.company_email.includes("@yahoo.com")) score += 20;
  if (data.website_url && data.linkedin_url) score += 20;
  if (!desc.includes("fee") && !desc.includes("pay") && !desc.includes("deposit")) score += 20;
  if (desc.includes("role") || desc.includes("duration") || data.description) score += 15;
  score += 10;

  const scamWords = ["registration fee", "pay", "100% placement", "confirm seat", "security deposit"];
  if (scamWords.some(word => desc.includes(word))) {
    penalty = 15;
    score -= 15;
  }

  if (score < 0) score = 0;
  if (score > 100) score = 100;

  let status = "Scam Suspected";
  if (score >= 80) status = "Verified";
  else if (score >= 60) status = "Caution";

  return { score, status, penalty };
};

exports.verifyExternalInternship = (req, res) => {
  const { student_id, internship_url, company_email, website_url, linkedin_url, description } = req.body;

  const result = calculateScore(req.body);

  const sql = `
    INSERT INTO external_verifications
    (student_id, internship_url, company_email, website_url, linkedin_url, description,
     final_score, verification_status, scam_keyword_penalty, result_message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const message =
    result.status === "Verified"
      ? "Safe to apply"
      : result.status === "Caution"
      ? "Apply with caution"
      : "Avoid this internship";

  db.query(
    sql,
    [student_id, internship_url, company_email, website_url, linkedin_url, description, result.score, result.status, result.penalty, message],
    (err) => {
      if (err) return res.status(500).json({ message: "Verification failed", error: err.message });

      res.status(200).json({
        message,
        final_score: result.score,
        verification_status: result.status,
      });
    }
  );
};

exports.getExternalVerifications = (req, res) => {
  const { student_id } = req.params;

  db.query(
    "SELECT * FROM external_verifications WHERE student_id = ? ORDER BY checked_at DESC",
    [student_id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Failed to fetch history", error: err.message });
      res.status(200).json(result);
    }
  );
};