import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
      const res = await axios.post("http://localhost:5000/api/auth/student/login", form);

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
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-700 text-center">Student Login</h2>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mt-6 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mt-4 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400"
          required
        />

        <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          New student?{" "}
          <Link to="/student-register" className="text-blue-700 font-semibold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default StudentLogin;