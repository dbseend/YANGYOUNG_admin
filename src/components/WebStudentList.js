import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const StudentList = ({ filteredData }) => {
  const navigate = useNavigate();
  const moveToStudentDetail = (studentId) => {
    navigate(`/student/${studentId}`);
  };
  useEffect(() => {
    console.log(filteredData.length);
  }, [filteredData]);

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
          {filteredData.map((student, index) => (
            <StyledTr key={index} onClick={() => moveToStudentDetail(student.id)}>
              {columns.map((column) => (
                <StyledTd key={column.key}>{student[column.key]}</StyledTd>
              ))}
            </StyledTr>
          ))}
        </tbody>
      </StyledTable>
    </>
  );
};

const StyledTable = styled.table`
  border-collapse: collapse;
  margin-top: 20px;

  @media screen and (min-width: 768px) {
    width: 80vw;
  }
`;

const StyledTh = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  background-color: #dfdfdf;
  @media screen and (min-width: 768px) {
    width: 80vw;
  }
`;

const StyledTd = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;

  @media screen and (min-width: 768px) {
    width: 90vw;
  }
`;

const StyledTr = styled.tr`
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
export default StudentList;
