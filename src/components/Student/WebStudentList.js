import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteStudent } from "../../api/StudentApi";
import AddStudentModal from "./AddStudentModal";

const columns = [
  { key: "index", label: "순번" },
  { key: "name", label: "이름" },
  { key: "school", label: "학교" },
  { key: "grade", label: "학년" },
  { key: "sectionName", label: "반" },
  { key: "phoneNumber", label: "연락처" },
  { key: "id", label: "학번" },
];

const StudentList = ({ filteredData }) => {
  const navigate = useNavigate();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const moveToStudentDetail = (studentId) => {
    navigate(`/student/${studentId}`);
  };
  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };
  const handleAddStudent = (response) => {
    console.log("새 학생 정보: ", response);
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
      window.location.reload(true); // Reload the page
    } catch (error) {
      console.error("학생 삭제 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    console.log(filteredData.length);
  }, [filteredData]);

  return (
    <>
      <StyledButtonContainer>
        <Button onClick={openAddModal}>등록</Button>
        <Button onClick={handleDelete}>삭제</Button>

        {isAddModalOpen && (
          <AddStudentModal onClose={closeAddModal} onAdd={handleAddStudent} />
        )}
      </StyledButtonContainer>
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
            <StyledTr key={index}>
              {columns.map((column) => (
                <StyledTd
                  onClick={() => moveToStudentDetail(student.id)}
                  key={column.key}
                >
                  {column.key === "index" ? index + 1 : student[column.key]}
                </StyledTd>
              ))}
              <StyledTd>
                <input
                  type="checkbox"
                  checked={selectedStudents.includes(student.id)}
                  onChange={() => handleCheckboxChange(student.id)}
                />
              </StyledTd>
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
`;

const StyledTh = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  background-color: #dfdfdf;
  @media screen and (min-width: 768px) {
    width: 75vw;
  }
`;

const StyledTd = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    width: 75vw;
  }
`;

const StyledTr = styled.tr`
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 23px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 80px;
  height: 30px;
  border-radius: 6px;
  background: #000;
  color: #fff;
  font-family: Poppins;
  font-size: 15px;
  font-style: normal;
  line-height: normal;
  cursor: pointer;
  border: none;
`;
export {Button, StyledButtonContainer};
export default StudentList;
