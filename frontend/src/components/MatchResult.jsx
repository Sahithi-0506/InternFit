import {
  Target,
  CheckCircle,
  XCircle,
  Clock3,
  BookOpen,
  ExternalLink,
} from "lucide-react";

function MatchResult({ matchResult }) {
  if (!matchResult) return null;

  const percentage = matchResult.match_percentage || 0;

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-7 mb-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-52 h-52 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 text-blue-700 p-3 rounded-2xl">
            <Target className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-slate-800">
              Skill Match Result
            </h2>
            <p className="text-sm text-slate-500">
              Based on your uploaded resume and internship requirements
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          <div className="bg-gradient-to-br from-blue-600 to-green-500 text-white rounded-3xl p-6 flex flex-col items-center justify-center shadow-lg">
            <div className="w-28 h-28 rounded-full border-8 border-white/30 flex items-center justify-center">
              <span className="text-3xl font-extrabold">
                {percentage}%
              </span>
            </div>

            <p className="mt-4 font-semibold">Match Percentage</p>
          </div>

          <ResultBox
            icon={<CheckCircle />}
            title="Matched Skills"
            value={matchResult.matched_skills?.join(", ") || "None"}
            color="green"
          />

          <ResultBox
            icon={<XCircle />}
            title="Missing Skills"
            value={matchResult.missing_skills?.join(", ") || "None"}
            color="red"
          />

          <ResultBox
            icon={<Clock3 />}
            title="Estimated Prep Time"
            value={matchResult.estimated_preparation_time || "Not required"}
            color="purple"
          />
        </div>

        <div className="mt-7 bg-slate-50 rounded-3xl p-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-yellow-100 text-yellow-700 p-3 rounded-2xl">
              <BookOpen className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-800">
                Suggested Learning Resources
              </h3>
              <p className="text-sm text-slate-500">
                Learn missing skills before applying
              </p>
            </div>
          </div>

          {matchResult.suggested_resources?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchResult.suggested_resources.map((item, index) => (
                <a
                  key={index}
                  href={item.resource}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-md transition flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold text-slate-800">
                      {item.skill}
                    </p>
                    <p className="text-sm text-slate-500">
                      Recommended resource
                    </p>
                  </div>

                  <ExternalLink className="w-5 h-5 text-blue-600" />
                </a>
              ))}
            </div>
          ) : (
            <div className="bg-green-50 text-green-700 rounded-2xl p-4 font-semibold">
              Great! No major skill gaps found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultBox({ icon, title, value, color }) {
  const styles = {
    green: "bg-green-50 text-green-700",
    red: "bg-red-50 text-red-700",
    purple: "bg-purple-50 text-purple-700",
  };

  return (
    <div className={`${styles[color]} rounded-3xl p-5 border border-white`}>
      <div className="w-12 h-12 bg-white/70 rounded-2xl flex items-center justify-center mb-4">
        {icon}
      </div>

      <p className="text-sm font-medium opacity-80">{title}</p>
      <p className="font-bold mt-2 text-slate-800 break-words">{value}</p>
    </div>
  );
}

export default MatchResult;