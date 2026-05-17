import { useNavigate } from "react-router-dom";
import {
  MapPin,
  IndianRupee,
  Clock3,
  ShieldCheck,
  TriangleAlert,
  ShieldAlert,
  Star,
  ArrowRight,
} from "lucide-react";

function InternshipCard({ internship, onMatch, onReviews }) {
  const navigate = useNavigate();

  const statusStyles = {
    Verified: {
      bg: "bg-green-100 text-green-700",
      icon: <ShieldCheck className="w-4 h-4" />,
    },

    Caution: {
      bg: "bg-yellow-100 text-yellow-700",
      icon: <TriangleAlert className="w-4 h-4" />,
    },

    "Scam Suspected": {
      bg: "bg-red-100 text-red-700",
      icon: <ShieldAlert className="w-4 h-4" />,
    },
  };

  const handleApply = () => {
    navigate(`/apply/${internship.internship_id}`, {
      state: { internship },
    });
  };

  return (
    <div className="relative overflow-hidden bg-white rounded-3xl shadow-lg border border-slate-200 hover:shadow-2xl hover:-translate-y-1 transition duration-300">
      <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 p-6">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-800">
              {internship.role}
            </h3>

            <p className="mt-2 text-slate-500 text-lg">
              {internship.company_name}
            </p>
          </div>

          <span
            className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold ${
              statusStyles[internship.verification_status]?.bg ||
              "bg-gray-100 text-gray-700"
            }`}
          >
            {statusStyles[internship.verification_status]?.icon}
            {internship.verification_status}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <InfoCard
            icon={<Clock3 className="w-4 h-4" />}
            label="Duration"
            value={internship.duration}
          />

          <InfoCard
            icon={<MapPin className="w-4 h-4" />}
            label="Mode"
            value={internship.mode}
          />

          <InfoCard
            icon={<IndianRupee className="w-4 h-4" />}
            label="Stipend"
            value={`₹${internship.stipend}`}
          />

          <InfoCard
            icon={<Star className="w-4 h-4" />}
            label="Score"
            value={`${internship.verification_score}/100`}
          />
        </div>

        <div className="mt-5">
          <p className="text-sm font-semibold text-slate-600 mb-2">
            Required Skills
          </p>

          <div className="flex flex-wrap gap-2">
            {internship.required_skills
              ?.split(",")
              .map((skill, index) => (
                <span
                  key={index}
                  className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill.trim()}
                </span>
              ))}
          </div>
        </div>

        <div className="mt-7 space-y-3">
          <button
            onClick={() => onMatch(internship.internship_id)}
            className="w-full py-3 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Check Match %
          </button>

          <button
            onClick={() => onReviews(internship.internship_id)}
            className="w-full py-3 rounded-2xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
          >
            Check Alumni Reviews
          </button>

          <button
            onClick={handleApply}
            disabled={internship.verification_status !== "Verified"}
            className={`w-full py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transition ${
              internship.verification_status === "Verified"
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            {internship.verification_status === "Verified" ? (
              <>
                Apply Now <ArrowRight className="w-5 h-5" />
              </>
            ) : (
              "Not Safe to Apply"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
      <div className="flex items-center gap-2 text-slate-500 text-sm">
        {icon}
        {label}
      </div>

      <p className="mt-2 font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
}

export default InternshipCard;