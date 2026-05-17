import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  Lock,
  GraduationCap,
  Building2,
  LinkIcon,
  ArrowRight,
  Users,
  ShieldCheck,
} from "lucide-react";

import { registerAlumni } from "../services/authService";

function AlumniRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    graduation_year: "",
    branch: "",
    linkedin_url: "",
    college_email: "",
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

    if (!form.linkedin_url.includes("linkedin.com")) {
      alert("Please enter valid LinkedIn profile link");
      return;
    }

    try {
      const { confirmPassword, ...alumniData } = form;
      await registerAlumni(alumniData);

      alert("Alumni registered successfully");
      navigate("/alumni-login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden relative px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-slate-950 to-pink-900/40"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="hidden lg:flex flex-col justify-center p-14 bg-gradient-to-br from-purple-600 to-pink-500 text-white">
          <div className="bg-white/20 w-20 h-20 rounded-3xl flex items-center justify-center">
            <Users className="w-10 h-10" />
          </div>

          <h1 className="text-5xl font-extrabold mt-8 leading-tight">
            Become a verified alumni mentor
          </h1>

          <p className="mt-6 text-lg text-white/90 leading-relaxed">
            Share internship experiences, guide juniors, and help students avoid
            fake opportunities using your real-world experience.
          </p>

          <div className="mt-10 space-y-4">
            <Feature text="Share genuine internship reviews" />
            <Feature text="Help juniors prepare interviews" />
            <Feature text="Guide students with roadmaps" />
            <Feature text="Support your college community" />
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-800">
              Alumni Register
            </h2>

            <p className="text-slate-500 text-sm mt-2">
              LinkedIn profile is used for alumni verification.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Input icon={<User />} name="name" placeholder="Full Name" onChange={handleChange} />
            <Input icon={<Mail />} name="email" type="email" placeholder="Email Address" onChange={handleChange} />
            <Input icon={<Lock />} name="password" type="password" placeholder="Password" onChange={handleChange} />
            <Input icon={<Lock />} name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />
            <Input icon={<GraduationCap />} name="graduation_year" placeholder="Graduation Year" onChange={handleChange} />
            <Input icon={<Building2 />} name="branch" placeholder="Branch" onChange={handleChange} />
            <Input icon={<LinkIcon />} name="linkedin_url" placeholder="LinkedIn Profile URL" onChange={handleChange} />
            <Input icon={<Mail />} name="college_email" placeholder="College Email" onChange={handleChange} />

            <button className="w-full mt-7 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-4 rounded-2xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 shadow-lg">
              Register <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="text-center mt-6 text-slate-600">
            Already registered?{" "}
            <Link to="/alumni-login" className="text-purple-700 font-bold hover:underline">
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
      <div className="absolute left-4 top-4 text-slate-400 w-5 h-5">{icon}</div>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        required
        className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-white/20 p-2 rounded-xl">
        <ShieldCheck className="w-5 h-5" />
      </div>
      <p className="text-white/90">{text}</p>
    </div>
  );
}

export default AlumniRegister;