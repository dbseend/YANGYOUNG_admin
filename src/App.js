import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Attendance from "./pages/Attendance";
import Student from "./pages/Student";
import Lecture from "./pages/Lecture";
import StudentDetail from "./pages/StudentDetail";
import Section from "./pages/Section";

function App() {
  if (process.env.NODE_ENV === "production") {
    // production에서만 사용할 수 없도록 하기
    console = window.console || {};
    console.log = function no_console() {}; // console log 막기
    console.warn = function no_console() {}; // console warning 막기
    console.error = function () {}; // console error 막기
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/student" element={<Student />} />
        <Route path="/lecture" element={<Lecture />} />
        <Route path="/student/:id" element={<StudentDetail />} />
        <Route path="/section" element={<Section />} />
      </Routes>
    </Router>
  );
}

export default App;
