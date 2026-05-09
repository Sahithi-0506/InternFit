import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [internships, setInternships] = useState([]);
  const [urlData, setUrlData] = useState({
    internship_url: "",
    company_email: "",
    website_url: "",
    linkedin_url: "",
    description: "",
  });

  // Safely parse student object
  let student = {};
  try {
    student = JSON.parse(localStorage.getItem("student")) || {};
  } catch {
    student = {};
  }

  const fetchInternships = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/internships/all");
      setInternships(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
      setInternships([]);
    }
  };

  useEffect(() => {
    // Don't call async function directly in useEffect
    const fetchData = async () => {
      await fetchInternships();
    };
    fetchData();
  }, []);

  const verifyExternal = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/verify/external", {
        student_id: student?.student_id || 1,
        ...urlData,
      });

      alert(
        `Status: ${res.data.verification_status}\nScore: ${res.data.final_score}\n${res.data.message}`
      );
    } catch {
      alert("Verification failed");
    }
  };

  const badgeColor = (status) => {
    if (status === "Verified") return "bg-green-100 text-green-700";
    if (status === "Caution") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="bg-white shadow px-8 py-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-700">INTERN FIT</h1>
        <p className="text-gray-600">Welcome, {student?.name || "User"}</p>
      </nav>

      <div className="p-8">
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Verify External Internship
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            {[
              "internship_url",
              "company_email",
              "website_url",
              "linkedin_url",
            ].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field.replaceAll("_", " ")}
                value={urlData[field]}
                onChange={(e) =>
                  setUrlData({ ...urlData, [field]: e.target.value })
                }
                className="px-4 py-3 border rounded-xl"
              />
            ))}
          </div>

          <textarea
            placeholder="Internship description"
            value={urlData.description}
            onChange={(e) =>
              setUrlData({ ...urlData, description: e.target.value })
            }
            className="w-full mt-4 px-4 py-3 border rounded-xl"
          />

          <button
            onClick={verifyExternal}
            className="mt-5 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
          >
            Verify Internship
          </button>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Top Internships
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(internships || []).map((intern) => (
            <div
              key={intern.internship_id}
              className="bg-white p-6 rounded-2xl shadow"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">
                  {intern.role}
                </h3>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${badgeColor(
                    intern.verification_status
                  )}`}
                >
                  {intern.verification_status}
                </span>
              </div>

              <p className="mt-2 text-gray-600">{intern.company_name}</p>
              <p className="text-sm text-gray-500">{intern.duration}</p>

              <p className="mt-3 text-sm">
                <b>Skills:</b> {intern.required_skills}
              </p>

              <p className="mt-3 text-sm">
                <b>Score:</b> {intern.verification_score}/100
              </p>

              <button
                disabled={intern.verification_status !== "Verified"}
                className={`mt-5 w-full py-3 rounded-xl ${
                  intern.verification_status === "Verified"
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                {intern.verification_status === "Verified"
                  ? "Apply"
                  : "Not Safe"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;