import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ApplyInternship() {
  const location = useLocation();
  const navigate = useNavigate();

  const internship = location.state?.internship;

  const [resume, setResume] = useState(null);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    cover_letter: "",
  });

  let student = {};
  try {
    student = JSON.parse(localStorage.getItem("student")) || {};
  } catch {
    student = {};
  }

  if (!internship) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white p-8 rounded-2xl shadow text-center">
          <h2 className="text-xl font-bold text-red-600">
            Internship details not found
          </h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-xl"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleApply = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please upload your resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("student_id", student?.student_id || 1);
    formData.append("internship_id", internship.internship_id);
    formData.append("full_name", form.full_name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("cover_letter", form.cover_letter);

    try {
      await axios.post("http://localhost:5000/api/applications/apply", formData);

      alert("Application submitted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data);
      alert(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Application submission failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-5 text-blue-600 font-semibold"
      >
        ← Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow p-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {internship.role}
          </h1>

          <p className="text-lg text-gray-600 mt-2">
            {internship.company_name}
          </p>

          <div className="mt-6 text-gray-700 space-y-3">
            <p><b>Description:</b> {internship.description}</p>
            <p><b>Required Skills:</b> {internship.required_skills}</p>
            <p><b>Duration:</b> {internship.duration}</p>
            <p><b>Mode:</b> {internship.mode}</p>
            <p><b>Location:</b> {internship.location}</p>
            <p><b>Stipend:</b> ₹{internship.stipend}</p>
            <p><b>Verification Score:</b> {internship.verification_score}/100</p>
          </div>
        </div>

        <form
          onSubmit={handleApply}
          className="bg-white rounded-2xl shadow p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            Application Form
          </h2>

          <input
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 border rounded-xl"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 border rounded-xl"
            required
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 border rounded-xl"
            required
          />

          <textarea
            name="cover_letter"
            placeholder="Why are you interested in this internship?"
            value={form.cover_letter}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 border rounded-xl"
            rows="5"
          />

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setResume(e.target.files[0])}
            className="w-full mb-5 px-4 py-3 border rounded-xl"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplyInternship;