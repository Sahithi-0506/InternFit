import { useState } from "react";
import { uploadResume } from "../services/profileService";

function ResumeUpload({ studentId }) {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select resume PDF");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await uploadResume(studentId, formData);
      alert(res.data.message || "Resume uploaded successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Resume upload failed");
    }
  };

  return (
    <form onSubmit={handleUpload} className="bg-white p-6 rounded-2xl shadow border mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Upload Resume
      </h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full border p-3 rounded-xl"
      />

      <button className="mt-4 bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700">
        Upload Resume
      </button>
    </form>
  );
}

export default ResumeUpload;