import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import StudentRegister from "./pages/StudentRegister";
import StudentLogin from "./pages/StudentLogin";
import AlumniRegister from "./pages/AlumniRegister";
import AlumniLogin from "./pages/AlumniLogin";
import Dashboard from "./pages/Dashboard";
import ApplyInternship from "./pages/ApplyInternship";
import AlumniDashboard from "./pages/AlumniDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/student-register"
          element={<StudentRegister />}
        />

        <Route
          path="/student-login"
          element={<StudentLogin />}
        />

        <Route
          path="/alumni-register"
          element={<AlumniRegister />}
        />

        <Route
          path="/alumni-login"
          element={<AlumniLogin />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      <Route path="/apply/:internshipId" 
      element={<ApplyInternship />}
       />
      <Route path="/alumni-dashboard" 
      element={<AlumniDashboard />} 
      />
      </Routes>
       
    </BrowserRouter>
  );
}

export default App;