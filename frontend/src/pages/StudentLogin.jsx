import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  ShieldCheck,
  Mail,
  Lock,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

function StudentLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/student/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userType", "student");
      localStorage.setItem("student", JSON.stringify(res.data.student));

      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-slate-950 to-green-900/40"></div>

      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-20 right-10 w-72 h-72 bg-green-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="hidden lg:flex flex-col justify-center p-14 bg-gradient-to-br from-blue-600 to-green-500 text-white">
          <div className="bg-white/20 w-20 h-20 rounded-3xl flex items-center justify-center">
            <ShieldCheck className="w-10 h-10" />
          </div>

          <h1 className="text-5xl font-extrabold mt-8 leading-tight">
            Welcome back to INTERN FIT
          </h1>

          <p className="mt-6 text-lg text-white/90 leading-relaxed">
            Discover verified internships, upload your resume, check skill
            match percentage, and learn from alumni experiences before applying.
          </p>

          <div className="mt-10 space-y-4">
            <Feature text="Verified internship opportunities" />
            <Feature text="Resume-based skill matching" />
            <Feature text="Scam internship detection" />
            <Feature text="Real alumni reviews & guidance" />
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-blue-100 text-blue-700 p-3 rounded-2xl">
              <GraduationCap className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-3xl font-extrabold text-slate-800">
                Student Login
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Continue your internship journey
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-slate-400 w-5 h-5" />

              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="relative mt-5">
              <Lock className="absolute left-4 top-4 text-slate-400 w-5 h-5" />

              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button className="w-full mt-7 bg-gradient-to-r from-blue-600 to-green-500 text-white py-4 rounded-2xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg">
              Login <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="text-center mt-6 text-slate-600">
            New student?{" "}
            <Link
              to="/student-register"
              className="text-blue-700 font-bold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-3 h-3 bg-white rounded-full"></div>
      <p className="text-white/90">{text}</p>
    </div>
  );
}

export default StudentLogin;