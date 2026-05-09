import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-3xl font-bold text-green-700">INTERN FIT</h1>
        <div className="space-x-4">
          <Link to="/student-login" className="text-gray-700 hover:text-green-700">
            Student Login
          </Link>
          <Link to="/alumni-login" className="text-gray-700 hover:text-green-700">
            Alumni Login
          </Link>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h2 className="text-5xl font-bold text-gray-800 max-w-3xl">
          Find Safe, Verified & Skill-Matched Internships
        </h2>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl">
          INTERN FIT protects students from fake internships, checks skill match,
          shows missing skills, and provides trusted alumni reviews.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/student-register"
            className="bg-green-600 text-white px-8 py-4 rounded-xl shadow hover:bg-green-700"
          >
            Register as Student
          </Link>

          <Link
            to="/alumni-register"
            className="bg-blue-600 text-white px-8 py-4 rounded-xl shadow hover:bg-blue-700"
          >
            Register as Alumni
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
          <Feature title="Verified Internships" text="Green, yellow, red safety badges." />
          <Feature title="Skill Match %" text="Know if internship matches your profile." />
          <Feature title="Scam Alerts" text="Detect fee-based and fake offers." />
        </div>
      </section>
    </div>
  );
}

function Feature({ title, text }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow border">
      <h3 className="font-bold text-xl text-gray-800">{title}</h3>
      <p className="mt-2 text-gray-600">{text}</p>
    </div>
  );
}

export default Home;