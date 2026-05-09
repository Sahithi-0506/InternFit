import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AlumniRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
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

    if (!form.linkedin_url.includes("linkedin.com")) {
      alert("Please enter valid LinkedIn profile link");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/alumni/register", form);
      alert("Alumni registered successfully");
      navigate("/alumni-login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-purple-700 text-center">Alumni Register</h2>
        <p className="text-center text-sm text-gray-500 mt-2">
          LinkedIn profile is used for alumni verification.
        </p>

        <Input name="name" placeholder="Full Name" onChange={handleChange} />
        <Input name="email" placeholder="Email" onChange={handleChange} />
        <Input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <Input name="graduation_year" placeholder="Graduation Year" onChange={handleChange} />
        <Input name="branch" placeholder="Branch" onChange={handleChange} />
        <Input name="linkedin_url" placeholder="LinkedIn Profile URL" onChange={handleChange} />
        <Input name="college_email" placeholder="College Email" onChange={handleChange} />

        <button className="w-full mt-5 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700">
          Register as Verified Alumni
        </button>

        <p className="text-center mt-4 text-sm">
          Already registered?{" "}
          <Link to="/alumni-login" className="text-purple-700 font-semibold">
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
      required
      className="w-full mt-4 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
    />
  );
}

export default AlumniRegister;