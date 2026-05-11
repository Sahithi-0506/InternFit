import { useNavigate } from "react-router-dom";

function InternshipCard({ internship, onMatch }) {
  const navigate = useNavigate();

  const statusColor = {
    Verified: "bg-green-100 text-green-700",
    Caution: "bg-yellow-100 text-yellow-700",
    "Scam Suspected": "bg-red-100 text-red-700",
  };

  const handleApply = () => {
    navigate(`/apply/${internship.internship_id}`, {
      state: { internship },
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
      <div className="flex justify-between items-start gap-3">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            {internship.role}
          </h3>
          <p className="mt-1 text-gray-600">{internship.company_name}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
            statusColor[internship.verification_status] ||
            "bg-gray-100 text-gray-700"
          }`}
        >
          {internship.verification_status}
        </span>
      </div>

      <div className="mt-4 text-sm text-gray-600 space-y-2">
        <p><b>Duration:</b> {internship.duration}</p>
        <p><b>Mode:</b> {internship.mode}</p>
        <p><b>Stipend:</b> ₹{internship.stipend}</p>
        <p><b>Skills:</b> {internship.required_skills}</p>
        <p><b>Verification Score:</b> {internship.verification_score}/100</p>
      </div>

      <button
        onClick={() => onMatch(internship.internship_id)}
        className="mt-5 w-full py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
      >
        Check Match
      </button>

      <button
        onClick={handleApply}
        disabled={internship.verification_status !== "Verified"}
        className={`mt-3 w-full py-3 rounded-xl ${
          internship.verification_status === "Verified"
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        {internship.verification_status === "Verified"
          ? "Apply Now"
          : "Not Safe to Apply"}
      </button>
    </div>
  );
}

export default InternshipCard;