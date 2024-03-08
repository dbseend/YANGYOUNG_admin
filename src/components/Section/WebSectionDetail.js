import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { getOneSection } from "../../api/SectionAPI";
import { Button } from "../Student/WebStudentList";
import AddSectionTaskModal from "./AddSectionTaskModal";

const lectures = [
  { key: "name", label: "강의명" },
  { key: "dayList", label: "요일" },
  { key: "time", label: "시간" },
  { key: "teacher", label: "선생님" },
  { key: "room", label: "강의실" },
];

const taskColumns = [{ key: "assignment", label: "과제명" }];

const students = [
  { key: "name", label: "이름" },
  { key: "school", label: "학교" },
  { key: "grade", label: "학년" },
];

const WebSectionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [studentList, setStudentList] = useState([]);
  const [studentCount, setStudentCount] = useState(0);
  const [lectureCount, setLectureCount] = useState(0);
  const [lectureList, setLectureList] = useState([]);
  const [sectionInfo, setSectionInfo] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  const [taskList, setTaskList] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  // 분반 정보 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOneSection(id);
        console.log(response);
        setStudentList(response.studentAllResponse.studentResponseList); // 학생 목록
        setStudentCount(response.studentAllResponse.size); // 학생 수
        setLectureCount(response.lectureAllResponse.count); // 수업 개수
        setLectureList(response.lectureAllResponse.lectureResponseList); // 수업 목록
        setSectionInfo(response.sectionResponse); // 반 목록
        setTaskCount(response.sectionTaskAllResponse.sectionTaskSize); //과제 개수
        setTaskList(response.sectionTaskAllResponse.sectionTaskResponseList); // 과제 목록
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, [id]);
  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const handleAddSection = (response) => {
    console.log("새 분반 정보: ", response);
  };

  const moveToStudentDetail = (studentId) => {
    navigate(`/student/${studentId}`);
  };

  return (
    <Div>
      <Title>상세 정보</Title>

      {/* 분반 정보 */}
      <Guide1>분반 정보</Guide1>
      <Table>
        <tbody>
          <tr>
            <th>분반명</th>
            <td>{sectionInfo.name}</td>
            <th>담임</th>
            <td>{sectionInfo.teacher}</td>
            <th>id</th>
            <td>{sectionInfo.id}</td>
          </tr>
        </tbody>
      </Table>

      {/* 수강 정보 */}
      <Guide2>수강 정보</Guide2>
      <p>
        {sectionInfo.name} 분반에는 총 {lectureCount}개의 수업이 배정되어
        있습니다.
      </p>
      <Table>
        <thead>
          <tr>
            {lectures &&
              lectures.map((lecture) => (
                <th key={lecture.key}>{lecture.label}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {lectureList &&
            lectureList.map((lecture, index) => (
              <tr key={index}>
                {lectures.map((col) => (
                  <td key={col.key}>
                    {col.key === "index"
                      ? index + 1
                      : col.key === "dayList"
                      ? lecture.dayList.join(", ")
                      : col.key === "time"
                      ? `${lecture.startTime.slice(
                          0,
                          5
                        )}-${lecture.endTime.slice(0, 5)}`
                      : lecture[col.key]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </Table>

      {/* 할일 정보 */}
      <Guide2>할일</Guide2>
      <Button onClick={openAddModal}>등록</Button>
      {isAddModalOpen && (
        <AddSectionTaskModal onClose={closeAddModal} onAdd={handleAddSection} />
      )}
      <p>
        {sectionInfo.name} 분반에는 총 {taskCount}개의 할일이 배정되어 있습니다.
      </p>
      <Table>
        <thead>
          <tr>
            {taskColumns &&
              taskColumns.map((task) => <th key={task.key}>{task.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {taskList &&
            taskList.map((task, index) => (
              <tr key={index}>
                {taskColumns.map((col) => (
                  // 학생 아이디로 이동
                  <td key={col.key}>{task[col.key]}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </Table>

      {/*학생 정보 */}
      <Guide2>학생</Guide2>
      <p>
        {sectionInfo.name} 분반에는 총 {studentCount}명의 학생이 배정되어
        있습니다.
      </p>
      <Table>
        <thead>
          <tr>
            {students &&
              students.map((student) => (
                <th key={student.key}>{student.label}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {studentList &&
            studentList.map((student, index) => (
              <tr key={index}>
                {students.map((col) => (
                  <Pointer
                    onClick={() => moveToStudentDetail(student.id)}
                    key={col.key}
                  >
                    {student[col.key]}
                  </Pointer>
                ))}
              </tr>
            ))}
        </tbody>
      </Table>
    </Div>
  );
};

const Div = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  overflow: auto;
  margin-top: 100px;
  margin-left: 12.5%;
  margin-right: 12.5%;
  margin-bottom: 200px;
`;

const Title = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Guide1 = styled.h3`
  margin-top: 20px;
`;

const Guide2 = styled.h3`
  margin-top: 40px;
`;

const Table = styled.table`
  width: 80%;
  border-collapse: collapse;

  th {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: center;
    background-color: #f2f2f2;
    width: 15%;
  }

  td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: center;
  }
`;

const Pointer = styled.td`
  cursor: pointer;
`;

export default WebSectionDetail;
