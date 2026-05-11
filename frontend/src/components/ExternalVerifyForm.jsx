import { useState } from "react";
import { verifyExternalInternship } from "../services/verificationService";

function ExternalVerifyForm({ studentId }) {
  const [form, setForm] = useState({
    student_id: studentId,
    company_name: "",
    role: "",
    description: "",
    company_email: "",
    website_url: "",
    linkedin_url: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await verifyExternalInternship(form);
      alert(
        `Status: ${res.data.verification_status}\nScore: ${res.data.verification_score}%`
      );
    } catch (error) {
      alert(error.response?.data?.message || "Verification failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow border mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Verify External Internship
      </h2>

      <Input name="company_name" placeholder="Company Name" onChange={handleChange} />
      <Input name="role" placeholder="Role" onChange={handleChange} />
      <Input name="company_email" placeholder="Company Email" onChange={handleChange} />
      <Input name="website_url" placeholder="Website URL" onChange={handleChange} />
      <Input name="linkedin_url" placeholder="LinkedIn URL" onChange={handleChange} />

      <textarea
        name="description"
        placeholder="Paste internship description"
        onChange={handleChange}
        className="w-full mt-3 px-4 py-3 border rounded-xl"
        required
      />

      <button className="mt-4 bg-purple-600 text-white px-5 py-2 rounded-xl hover:bg-purple-700">
        Verify Now
      </button>
    </form>
  );
}

function Input({ name, placeholder, onChange }) {
  return (
    <input
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full mt-3 px-4 py-3 border rounded-xl"
      required
    />
  );
}

export default ExternalVerifyForm;