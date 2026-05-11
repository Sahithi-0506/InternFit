import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [internships, setInternships] = useState([]);
  const [resume, setResume] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [urlData, setUrlData] = useState({
    internship_url: "",
    company_email: "",
    website_url: "",
    linkedin_url: "",
    description: "",
  });

  let student = {};
  try {
    student = JSON.parse(localStorage.getItem("student")) || {};
  } catch {
    student = {};
  }

  const fetchInternships = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/internships/all");
      setInternships(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const uploadResume = async () => {
    if (!resume) {
      alert("Please select a PDF resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      const res = await axios.post(
        `http://localhost:5000/api/profile/resume/${student?.student_id || 1}`,
        formData
      );
      alert(
  `${res.data.message}\nExtracted Skills: ${res.data.extracted_skills?.join(", ")}`
);

const oldStudent = JSON.parse(localStorage.getItem("student"));

localStorage.setItem(
  "student",
  JSON.stringify({
    ...oldStudent,
    skills: res.data.extracted_skills?.join(", "),
    resume_url: res.data.resume_url,
  })
);
    } catch (error) {
  console.log(error.response?.data);

  alert(
    error.response?.data?.error ||
    error.response?.data?.message ||
    "Resume upload failed"
  );
}
  };

  const checkMatch = async (internshipId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/match/${student?.student_id || 1}/${internshipId}`
      );
      setMatchResult(res.data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      alert("Match calculation failed");
    }
  };

  const verifyExternal = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/verify/external", {
        student_id: student?.student_id || 1,
        ...urlData,
      });

      alert(
        `Status: ${res.data.verification_status}\nScore: ${res.data.final_score}\n${res.data.message}`
      );
    } catch {
      alert("Verification failed");
    }
  };

  const badgeColor = (status) => {
    if (status === "Verified") return "bg-green-100 text-green-700";
    if (status === "Caution") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const filteredInternships = internships.filter((intern) => {
    const matchesFilter =
      selectedFilter === "All" || intern.verification_status === selectedFilter;

    const text = `${intern.company_name} ${intern.role} ${intern.required_skills}`.toLowerCase();

    const matchesSearch = text.includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const verifiedCount = internships.filter(
    (item) => item.verification_status === "Verified"
  ).length;

  const cautionCount = internships.filter(
    (item) => item.verification_status === "Caution"
  ).length;

  const scamCount = internships.filter(
    (item) => item.verification_status === "Scam Suspected"
  ).length;

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="bg-white shadow px-8 py-5 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-bold text-green-700">INTERN FIT</h1>
          <p className="text-sm text-gray-500">
            Verified Internship Matching Platform
          </p>
        </div>

        <div className="text-right">
          <p className="text-gray-700 font-medium">
            Welcome, {student?.name || "User"}
          </p>
          <p className="text-xs text-gray-500">Student Dashboard</p>
        </div>
      </nav>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <StatCard title="Total Internships" value={internships.length} />
          <StatCard title="Verified" value={verifiedCount} color="green" />
          <StatCard title="Caution" value={cautionCount} color="yellow" />
          <StatCard title="Scam Suspected" value={scamCount} color="red" />
        </div>

        {matchResult && (
          <div className="bg-white rounded-2xl shadow p-6 mb-8 border-l-4 border-blue-600">
            <h2 className="text-2xl font-bold text-gray-800">
              Skill Match Result
            </h2>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">Match Percentage</p>
                <h3 className="text-3xl font-bold text-blue-700">
                  {matchResult.match_percentage}%
                </h3>
              </div>

              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">Matched Skills</p>
                <p className="font-semibold text-green-700">
                  {matchResult.matched_skills?.join(", ") || "None"}
                </p>
              </div>

              <div className="bg-red-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">Missing Skills</p>
                <p className="font-semibold text-red-700">
                  {matchResult.missing_skills?.join(", ") || "None"}
                </p>
              </div>

              <div className="bg-purple-50 rounded-xl p-4">
                <p className="text-sm text-gray-500">Estimated Time</p>
                <p className="font-semibold text-purple-700">
                  {matchResult.estimated_preparation_time}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="font-bold text-gray-800 mb-2">
                Suggested Resources
              </h3>

              {matchResult.suggested_resources?.length > 0 ? (
                matchResult.suggested_resources.map((item, index) => (
                  <p key={index} className="text-sm mt-1">
                    <b>{item.skill}</b>:{" "}
                    <a
                      href={item.resource}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      Learn here
                    </a>
                  </p>
                ))
              ) : (
                <p className="text-green-700">
                  Great! No major skill gaps found.
                </p>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800">Upload Resume</h2>
            <p className="text-sm text-gray-500 mt-1">
              Upload PDF resume for skill matching.
            </p>

            <div className="flex gap-4 mt-5">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setResume(e.target.files[0])}
                className="border px-4 py-3 rounded-xl w-full"
              />

              <button
                onClick={uploadResume}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
              >
                Upload
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800">
              Smart Search
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Search internships by company, role, or skill.
            </p>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search React, Java, TCS, Frontend..."
              className="w-full mt-5 px-4 py-3 border rounded-xl"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800">
            Verify External Internship
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Paste internship details from WhatsApp, Telegram, LinkedIn, or any
            website.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            {["internship_url", "company_email", "website_url", "linkedin_url"].map(
              (field) => (
                <input
                  key={field}
                  placeholder={field.replaceAll("_", " ")}
                  value={urlData[field]}
                  onChange={(e) =>
                    setUrlData({ ...urlData, [field]: e.target.value })
                  }
                  className="px-4 py-3 border rounded-xl"
                />
              )
            )}
          </div>

          <textarea
            placeholder="Internship description"
            value={urlData.description}
            onChange={(e) =>
              setUrlData({ ...urlData, description: e.target.value })
            }
            className="w-full mt-4 px-4 py-3 border rounded-xl"
          />

          <button
            onClick={verifyExternal}
            className="mt-5 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
          >
            Verify Internship
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {["All", "Verified", "Caution", "Scam Suspected"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-5 py-2 rounded-full ${
                selectedFilter === filter
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 border"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Recommended Internships
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredInternships.map((intern) => (
            <div
              key={intern.internship_id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {intern.role}
                  </h3>
                  <p className="mt-1 text-gray-600">{intern.company_name}</p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${badgeColor(
                    intern.verification_status
                  )}`}
                >
                  {intern.verification_status}
                </span>
              </div>

              <div className="mt-4 text-sm text-gray-600 space-y-2">
                <p>
                  <b>Duration:</b> {intern.duration}
                </p>
                <p>
                  <b>Mode:</b> {intern.mode}
                </p>
                <p>
                  <b>Stipend:</b> ₹{intern.stipend}
                </p>
                <p>
                  <b>Skills:</b> {intern.required_skills}
                </p>
                <p>
                  <b>Verification Score:</b> {intern.verification_score}/100
                </p>
              </div>

              <button
                onClick={() => checkMatch(intern.internship_id)}
                className="mt-5 w-full py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
              >
                Check Match
              </button>

              <button
                disabled={intern.verification_status !== "Verified"}
                className={`mt-3 w-full py-3 rounded-xl ${
                  intern.verification_status === "Verified"
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                {intern.verification_status === "Verified"
                  ? "Apply Now"
                  : "Not Safe to Apply"}
              </button>
            </div>
          ))}
        </div>

        {filteredInternships.length === 0 && (
          <div className="bg-white text-center p-10 rounded-2xl shadow">
            <p className="text-gray-600">No internships found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, color = "blue" }) {
  const colors = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className={`text-3xl font-bold mt-2 ${colors[color]}`}>
        {value}
      </h2>
    </div>
  );
}

export default Dashboard;