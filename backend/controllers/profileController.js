const fs = require("fs");
const pdfParse = require("pdf-parse");
const db = require("../db");

const skillAliases = {
  html: ["html", "html5", "hyper text markup"],
  css: ["css", "css3", "cascading style"],
  javascript: ["javascript", "java script", "js", "ecmascript"],
  react: ["react", "reactjs", "react.js"],
  nodejs: ["node", "nodejs", "node.js", "node js"],
  express: ["express", "expressjs", "express.js"],
  mysql: ["mysql"],
  sql: ["sql", "dbms", "database"],
  java: ["java"],
  springboot: ["spring boot", "springboot"],
  python: ["python", "py"],
  django: ["django"],
  flask: ["flask"],
  mongodb: ["mongodb", "mongo db"],
  git: ["git", "github"],
  restapi: ["rest api", "restapi", "api"],
  excel: ["excel", "ms excel"],
  c: [" c ", "c programming", "c language"],
  cpp: ["c++", "cpp"],
};

const extractSkills = (text) => {
  const cleanText = ` ${text
    .toLowerCase()
    .replace(/[^a-z0-9+#.]/g, " ")
    .replace(/\s+/g, " ")} `;

  const detected = [];

  for (const skill in skillAliases) {
    const aliases = skillAliases[skill];

    const found = aliases.some((alias) =>
      cleanText.includes(` ${alias.toLowerCase()} `) ||
      cleanText.includes(alias.toLowerCase())
    );

    if (found) {
      detected.push(skill);
    }
  }

  return [...new Set(detected)];
};

exports.uploadResume = async (req, res) => {
  const { student_id } = req.params;

  if (!req.file) {
    return res.status(400).json({
      message: "No resume uploaded",
    });
  }

  try {
    const resumePath = req.file.path;

    const pdfBuffer = fs.readFileSync(resumePath);
    const pdfData = await pdfParse(pdfBuffer);

    console.log("PDF TEXT:", pdfData.text);

    const extractedSkills = extractSkills(pdfData.text || "");
    const skillsString = extractedSkills.join(",");

    if (extractedSkills.length === 0) {
      return res.status(200).json({
        message:
          "Resume uploaded, but no readable skills found. Please upload a text-based PDF.",
        resume_url: resumePath,
        extracted_skills: [],
      });
    }

    const updateSql = `
      UPDATE students
      SET resume_url = ?, skills = ?
      WHERE student_id = ?
    `;

    db.query(updateSql, [resumePath, skillsString, student_id], (err) => {
      if (err) {
        return res.status(500).json({
          message: "Resume upload failed",
          error: err.message,
        });
      }

      res.status(200).json({
        message: "Resume uploaded and skills extracted successfully",
        resume_url: resumePath,
        extracted_skills: extractedSkills,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Resume parsing failed",
      error: error.message,
    });
  }
};