import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Attendance from "./pages/Attendance";
import Student from "./pages/Student";
import Lecture from "./pages/Lecture";
import AddSt from "./pages/AddSt";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path = "/student" element={<Student />} />
        <Route path = "/lecture" element={<Lecture />} />
        <Route path = "/addstudent" element={<AddSt />} />
      </Routes>
    </Router>
  );
}

export default App;
