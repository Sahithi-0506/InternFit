import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  GraduationCap,
  Building2,
  ArrowRight,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { registerStudent } from "../services/authService";

function StudentRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    year_of_study: "",
    branch: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const { confirmPassword, ...studentData } = form;

    await registerStudent(studentData);

    alert("Student registered successfully");

    navigate("/student-login");
  } catch (error) {
    alert(error.response?.data?.message || "Registration failed");
  }
};
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden relative px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-slate-950 to-blue-900/40"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="hidden lg:flex flex-col justify-center p-14 bg-gradient-to-br from-green-600 to-blue-600 text-white">
          <div className="bg-white/20 w-20 h-20 rounded-3xl flex items-center justify-center">
            <GraduationCap className="w-10 h-10" />
          </div>

          <h1 className="text-5xl font-extrabold mt-8 leading-tight">
            Start your safe internship journey
          </h1>

          <p className="mt-6 text-lg text-white/90 leading-relaxed">
            Create your student account first. After login, upload your resume
            and INTERN FIT will extract skills automatically for matching.
          </p>

          <div className="mt-10 space-y-4">
            <Feature icon={<ShieldCheck />} text="Verified internship access" />
            <Feature icon={<FileText />} text="Resume-based skill extraction" />
            <Feature icon={<GraduationCap />} text="Personalized internship matching" />
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-800">
              Student Register
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Enter basic details only. Skills will be extracted from your resume later.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Input
              icon={<User />}
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />

            <Input
              icon={<Mail />}
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
            />

            <Input
              icon={<Lock />}
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
            
            <Input
              icon={<Lock />}
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              />
            <Input
              icon={<GraduationCap />}
              name="year_of_study"
              placeholder="Year of Study"
              onChange={handleChange}
            />

            <Input
              icon={<Building2 />}
              name="branch"
              placeholder="Branch"
              onChange={handleChange}
            />

            <button className="w-full mt-7 bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-2xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg">
              Register <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="text-center mt-6 text-slate-600">
            Already registered?{" "}
            <Link
              to="/student-login"
              className="text-green-700 font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Input({ icon, name, placeholder, type = "text", onChange }) {
  return (
    <div className="relative mt-5">
      <div className="absolute left-4 top-4 text-slate-400 w-5 h-5">
        {icon}
      </div>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        required
        className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
  );
}

function Feature({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-white/20 p-2 rounded-xl">{icon}</div>
      <p className="text-white/90">{text}</p>
    </div>
  );
}

export default StudentRegister;