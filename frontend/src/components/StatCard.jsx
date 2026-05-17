import {
  Briefcase,
  ShieldCheck,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

function StatCard({ title, value, color = "blue" }) {
  const styles = {
    blue: {
      bg: "from-blue-500 to-cyan-500",
      icon: <Briefcase className="w-7 h-7 text-white" />,
    },

    green: {
      bg: "from-green-500 to-emerald-500",
      icon: <ShieldCheck className="w-7 h-7 text-white" />,
    },

    yellow: {
      bg: "from-yellow-400 to-orange-400",
      icon: <AlertTriangle className="w-7 h-7 text-white" />,
    },

    red: {
      bg: "from-red-500 to-rose-500",
      icon: <ShieldAlert className="w-7 h-7 text-white" />,
    },
  };

  return (
    <div className="relative overflow-hidden bg-white rounded-3xl shadow-lg border border-slate-200 p-6 hover:scale-[1.02] transition duration-300">
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${styles[color].bg} opacity-10 rounded-full blur-2xl`}
      ></div>

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 font-medium">{title}</p>

          <h2 className="text-4xl font-extrabold mt-3 text-slate-800">
            {value}
          </h2>
        </div>

        <div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${styles[color].bg} flex items-center justify-center shadow-lg`}
        >
          {styles[color].icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;