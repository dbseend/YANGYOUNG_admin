import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { viewStudent, deleteStudent } from "../api/StudentApi";

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
  const [selectedStudents, setSelectedStudents] = useState([]);

  const moveToStudentDetail = (studentId) => {
    navigate(`/student/${studentId}`);
  };

  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prevSelected) => {
      if (prevSelected.includes(studentId)) {
        return prevSelected.filter((id) => id !== studentId);
      } else {
        return [...prevSelected, studentId];
      }
    });
  };

  const handleDelete = async () => {
    try {
      for (const studentId of selectedStudents) {
        await deleteStudent(studentId);
      }
      // 성공적으로 삭제되면 선택된 학생들 초기화
      setSelectedStudents([]);
      alert("선택한 학생이 삭제되었습니다.");
      // 삭제 후 학생 목록 갱신
      // await viewAllStudent();
    } catch (error) {
      console.error("학생 삭제 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    console.log(filteredData.length);
  }, [filteredData]);

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <th></th>
            {columns.map((column) => (
              <StyledTh key={column.key}>{column.label}</StyledTh>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((student, index) => (
            <StyledTr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student.id)}
                  onChange={() => handleCheckboxChange(student.id)}
                />
              </td>
              {columns.map((column) => (
                <StyledTd
                  onClick={() => moveToStudentDetail(student.id)}
                  key={column.key}
                >
                  {student[column.key]}
                </StyledTd>
              ))}
            </StyledTr>
          ))}
        </tbody>
      </StyledTable>
      <DeleteButtonContainer>
        <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
      </DeleteButtonContainer>
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

const DeleteButtonContainer = styled.div`
  margin-top: 20px;
  text-align: right;
`;

const DeleteButton = styled.button`
  cursor: pointer;
`;

export default StudentList;
