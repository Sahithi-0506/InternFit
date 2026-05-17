import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Building2,
  Clock3,
  IndianRupee,
  MapPin,
  ShieldCheck,
  Upload,
  Mail,
  User,
  Phone,
  FileText,
} from "lucide-react";

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
        <div className="bg-white p-8 rounded-3xl shadow text-center">
          <h2 className="text-xl font-bold text-red-600">
            Internship details not found
          </h2>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 bg-blue-600 text-white px-5 py-3 rounded-2xl"
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
    <div className="min-h-screen bg-slate-100">
      <nav className="bg-slate-950 text-white px-8 py-5 flex justify-between items-center shadow-lg">
        <div>
          <h1 className="text-2xl font-extrabold text-green-400">INTERN FIT</h1>
          <p className="text-sm text-slate-400">Internship Application</p>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </nav>

      <section className="bg-gradient-to-r from-slate-950 via-green-950 to-slate-900 text-white px-8 py-10">
        <h2 className="text-4xl font-extrabold">Apply with confidence</h2>
        <p className="mt-3 text-slate-300">
          Review internship details and submit your application with resume.
        </p>
      </section>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-800">
                {internship.role}
              </h1>
              <p className="text-lg text-slate-500 mt-2 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                {internship.company_name}
              </p>
            </div>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              {internship.verification_status}
            </span>
          </div>

          <p className="mt-6 text-slate-700 leading-relaxed">
            {internship.description || "No description provided."}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <Info icon={<Clock3 />} label="Duration" value={internship.duration} />
            <Info icon={<MapPin />} label="Mode" value={internship.mode} />
            <Info
              icon={<IndianRupee />}
              label="Stipend"
              value={`₹${internship.stipend}`}
            />
            <Info
              icon={<ShieldCheck />}
              label="Score"
              value={`${internship.verification_score}/100`}
            />
          </div>

          <div className="mt-6">
            <p className="font-bold text-slate-700 mb-3">Required Skills</p>
            <div className="flex flex-wrap gap-2">
              {internship.required_skills?.split(",").map((skill, index) => (
                <span
                  key={index}
                  className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleApply}
          className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7"
        >
          <h2 className="text-2xl font-extrabold text-slate-800 mb-2">
            Application Form
          </h2>
          <p className="text-slate-500 mb-6">
            Fill your details and upload your resume.
          </p>

          <Input
            icon={<User />}
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
          />

          <Input
            icon={<Mail />}
            name="email"
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            icon={<Phone />}
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <div className="relative mb-4">
            <FileText className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
            <textarea
              name="cover_letter"
              placeholder="Why are you interested in this internship?"
              value={form.cover_letter}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 border rounded-2xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-400"
              rows="5"
            />
          </div>

          <label className="block border-2 border-dashed border-slate-300 rounded-2xl p-5 bg-slate-50 cursor-pointer hover:bg-slate-100">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 text-green-700 p-3 rounded-2xl">
                <Upload />
              </div>
              <div>
                <p className="font-semibold text-slate-800">
                  Upload Resume PDF
                </p>
                <p className="text-sm text-slate-500">
                  {resume ? resume.name : "Choose a PDF file"}
                </p>
              </div>
            </div>

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setResume(e.target.files[0])}
              className="hidden"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-2xl font-semibold hover:opacity-90 shadow-lg"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-4 border">
      <div className="flex items-center gap-2 text-slate-500 text-sm">
        {icon}
        {label}
      </div>
      <p className="font-bold text-slate-800 mt-2">{value || "Not mentioned"}</p>
    </div>
  );
}

function Input({ icon, name, placeholder, type = "text", value, onChange }) {
  return (
    <div className="relative mb-4">
      <div className="absolute left-4 top-4 text-slate-400 w-5 h-5">
        {icon}
      </div>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="w-full pl-12 pr-4 py-4 border rounded-2xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
  );
}

export default ApplyInternship;