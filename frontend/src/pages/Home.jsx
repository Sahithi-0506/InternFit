import { Link } from "react-router-dom";
import {
  ShieldCheck,
  GraduationCap,
  Users,
  SearchCheck,
  FileText,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-slate-950 to-blue-900/40"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <nav className="flex justify-between items-center px-8 md:px-14 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 p-2 rounded-2xl">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">INTERN FIT</h1>
              <p className="text-xs text-slate-300">
                Verified Internship Matching Platform
              </p>
            </div>
          </div>

          <div className="hidden md:flex gap-4">
            <Link to="/student-login" className="text-slate-300 hover:text-white">
              Student Login
            </Link>
            <Link to="/alumni-login" className="text-slate-300 hover:text-white">
              Alumni Login
            </Link>
          </div>
        </nav>

        <section className="px-8 md:px-14 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm text-green-300 mb-6">
              <Sparkles className="w-4 h-4" />
              Built for students, verified by alumni
            </div>

            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Find safe, verified & skill-matched internships.
            </h2>

            <p className="mt-6 text-lg text-slate-300 max-w-xl">
              INTERN FIT helps students avoid fake internships, check skill match,
              upload resumes, view alumni reviews, and apply only to trusted
              opportunities.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Link
                to="/student-register"
                className="bg-green-500 text-white px-7 py-4 rounded-2xl font-semibold shadow-lg hover:bg-green-600 flex items-center justify-center gap-2"
              >
                Register as Student <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/alumni-register"
                className="bg-white text-slate-900 px-7 py-4 rounded-2xl font-semibold shadow-lg hover:bg-slate-100 flex items-center justify-center gap-2"
              >
                Join as Alumni <Users className="w-5 h-5" />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <MiniStat value="80%+" label="Verified badge logic" />
              <MiniStat value="Resume" label="Skill extraction" />
              <MiniStat value="Alumni" label="Real reviews" />
            </div>
          </div>

          <div className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl">
            <div className="bg-slate-900 rounded-3xl p-6 border border-white/10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-slate-400 text-sm">Recommended Internship</p>
                  <h3 className="text-2xl font-bold mt-2">Frontend Intern</h3>
                  <p className="text-slate-300 mt-1">TechNova Solutions</p>
                </div>
                <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                  Verified
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <Progress title="Skill Match" value="87%" width="w-[87%]" />
                <Progress title="Verification Score" value="92/100" width="w-[92%]" />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Info label="Skills" value="React, JS, CSS" />
                <Info label="Mode" value="Remote" />
                <Info label="Duration" value="8 Weeks" />
                <Info label="Stipend" value="₹8,000" />
              </div>

              <div className="mt-6 bg-slate-800 rounded-2xl p-4">
                <p className="text-sm text-slate-400">Alumni Review</p>
                <p className="mt-2 text-slate-200">
                  “Genuine internship. Good React tasks and project exposure.”
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-8 md:px-14 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Feature
              icon={<ShieldCheck />}
              title="Verified Internships"
              text="Green, caution, and scam-suspected badges help students apply safely."
            />
            <Feature
              icon={<FileText />}
              title="Resume Skill Match"
              text="Students upload resumes and get internship match percentage based on extracted skills."
            />
            <Feature
              icon={<AlertTriangle />}
              title="Scam Detection"
              text="External internship links can be checked for suspicious keywords and unsafe patterns."
            />
            <Feature
              icon={<Users />}
              title="Alumni Reviews"
              text="Alumni share company reality, interview questions, and preparation tips."
            />
            <Feature
              icon={<SearchCheck />}
              title="Skill Gap Analysis"
              text="Students understand what skills are missing before applying."
            />
            <Feature
              icon={<GraduationCap />}
              title="College Focused"
              text="Designed for students, alumni, and college internship support workflows."
            />
          </div>
        </section>

        <section className="px-8 md:px-14 pb-16">
          <div className="bg-white text-slate-900 rounded-3xl p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold">
                Why students need INTERN FIT?
              </h3>
              <p className="mt-4 text-slate-600">
                Many students apply through random links without knowing whether
                the internship is real, useful, or safe. INTERN FIT brings
                verification, matching, and alumni guidance into one platform.
              </p>
            </div>

            <div className="space-y-3">
              <Point text="Avoid fee-based and fake internships" />
              <Point text="Apply only to verified opportunities" />
              <Point text="Know skill match before applying" />
              <Point text="Read alumni experience before trusting a role" />
            </div>
          </div>
        </section>

        <footer className="px-8 md:px-14 py-8 border-t border-white/10 text-center text-slate-400">
          © 2026 INTERN FIT. Built for safer internship discovery.
        </footer>
      </div>
    </div>
  );
}

function MiniStat({ value, label }) {
  return (
    <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
      <p className="font-bold text-green-300">{value}</p>
      <p className="text-slate-400 mt-1">{label}</p>
    </div>
  );
}

function Progress({ title, value, width }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-slate-300">{title}</span>
        <span className="text-green-300 font-semibold">{value}</span>
      </div>
      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
        <div className={`h-full bg-green-500 rounded-full ${width}`}></div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="bg-slate-800 rounded-2xl p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="font-semibold mt-1">{value}</p>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="bg-white/10 border border-white/10 rounded-3xl p-6 hover:bg-white/15 transition">
      <div className="w-12 h-12 bg-green-500/20 text-green-300 rounded-2xl flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 text-slate-300">{text}</p>
    </div>
  );
}

function Point({ text }) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle className="w-5 h-5 text-green-600" />
      <p className="text-slate-700">{text}</p>
    </div>
  );
}

export default Home;