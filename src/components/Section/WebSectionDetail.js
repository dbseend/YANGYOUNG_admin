import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  ListTable,
  ListTd,
  ListTh,
  ListTr,
  SubTitle,
} from "../../styles/CommonStyles";
import { getOneSection } from "../../api/SectionAPI";
import { deleteTaskAPI } from "../../api/TaskApi";
import WebSectionTask from "./WebSectionTask";

const lectures = [
  { key: "name", label: "강의명" },
  { key: "dayList", label: "요일" },
  { key: "time", label: "시간" },
  { key: "teacher", label: "선생님" },
  { key: "room", label: "강의실" },
];

const students = [
  { key: "name", label: "이름" },
  { key: "school", label: "학교" },
  { key: "grade", label: "학년" },
];

const WebSectionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString("en-CA");
  const [date, setDate] = useState(today);

  const [studentList, setStudentList] = useState([]);
  const [studentCount, setStudentCount] = useState(0);
  const [lectureCount, setLectureCount] = useState(0);
  const [lectureList, setLectureList] = useState([]);
  const [sectionInfo, setSectionInfo] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  const [taskList, setTaskList] = useState([]);
  const [selectedTaskList, setSelectedTaskList] = useState([]);
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

  // 할 일 삭제
  const deleteTask = async () => {
    const taskIdList = selectedTaskList.map((taskId) => taskId);
    await deleteTaskAPI(taskIdList);
    window.location.reload();
  };

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

  const handleAllCheckboxChange = () => {
    console.log(selectedTaskList.length);
    if (selectedTaskList.length === taskList.length) {
      setSelectedTaskList([]);
    }
    if (selectedTaskList.length !== taskList.length) {
      setSelectedTaskList(taskList.map((task) => task.id));
    }
  };

  const handleCheckboxChange = (taskId) => {
    setSelectedTaskList((prevSelected) => {
      if (prevSelected.includes(taskId)) {
        return prevSelected.filter((id) => id !== taskId);
      } else {
        return [...prevSelected, taskId];
      }
    });
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <Div>
      <Title>상세 정보</Title>

      {/* 분반 정보 */}
      <SubTitle>분반 정보</SubTitle>
      <ListTable>
        <tbody>
          <ListTr>
            <ListTh>분반명</ListTh>
            <ListTd>{sectionInfo.name}</ListTd>
            <ListTh>담임</ListTh>
            <ListTd>{sectionInfo.teacher}</ListTd>
            {/* <ListTh>id</ListTh>
            <ListTd>{sectionInfo.id}</ListTd> */}
          </ListTr>
        </tbody>
      </ListTable>

      {/* 수강 정보 */}
      <SubTitle>수강 정보</SubTitle>
      <p>
        {sectionInfo.name} 분반에는 총 {lectureCount}개의 수업이 배정되어
        있습니다.
      </p>
      <ListTable>
        <thead>
          <ListTr>
            {lectures &&
              lectures.map((lecture) => (
                <ListTh key={lecture.key}>{lecture.label}</ListTh>
              ))}
          </ListTr>
        </thead>
        <tbody>
          {lectureList &&
            lectureList.map((lecture, index) => (
              <ListTr key={index}>
                {lectures.map((col) => (
                  <ListTd key={col.key}>
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
                  </ListTd>
                ))}
              </ListTr>
            ))}
        </tbody>
      </ListTable>

      <WebSectionTask />

      {/*학생 정보 */}
      <SubTitle>학생</SubTitle>
      <p>
        {sectionInfo.name} 분반에는 총 {studentCount}명의 학생이 배정되어
        있습니다.
      </p>
      <ListTable>
        <thead>
          <ListTr>
            {students &&
              students.map((student) => (
                <ListTh key={student.key}>{student.label}</ListTh>
              ))}
          </ListTr>
        </thead>
        <tbody>
          {studentList &&
            studentList.map((student, index) => (
              <ListTr key={index}>
                {students.map((col) => (
                  <ListTd key={col.key}>
                    <Pointer onClick={() => moveToStudentDetail(student.id)}>
                      {student[col.key]}
                    </Pointer>
                  </ListTd>
                ))}
              </ListTr>
            ))}
        </tbody>
      </ListTable>
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
