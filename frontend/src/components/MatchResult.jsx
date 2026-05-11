function MatchResult({ matchResult }) {
  if (!matchResult) return null;

  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-8 border-l-4 border-blue-600">
      <h2 className="text-2xl font-bold text-gray-800">
        Skill Match Result
      </h2>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Box title="Match Percentage" value={`${matchResult.match_percentage}%`} color="blue" />
        <Box title="Matched Skills" value={matchResult.matched_skills?.join(", ") || "None"} color="green" />
        <Box title="Missing Skills" value={matchResult.missing_skills?.join(", ") || "None"} color="red" />
        <Box title="Estimated Time" value={matchResult.estimated_preparation_time} color="purple" />
      </div>

      <div className="mt-5">
        <h3 className="font-bold text-gray-800 mb-2">
          Suggested Resources
        </h3>

        {matchResult.suggested_resources?.length > 0 ? (
          matchResult.suggested_resources.map((item, index) => (
            <p key={index} className="text-sm mt-1">
              <b>{item.skill}</b>:{" "}
              <a
                href={item.resource}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                Learn here
              </a>
            </p>
          ))
        ) : (
          <p className="text-green-700">
            Great! No major skill gaps found.
          </p>
        )}
      </div>
    </div>
  );
}

function Box({ title, value, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    red: "bg-red-50 text-red-700",
    purple: "bg-purple-50 text-purple-700",
  };

  return (
    <div className={`${colors[color]} rounded-xl p-4`}>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="font-semibold mt-1">{value}</p>
    </div>
  );
}

export default MatchResult;