import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteStudent } from "../../api/StudentAPI";
import AddStudentModal from "./AddStudentModal";

const StudentList = ({ filteredData }) => {
  const navigate = useNavigate();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const columns = [
    { key: "index", label: "순번" },
    { key: "name", label: "이름" },
    { key: "school", label: "학교" },
    { key: "grade", label: "학년" },
    { key: "studentPhoneNumber", label: "학생 연락처" },
    { key: "parentPhoneNumber", label: "부모님 연락처" },
    { key: "id", label: "학번" },
    { key: "check", label: "선택" },
  ];

  useEffect(() => {
    console.log(filteredData.length);
    console.log(filteredData);
  }, [filteredData]);


  // 체크박스 리스트 전체 선택 및 해제
  const handleAllCheckboxChange = () => {
    if (selectedStudents.length === filteredData.length) {
      setSelectedStudents([]);
    }
    if (selectedStudents.length !== filteredData.length) {
      setSelectedStudents(filteredData.map((student) => student.id));
    }
  };

  // 체크박스 선택 시 학생 목록에 추가/제거
  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prevSelected) => {
      if (prevSelected.includes(studentId)) {
        return prevSelected.filter((id) => id !== studentId);
      } else {
        return [...prevSelected, studentId];
      }
    });
  };

  // 선택한 학생 삭제`
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
              <React.Fragment key={column.key}>
                {column.key === "check" ? (
                  <StyledTh>
                    <input
                      type="checkbox"
                      checked={selectedStudents.length === filteredData.length}
                      onClick={handleAllCheckboxChange}
                    />
                  </StyledTh>
                ) : (
                  <StyledTh>{column.label}</StyledTh>
                )}
              </React.Fragment>
            ))}
          </tr>
        </thead>

        <tbody>
          {filteredData.map((student, index) => (
            <StyledTr key={index}>
              {columns.map((column) => (
                <StyledTd
                  key={column.key}
                  onClick={
                    column.key === "check"
                      ? null
                      : () => moveToStudentDetail(student.id)
                  }
                >
                  {column.key === "index" ? (
                    index + 1
                  ) : column.key === "name" ? (
                    student.name
                  ) : column.key === "school" ? (
                    student.school
                  ) : column.key === "grade" ? (
                    student.grade
                  ) : column.key === "studentPhoneNumber" ? (
                    student.studentPhoneNumber
                  ) : column.key === "parentPhoneNumber" ? (
                    student.parentPhoneNumber
                  ) : column.key === "id" ? (
                    student.id
                  ) : column.key === "check" ? (
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleCheckboxChange(student.id)}
                    />
                  ) : (
                    ""
                  )}
                </StyledTd>
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
`;

const StyledTh = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  background-color: #dfdfdf;
  @media screen and (min-width: 768px) {
    width: 90vw;
  }
`;

const StyledTd = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  align-items: center;

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
export { Button, StyledButtonContainer };
export default StudentList;
