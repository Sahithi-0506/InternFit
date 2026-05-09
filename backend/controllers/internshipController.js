const db = require("../db");

const calculateVerification = (data) => {
  let score = 0;
  let scamPenalty = 0;

  const scamKeywords = [
    "registration fee",
    "pay",
    "security deposit",
    "100% placement",
    "confirm seat",
    "limited seats pay"
  ];

  const description = (data.description || "").toLowerCase();

  const hasScamKeyword = scamKeywords.some((word) =>
    description.includes(word)
  );

  if (data.company_email && !data.company_email.includes("@gmail.com") && !data.company_email.includes("@yahoo.com")) {
    score += 20;
  }

  if (data.website_url && data.linkedin_url) {
    score += 20;
  }

  if (!description.includes("fee") && !description.includes("pay")) {
    score += 20;
  }

  if (data.role && data.duration) {
    score += 15;
  }

  score += 10;

  if (hasScamKeyword) {
    scamPenalty = 15;
    score -= scamPenalty;
  }

  if (score < 0) score = 0;
  if (score > 100) score = 100;

  let status = "Scam Suspected";

  if (score >= 80) {
    status = "Verified";
  } else if (score >= 60) {
    status = "Caution";
  }

  return { score, status };
};

exports.addInternship = (req, res) => {
  const {
    company_name,
    role,
    duration,
    required_skills,
    description,
    company_email,
    website_url,
    linkedin_url,
    stipend,
    location,
    mode,
  } = req.body;

  const verification = calculateVerification(req.body);

  const sql = `
    INSERT INTO internships
    (company_name, role, duration, required_skills, description, company_email,
     website_url, linkedin_url, stipend, location, mode, verification_score, verification_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      company_name,
      role,
      duration,
      required_skills,
      description,
      company_email,
      website_url,
      linkedin_url,
      stipend,
      location,
      mode,
      verification.score,
      verification.status,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to add internship",
          error: err.message,
        });
      }

      res.status(201).json({
        message: "Internship added successfully",
        verification_score: verification.score,
        verification_status: verification.status,
      });
    }
  );
};

exports.getAllInternships = (req, res) => {
  const sql = `SELECT * FROM internships ORDER BY created_at DESC`;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch internships",
        error: err.message,
      });
    }

    res.status(200).json(result);
  });
};

exports.getVerifiedInternships = (req, res) => {
  const sql = `
    SELECT * FROM internships
    WHERE verification_status = 'Verified'
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch verified internships",
        error: err.message,
      });
    }

    res.status(200).json(result);
  });
};