import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AlumniLogin() {
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
      const res = await axios.post("http://localhost:5000/api/auth/alumni/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userType", "alumni");
      localStorage.setItem("alumni", JSON.stringify(res.data.alumni));

      alert("Login successful");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-purple-700 text-center">Alumni Login</h2>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mt-6 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-400"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mt-4 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-400"
          required
        />

        <button className="w-full mt-6 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700">
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          New alumni?{" "}
          <Link to="/alumni-register" className="text-purple-700 font-semibold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default AlumniLogin;