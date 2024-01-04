import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Attendance from "./pages/Attendance";
import Student from "./pages/Student";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path = "/student" element={<Student />} />
      </Routes>
    </Router>
  );
}

export default App;
