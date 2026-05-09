import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function StudentRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    year_of_study: "",
    branch: "",
    skills: "",
    projects: "",
    interests: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/student/register", form);
      alert("Student registered successfully");
      navigate("/student-login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-green-700 text-center">Student Register</h2>

        <Input name="name" placeholder="Full Name" onChange={handleChange} />
        <Input name="email" placeholder="Email" onChange={handleChange} />
        <Input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <Input name="year_of_study" placeholder="Year of Study" onChange={handleChange} />
        <Input name="branch" placeholder="Branch" onChange={handleChange} />
        <Input name="skills" placeholder="Skills e.g. HTML,CSS,JavaScript" onChange={handleChange} />
        <Input name="projects" placeholder="Projects" onChange={handleChange} />
        <Input name="interests" placeholder="Interests" onChange={handleChange} />

        <button className="w-full mt-5 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700">
          Register
        </button>

        <p className="text-center mt-4 text-sm">
          Already registered?{" "}
          <Link to="/student-login" className="text-green-700 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

function Input({ name, placeholder, type = "text", onChange }) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      required={name !== "projects" && name !== "interests"}
      className="w-full mt-4 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
    />
  );
}

export default StudentRegister;