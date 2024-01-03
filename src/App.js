import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Attendence from "./pages/Attendence";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/attendence" element={<Attendence />} />
      </Routes>
    </Router>
  );
}

export default App;
