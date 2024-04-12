import { Routes, Route } from "react-router-dom";
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
import Navbar from "./components/Navbar";

function MyRoute() {
  return(
  <Routes>
    <Route path="/" element={<Main />} />
    <Route element={<Navbar />}>
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/lecture" element={<Lecture />} />
      <Route path="/lecture/:id" element={<LectureDetail />} />
      <Route path="/student" element={<Student />} />
      <Route path="/student/:id" element={<StudentDetail />} />
      <Route path="/section" element={<Section />} />
      <Route path="/section/:id" element={<SectionDetail />} />
    </Route>
    <Route path="/section/:id/newWindow" element={<NewWindowContent />} />
    <Route path="/*" element={<NotFound />} />
  </Routes>
  );
};

export default MyRoute;
