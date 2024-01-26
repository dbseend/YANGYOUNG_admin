import React, { useState } from "react";
import styled from "styled-components";
import StudentList from "./WebStudentList";
const WebStudent = () => {
  const [studentInfo, setStudentInfo] = useState([]);
  return (
    <>
      <Div>
        <div>학생검색</div>
        <div>학생목록</div>
        <StudentList />
      </Div>
    </>
  );
};
const Div = styled.div`
  margin-top: 120px;
`;
export default WebStudent;
