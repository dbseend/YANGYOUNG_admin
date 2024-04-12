import React from "react";
import MyRoute from "./MyRoute";

function App() {
  if (process.env.NODE_ENV === "production") {
    // production에서만 사용할 수 없도록 하기
    console = window.console || {};
    console.log = function no_console() {}; // console log 막기
    console.warn = function no_console() {}; // console warning 막기
    console.error = function () {}; // console error 막기
  }

  return (
    <MyRoute />
  );
}

export default App;
