import { useEffect, useState } from "react";
import { addReview } from "../services/reviewService";
import { getAllInternships } from "../services/internshipService";

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
      <nav className="bg-white shadow px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-green-700">INTERN FIT</h1>
          <p className="text-sm text-gray-500">Alumni Support Dashboard</p>
        </div>

        <div className="text-right">
          <p className="font-medium text-gray-700">
            Welcome, {alumni?.name || "Alumni"}
          </p>
          <p className="text-xs text-gray-500">
            Help juniors with real internship guidance
          </p>
        </div>
      </nav>

      <div className="p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Alumni Dashboard
        </h2>

        <p className="text-gray-600 mb-8">
          Share internship experience, company reality check, interview questions,
          and preparation tips for juniors.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <Card title="Share Reviews" value="Company reality" />
          <Card title="Verify Internships" value="Genuine / Fake" />
          <Card title="Guide Juniors" value="Tips & roadmap" />
          <Card title="Post Opportunities" value="Coming soon" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow p-6"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-5">
              Add Internship Experience / Review
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="internship_id"
                value={review.internship_id}
                onChange={handleChange}
                placeholder="Internship ID"
                className="border px-4 py-3 rounded-xl"
                required
              />

              <input
                name="company_name"
                value={review.company_name}
                onChange={handleChange}
                placeholder="Company Name"
                className="border px-4 py-3 rounded-xl"
                required
              />

              <input
                name="role"
                value={review.role}
                onChange={handleChange}
                placeholder="Role / Internship Title"
                className="border px-4 py-3 rounded-xl"
                required
              />

              <select
                name="is_genuine"
                value={review.is_genuine}
                onChange={handleChange}
                className="border px-4 py-3 rounded-xl"
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
              placeholder="Company review / internship reality check"
              className="w-full border px-4 py-3 rounded-xl mt-4"
              rows="4"
              required
            />

            <textarea
              name="interview_questions"
              value={review.interview_questions}
              onChange={handleChange}
              placeholder="Interview questions asked"
              className="w-full border px-4 py-3 rounded-xl mt-4"
              rows="3"
            />

            <textarea
              name="preparation_tips"
              value={review.preparation_tips}
              onChange={handleChange}
              placeholder="Preparation tips for juniors"
              className="w-full border px-4 py-3 rounded-xl mt-4"
              rows="3"
            />

            <button
              type="submit"
              className="mt-5 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
            >
              Submit Review
            </button>
          </form>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-5">
              Guide Juniors
            </h3>

            <div className="space-y-4 text-gray-700">
              <Guide title="Resume Tips" text="Tell juniors what skills, projects, and keywords helped you get shortlisted." />
              <Guide title="Interview Preparation" text="Share commonly asked questions, coding topics, HR questions, and mistakes to avoid." />
              <Guide title="Skill Roadmap" text="Suggest what to learn for roles like Java Backend, Frontend, Data Analyst, or Full Stack." />
              <Guide title="Reality Check" text="Explain whether the internship gives real work, certificate only, stipend, mentorship, or project exposure." />
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-5">
          Internships for Alumni Review
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {internships.map((internship) => (
            <div
              key={internship.internship_id}
              className="bg-white rounded-2xl shadow p-6"
            >
              <h4 className="text-xl font-bold text-gray-800">
                {internship.role}
              </h4>

              <p className="text-gray-600 mt-1">
                {internship.company_name}
              </p>

              <div className="mt-4 text-sm text-gray-700 space-y-2">
                <p><b>Internship ID:</b> {internship.internship_id}</p>
                <p><b>Skills:</b> {internship.required_skills}</p>
                <p><b>Duration:</b> {internship.duration}</p>
                <p><b>Mode:</b> {internship.mode}</p>
                <p><b>Stipend:</b> ₹{internship.stipend}</p>
                <p><b>Status:</b> {internship.verification_status}</p>
                <p><b>Score:</b> {internship.verification_score}/100</p>
              </div>

              <button
                onClick={() => fillReviewForm(internship)}
                className="mt-5 w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
              >
                Add / View Review
              </button>

              <button
                onClick={() => setSelectedInternship(internship)}
                className="mt-3 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {selectedInternship && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow p-6 max-w-xl w-full">
              <h3 className="text-2xl font-bold text-gray-800">
                {selectedInternship.role}
              </h3>

              <p className="text-gray-600 mt-1">
                {selectedInternship.company_name}
              </p>

              <div className="mt-4 text-gray-700 space-y-2">
                <p><b>Description:</b> {selectedInternship.description}</p>
                <p><b>Skills:</b> {selectedInternship.required_skills}</p>
                <p><b>Duration:</b> {selectedInternship.duration}</p>
                <p><b>Mode:</b> {selectedInternship.mode}</p>
                <p><b>Location:</b> {selectedInternship.location}</p>
                <p><b>Stipend:</b> ₹{selectedInternship.stipend}</p>
                <p><b>Verification:</b> {selectedInternship.verification_status}</p>
              </div>

              <button
                onClick={() => setSelectedInternship(null)}
                className="mt-5 bg-red-500 text-white px-5 py-2 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-lg font-bold text-green-700 mt-2">{value}</h2>
    </div>
  );
}

function Guide({ title, text }) {
  return (
    <div className="border rounded-xl p-4 bg-slate-50">
      <h4 className="font-bold text-green-700">{title}</h4>
      <p className="text-sm mt-1">{text}</p>
    </div>
  );
}

export default AlumniDashboard;