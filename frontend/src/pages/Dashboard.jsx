import { useEffect, useState } from "react";
import {
  UploadCloud,
  Search,
  ShieldCheck,
  X,
  MessageSquareText,
  ExternalLink,
} from "lucide-react";

import { getAllInternships } from "../services/internshipService";
import { calculateMatch } from "../services/matchService";
import { verifyExternalInternship } from "../services/verificationService";
import { uploadResumeService } from "../services/profileService";
import { getReviewsByInternship } from "../services/reviewService";

import StatCard from "../components/StatCard";
import MatchResult from "../components/MatchResult";
import InternshipCard from "../components/InternshipCard";

function Dashboard() {
  const [internships, setInternships] = useState([]);
  const [resume, setResume] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);

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

  const handleReviews = async (internshipId) => {
    try {
      const res = await getReviewsByInternship(internshipId);
      setReviews(Array.isArray(res.data) ? res.data : []);
      setShowReviews(true);
    } catch (error) {
      console.log(error.response?.data);
      alert("Failed to load alumni reviews");
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
      <nav className="bg-slate-950 text-white px-8 py-5 flex justify-between items-center sticky top-0 z-20 shadow-lg">
        <div>
          <h1 className="text-2xl font-extrabold text-green-400">INTERN FIT</h1>
          <p className="text-sm text-slate-400">
            Verified Internship Matching Platform
          </p>
        </div>

        <div className="text-right">
          <p className="font-semibold">Welcome, {student?.name || "User"}</p>
          <p className="text-xs text-slate-400">Student Dashboard</p>
        </div>
      </nav>

      <section className="bg-gradient-to-r from-slate-950 via-green-950 to-slate-900 text-white px-8 py-10">
        <h2 className="text-4xl font-extrabold">
          Find your safest internship match
        </h2>
        <p className="mt-3 text-slate-300 max-w-2xl">
          Upload resume, check skill match, verify internship links, and read
          alumni reviews before applying.
        </p>
      </section>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <StatCard title="Total Internships" value={internships.length} />
          <StatCard title="Verified" value={verifiedCount} color="green" />
          <StatCard title="Caution" value={cautionCount} color="yellow" />
          <StatCard title="Scam Suspected" value={scamCount} color="red" />
        </div>

        <MatchResult matchResult={matchResult} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 text-blue-700 p-3 rounded-2xl">
                <UploadCloud />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Upload Resume
                </h2>
                <p className="text-sm text-slate-500">
                  Extract skills automatically for matching.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-6">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setResume(e.target.files[0])}
                className="border px-4 py-3 rounded-2xl w-full bg-slate-50"
              />

              <button
                onClick={uploadResume}
                className="bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 font-semibold"
              >
                Upload
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 text-green-700 p-3 rounded-2xl">
                <Search />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Smart Search
                </h2>
                <p className="text-sm text-slate-500">
                  Search by company, role, or skill.
                </p>
              </div>
            </div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search React, Java, TCS, Frontend..."
              className="w-full mt-6 px-4 py-3 border rounded-2xl bg-slate-50"
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 text-emerald-700 p-3 rounded-2xl">
              <ShieldCheck />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Verify External Internship
              </h2>
              <p className="text-sm text-slate-500">
                Paste internship details from WhatsApp, Telegram, LinkedIn, or
                any website.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {["internship_url", "company_email", "website_url", "linkedin_url"].map(
              (field) => (
                <input
                  key={field}
                  placeholder={field.replaceAll("_", " ")}
                  value={urlData[field]}
                  onChange={(e) =>
                    setUrlData({ ...urlData, [field]: e.target.value })
                  }
                  className="px-4 py-3 border rounded-2xl bg-slate-50"
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
            className="w-full mt-4 px-4 py-3 border rounded-2xl bg-slate-50"
          />

          <button
            onClick={verifyExternal}
            className="mt-5 bg-green-600 text-white px-6 py-3 rounded-2xl hover:bg-green-700 font-semibold flex items-center gap-2"
          >
            Verify Internship <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {["All", "Verified", "Caution", "Scam Suspected"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-5 py-2 rounded-full font-semibold transition ${
                selectedFilter === filter
                  ? "bg-slate-950 text-white shadow"
                  : "bg-white text-slate-700 border hover:bg-slate-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <h2 className="text-3xl font-extrabold text-slate-800 mb-5">
          Recommended Internships
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredInternships.map((intern) => (
            <InternshipCard
              key={intern.internship_id}
              internship={intern}
              onMatch={checkMatch}
              onReviews={handleReviews}
            />
          ))}
        </div>

        {filteredInternships.length === 0 && (
          <div className="bg-white text-center p-10 rounded-3xl shadow mt-6">
            <p className="text-slate-600">No internships found.</p>
          </div>
        )}
      </div>

      {showReviews && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 text-purple-700 p-3 rounded-2xl">
                  <MessageSquareText />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Alumni Reviews
                </h2>
              </div>

              <button
                onClick={() => setShowReviews(false)}
                className="bg-red-500 text-white p-2 rounded-xl"
              >
                <X />
              </button>
            </div>

            {reviews.length === 0 ? (
              <p className="text-slate-600">
                No alumni reviews available for this internship yet.
              </p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.review_id}
                    className="border rounded-2xl p-5 bg-slate-50"
                  >
                    <p>
                      <b>Genuine Status:</b>{" "}
                      {review.is_genuine || review.genuine_status || "Not shared"}
                    </p>
                    <p className="mt-2">
                      <b>Review:</b>{" "}
                      {review.review_text ||
                        review.review ||
                        review.comment ||
                        "Not shared"}
                    </p>
                    <p className="mt-2">
                      <b>Interview Questions:</b>{" "}
                      {review.interview_questions ||
                        review.questions ||
                        "Not shared"}
                    </p>
                    <p className="mt-2">
                      <b>Preparation Tips:</b>{" "}
                      {review.preparation_tips || review.tips || "Not shared"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;