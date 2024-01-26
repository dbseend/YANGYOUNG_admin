import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { viewStudent } from "../api/StudentApi";

const columns = [
  { key: "index", label: "#" },
  { key: "name", label: "이름" },
  { key: "school", label: "학교" },
  { key: "grade", label: "학년" },
  { key: "sectionName", label: "반" },
  { key: "phoneNumber", label: "연락처" },
  { key: "id", label: "아이디" },
];

const StudentList = () => {
  const [studentInfo, setStudentInfo] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    viewAllStudent();
  }, []);

  const viewAllStudent = async () => {
    try {
      const response = await viewStudent();
      const studentsWithIndex = response.studentResponseList.map(
        (student, index) => ({
          ...student,
          index: index + 1,
        })
      );
      setStudentInfo(studentsWithIndex);
      setFilteredStudents(studentsWithIndex);
    } catch (error) {
      console.log("학생 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = studentInfo.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((column) => (
              <StyledTh key={column.key}>{column.label}</StyledTh>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <StyledTd key={column.key}>{student[column.key]}</StyledTd>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </>
  );
};

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTh = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
`;

const StyledTd = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
`;

export default StudentList;
