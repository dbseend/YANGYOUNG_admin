import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getOneSection } from "../../api/SectionAPI";
import {
  Button,
  ListTable,
  ListTd,
  ListTh,
  ListTr,
  RowDiv,
  SubTitle,
  UpdateAndDeleteButton,
} from "../../styles/CommonStyles";
// import AddPersonalTaskModal from "./AddPersonalTaskModal";

const WebSectionStudent = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const { id } = useParams();
  const [sectionInfo, setSectionInfo] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [studentCount, setStudentCount] = useState(0);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const students = [
    { key: "name", label: "이름" },
    { key: "school", label: "학교" },
    { key: "grade", label: "학년" },
    { key: "check", label: "선택" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOneSection(id);
        console.log(response);
        setStudentList(response.studentAllResponse.studentResponseList); // 학생 목록
        setStudentCount(response.studentAllResponse.size); // 학생 수
        setSectionInfo(response.sectionResponse); // 반 목록
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, [id]);

  // 체크박스 리스트 전체 선택 및 해제
  const handleAllCheckboxChange = () => {
    if (selectedStudents.length === studentList.length) {
      setSelectedStudents([]);
    }
    if (selectedStudents.length !== studentList.length) {
      setSelectedStudents(studentList.map((student) => student.id));
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

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  return (
    <div>
      <SubTitle>학생</SubTitle>
      <p>
        {sectionInfo.name} 분반에는 총 {studentCount}명의 학생이 배정되어
        있습니다.
      </p>
      <RowDiv style={{ marginBottom: 10 }}>
        <Button style={{ marginRight: 10 }} onClick={openAddModal}>
          등록
        </Button>
        {/* <Button onClick={updateTask} style={{ marginRight: 10 }}>
            저장
          </Button> */}
        <UpdateAndDeleteButton>
          {/* <Button onClick={deleteTask}>삭제</Button> */}
        </UpdateAndDeleteButton>
      </RowDiv>

      <ListTable>
        <thead>
          <ListTr>
            {students &&
              students.map((student) => (
                <ListTh key={student.key}>
                  {student.key === "check" ? (
                    <input
                      type="checkbox"
                      checked={selectedStudents.length === studentList.length}
                      onClick={handleAllCheckboxChange}
                    />
                  ) : (
                    student.label
                  )}
                </ListTh>
              ))}
          </ListTr>
        </thead>
        <tbody>
          {studentList &&
            studentList.map((student, index) => (
              <ListTr key={index}>
                {students.map((col) => (
                  <ListTd key={col.key}>
                    {col.key === "check" ? (
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleCheckboxChange(student.id)}
                      />
                    ) : (
                      <div>{student[col.key]}</div>
                    )}
                  </ListTd>
                ))}
              </ListTr>
            ))}
        </tbody>
      </ListTable>
    </div>
  );
};

export default WebSectionStudent;
