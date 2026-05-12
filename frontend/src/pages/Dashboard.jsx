import { useEffect, useState } from "react";
import { getAllInternships } from "../services/internshipService";
import { calculateMatch } from "../services/matchService";
import { verifyExternalInternship } from "../services/verificationService";
import { uploadResumeService } from "../services/profileService";

import StatCard from "../components/StatCard";
import MatchResult from "../components/MatchResult";
import InternshipCard from "../components/InternshipCard";

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
      const res = await getAllInternships();
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
     const res = await uploadResumeService(student?.student_id || 1, formData);

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
      const res = await calculateMatch(student?.student_id || 1, internshipId);

      setMatchResult(res.data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      alert("Match calculation failed");
    }
  };

  const verifyExternal = async () => {
    try {
      const res = await verifyExternalInternship({
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

  const filteredInternships = internships.filter((intern) => {
    const matchesFilter =
      selectedFilter === "All" || intern.verification_status === selectedFilter;

    const text =
      `${intern.company_name} ${intern.role} ${intern.required_skills}`.toLowerCase();

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

        <MatchResult matchResult={matchResult} />

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
            <h2 className="text-xl font-bold text-gray-800">Smart Search</h2>
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
            {[
              "internship_url",
              "company_email",
              "website_url",
              "linkedin_url",
            ].map((field) => (
              <input
                key={field}
                placeholder={field.replaceAll("_", " ")}
                value={urlData[field]}
                onChange={(e) =>
                  setUrlData({ ...urlData, [field]: e.target.value })
                }
                className="px-4 py-3 border rounded-xl"
              />
            ))}
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
            <InternshipCard
              key={intern.internship_id}
              internship={intern}
              onMatch={checkMatch}
            />
          ))}
        </div>

        {filteredInternships.length === 0 && (
          <div className="bg-white text-center p-10 rounded-2xl shadow mt-6">
            <p className="text-gray-600">No internships found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;