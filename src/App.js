import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../src/styles/App.css";
import Main from "./pages/Main";
import Attendance from "./pages/Attendance";
import Student from "./pages/Student";
import Lecture from "./pages/Lecture";
import LectureDetail from "./pages/LectureDetail";
import StudentDetail from "./pages/StudentDetail";
import Section from "./pages/Section";
import SectionDetail from "./pages/SectionDetail";
import NotFound from "./pages/NotFound";
import NewWindowContent from "./components/Section/NewWindowContent";
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
        <Route path="/lecture" element={<Lecture />} />
        <Route path="/lecture/:id" element={<LectureDetail />} />
        <Route path="/student" element={<Student />} />
        <Route path="/student/:id" element={<StudentDetail />} />
        <Route path="/section" element={<Section />} />
        <Route path="/section/:id" element={<SectionDetail />} />
        <Route path="/section/:id/newWindow" element={<NewWindowContent />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
