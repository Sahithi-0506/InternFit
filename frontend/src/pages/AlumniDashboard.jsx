import { useEffect, useState } from "react";
import { addReview } from "../services/reviewService";
import { getAllInternships } from "../services/internshipService";

import {
  Users,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Building2,
  Clock3,
  IndianRupee,
  MapPin,
  X,
  FileText,
  MessageSquareText,
} from "lucide-react";

function AlumniDashboard() {
  const [internships, setInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null);

  const [review, setReview] = useState({
    internship_id: "",
    company_name: "",
    role: "",
    review_text: "",
    interview_questions: "",
    preparation_tips: "",
    is_genuine: "Yes",
  });

  let alumni = {};
  try {
    alumni = JSON.parse(localStorage.getItem("alumni")) || {};
  } catch {
    alumni = {};
  }

  useEffect(() => {
    loadInternships();
  }, []);

  const loadInternships = async () => {
    try {
      const res = await getAllInternships();
      setInternships(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
      alert("Failed to load internships");
    }
  };

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const fillReviewForm = (internship) => {
    setReview({
      ...review,
      internship_id: internship.internship_id,
      company_name: internship.company_name,
      role: internship.role,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addReview({
        alumni_id: alumni?.alumni_id || 1,
        ...review,
      });

      alert("Review submitted successfully");

      setReview({
        internship_id: "",
        company_name: "",
        role: "",
        review_text: "",
        interview_questions: "",
        preparation_tips: "",
        is_genuine: "Yes",
      });
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Review submission failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="bg-slate-950 text-white px-8 py-5 flex justify-between items-center shadow-lg">
        <div>
          <h1 className="text-2xl font-extrabold text-purple-400">
            INTERN FIT
          </h1>

          <p className="text-sm text-slate-400">
            Alumni Support Dashboard
          </p>
        </div>

        <div className="text-right">
          <p className="font-semibold">
            Welcome, {alumni?.name || "Alumni"}
          </p>

          <p className="text-xs text-slate-400">
            Help juniors with real internship guidance
          </p>
        </div>
      </nav>

      <section className="bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 text-white px-8 py-10">
        <h2 className="text-4xl font-extrabold">
          Guide juniors with your real experience
        </h2>

        <p className="mt-3 text-slate-300 max-w-3xl">
          Share internship reviews, interview questions, preparation tips,
          and help students avoid fake internships.
        </p>
      </section>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <Card
            icon={<MessageSquareText />}
            title="Share Reviews"
            value="Company Reality"
          />

          <Card
            icon={<ShieldCheck />}
            title="Verify Internships"
            value="Genuine / Fake"
          />

          <Card
            icon={<GraduationCap />}
            title="Guide Juniors"
            value="Tips & Roadmaps"
          />

          <Card
            icon={<Briefcase />}
            title="Opportunities"
            value="Coming Soon"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 text-purple-700 p-3 rounded-2xl">
                <FileText />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-800">
                  Add Internship Experience
                </h3>

                <p className="text-sm text-slate-500">
                  Share your real internship experience
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="internship_id"
                value={review.internship_id}
                onChange={handleChange}
                placeholder="Internship ID"
                className="border px-4 py-3 rounded-2xl bg-slate-50"
                required
              />

              <input
                name="company_name"
                value={review.company_name}
                onChange={handleChange}
                placeholder="Company Name"
                className="border px-4 py-3 rounded-2xl bg-slate-50"
                required
              />

              <input
                name="role"
                value={review.role}
                onChange={handleChange}
                placeholder="Role"
                className="border px-4 py-3 rounded-2xl bg-slate-50"
                required
              />

              <select
                name="is_genuine"
                value={review.is_genuine}
                onChange={handleChange}
                className="border px-4 py-3 rounded-2xl bg-slate-50"
              >
                <option value="Yes">Genuine</option>
                <option value="No">Fake / Not Recommended</option>
                <option value="Not Sure">Not Sure</option>
              </select>
            </div>

            <textarea
              name="review_text"
              value={review.review_text}
              onChange={handleChange}
              placeholder="Internship review / company reality check"
              className="w-full border px-4 py-3 rounded-2xl mt-4 bg-slate-50"
              rows="4"
              required
            />

            <textarea
              name="interview_questions"
              value={review.interview_questions}
              onChange={handleChange}
              placeholder="Interview questions asked"
              className="w-full border px-4 py-3 rounded-2xl mt-4 bg-slate-50"
              rows="3"
            />

            <textarea
              name="preparation_tips"
              value={review.preparation_tips}
              onChange={handleChange}
              placeholder="Preparation tips for juniors"
              className="w-full border px-4 py-3 rounded-2xl mt-4 bg-slate-50"
              rows="3"
            />

            <button
              type="submit"
              className="mt-5 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-2xl hover:opacity-90 font-semibold shadow-lg"
            >
              Submit Review
            </button>
          </form>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              Guide Juniors
            </h3>

            <div className="space-y-4">
              <Guide
                title="Resume Tips"
                text="Tell juniors what projects, skills, and resume keywords helped you get shortlisted."
              />

              <Guide
                title="Interview Preparation"
                text="Share coding topics, HR questions, and mistakes students should avoid."
              />

              <Guide
                title="Skill Roadmap"
                text="Suggest learning paths for Java Backend, Frontend, Data Analyst, or Full Stack."
              />

              <Guide
                title="Reality Check"
                text="Explain whether internship gives real work, mentorship, stipend, or only certificate."
              />
            </div>
          </div>
        </div>

        <h3 className="text-3xl font-extrabold text-slate-800 mb-6">
          Internships for Alumni Review
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {internships.map((internship) => (
            <div
              key={internship.internship_id}
              className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:shadow-2xl transition"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="text-2xl font-bold text-slate-800">
                    {internship.role}
                  </h4>

                  <p className="text-slate-500 mt-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {internship.company_name}
                  </p>
                </div>

                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {internship.verification_status}
                </span>
              </div>

              <div className="mt-6 space-y-3 text-sm text-slate-700">
                <p>
                  <b>ID:</b> {internship.internship_id}
                </p>

                <p>
                  <b>Skills:</b> {internship.required_skills}
                </p>

                <p className="flex items-center gap-2">
                  <Clock3 className="w-4 h-4" />
                  {internship.duration}
                </p>

                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {internship.mode}
                </p>

                <p className="flex items-center gap-2">
                  <IndianRupee className="w-4 h-4" />
                  ₹{internship.stipend}
                </p>

                <p>
                  <b>Score:</b> {internship.verification_score}/100
                </p>
              </div>

              <button
                onClick={() => fillReviewForm(internship)}
                className="mt-5 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-2xl hover:opacity-90 font-semibold"
              >
                Add Review
              </button>

              <button
                onClick={() => setSelectedInternship(internship)}
                className="mt-3 w-full bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 font-semibold"
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {selectedInternship && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl p-7 max-w-2xl w-full max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-3xl font-bold text-slate-800">
                    {selectedInternship.role}
                  </h3>

                  <p className="text-slate-500 mt-1">
                    {selectedInternship.company_name}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedInternship(null)}
                  className="bg-red-500 text-white p-2 rounded-xl"
                >
                  <X />
                </button>
              </div>

              <div className="mt-6 space-y-3 text-slate-700">
                <p>
                  <b>Description:</b>{" "}
                  {selectedInternship.description}
                </p>

                <p>
                  <b>Skills:</b>{" "}
                  {selectedInternship.required_skills}
                </p>

                <p>
                  <b>Duration:</b>{" "}
                  {selectedInternship.duration}
                </p>

                <p>
                  <b>Mode:</b> {selectedInternship.mode}
                </p>

                <p>
                  <b>Location:</b>{" "}
                  {selectedInternship.location}
                </p>

                <p>
                  <b>Stipend:</b> ₹{selectedInternship.stipend}
                </p>

                <p>
                  <b>Verification:</b>{" "}
                  {selectedInternship.verification_status}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ icon, title, value }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-6">
      <div className="bg-purple-100 text-purple-700 w-14 h-14 rounded-2xl flex items-center justify-center">
        {icon}
      </div>

      <p className="text-sm text-slate-500 mt-4">
        {title}
      </p>

      <h2 className="text-xl font-bold text-slate-800 mt-2">
        {value}
      </h2>
    </div>
  );
}

function Guide({ title, text }) {
  return (
    <div className="border rounded-2xl p-5 bg-slate-50">
      <h4 className="font-bold text-purple-700 text-lg">
        {title}
      </h4>

      <p className="text-sm mt-2 text-slate-600">
        {text}
      </p>
    </div>
  );
}

export default AlumniDashboard;