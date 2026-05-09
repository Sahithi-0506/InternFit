const db = require("../db");

const resourceMap = {
  react: "https://www.youtube.com/results?search_query=react+tutorial",
  javascript: "https://www.youtube.com/results?search_query=javascript+tutorial",
  nodejs: "https://www.youtube.com/results?search_query=nodejs+tutorial",
  sql: "https://www.youtube.com/results?search_query=sql+tutorial",
  java: "https://www.youtube.com/results?search_query=java+tutorial",
};

exports.calculateMatch = (req, res) => {

  const { student_id, internship_id } = req.params;

  const studentSql = `
    SELECT * FROM students
    WHERE student_id = ?
  `;

  const internshipSql = `
    SELECT * FROM internships
    WHERE internship_id = ?
  `;

  db.query(studentSql, [student_id], (err, studentResult) => {

    if (err || studentResult.length === 0) {
      return res.status(500).json({
        message: "Student not found",
      });
    }

    db.query(internshipSql, [internship_id], (err, internshipResult) => {

      if (err || internshipResult.length === 0) {
        return res.status(500).json({
          message: "Internship not found",
        });
      }

      const student = studentResult[0];
      const internship = internshipResult[0];

      const studentSkills =
        (student.skills || "")
          .toLowerCase()
          .split(",");

      const requiredSkills =
        (internship.required_skills || "")
          .toLowerCase()
          .split(",");

      let matched = [];
      let missing = [];

      requiredSkills.forEach((skill) => {

        skill = skill.trim();

        if (studentSkills.includes(skill)) {
          matched.push(skill);
        } else {
          missing.push(skill);
        }

      });

      const skillMatch =
        (matched.length / requiredSkills.length) * 80;

      let projectScore =
        student.projects ? 10 : 0;

      let yearScore =
        student.year_of_study.includes("2")
          ? 5
          : 10;

      let finalScore =
        Math.round(skillMatch + projectScore + yearScore);

      if (finalScore > 100) {
        finalScore = 100;
      }

      const suggestedResources =
        missing.map((skill) => ({
          skill,
          resource:
            resourceMap[skill] ||
            "https://www.youtube.com/",
        }));

      let estimatedTime =
        `${missing.length * 1} week(s)`;

      res.status(200).json({

        match_percentage: finalScore,

        matched_skills: matched,

        missing_skills: missing,

        suggested_resources: suggestedResources,

        estimated_preparation_time: estimatedTime,

        apply_allowed:
          finalScore >= 80 &&
          internship.verification_status === "Verified",

      });

    });

  });

};