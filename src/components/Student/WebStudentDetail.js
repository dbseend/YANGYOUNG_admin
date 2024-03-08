import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {
  getStudentInfo,
  editStudentInfo,
  viewStudent,
} from "../../api/StudentApi";
import { gradeTypeConvert } from "../../util/Util";
import AddPersonalTaskModal from "./AddPersonalTaskModal";

const WebStudentDetail = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const columns = [
    { key: "name", label: "수업명" },
    { key: "dayList", label: "요일" },
    { key: "time", label: "시간" },
    { key: "room", label: "강의실" },
    { key: "teacher", label: "선생님" },
  ];

  // 학생 인적사항
  const { id } = useParams();
  const [studentInfo, setstudentInfo] = useState({});

  // 수업 정보
  const [lectureList, setLectureList] = useState([]);
  const [lectureCount, setLectureCount] = useState(0);

  // 과제 정보
  const [taskInfo, setTaskInfo] = useState([]);
  const [taskCount, setTaskCount] = useState(0);

  // 검색 옵션(학년, 반) 리스트
  const [gradeList, setGradeList] = useState(["중3", "고1", "고2", "고3"]);
  const [sectionList, setSectionList] = useState([]);

  // 수정된 학생 정보
  const [selectedId, setSelectedId] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedStudentPhoneNumber, setSelectedStudentPhoneNumber] =
    useState("");
  const [selectedParentPhoneNumber, setSelectedParentPhoneNumber] =
    useState("");
  const [selectedGrade, setSelectedGrade] = useState("");

  // 수정 모드 상태
  const [isEditMode, setIsEditMode] = useState(false);

  // 화면 렌더링 시 학생 정보를 가져오는 함수
  useEffect(() => {
    fetchStudentDetail();
    viewAllStudent();
  }, []);

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  // 학생 정보를 가져오는 함수
  const fetchStudentDetail = async () => {
    getStudentInfo(id).then((data) => {
      console.log("학생 상세 정보: ", data);

      // 학생 정보 저장
      setstudentInfo(data.studentResponse);
      setSelectedId(data.studentResponse.id);
      setSelectedSchool(data.studentResponse.school);
      setSelectedSection(data.studentResponse.sectionId);
      setSelectedStudentPhoneNumber(data.studentResponse.studentPhoneNumber);
      setSelectedParentPhoneNumber(data.studentResponse.parentPhoneNumber);
      setSelectedGrade(data.studentResponse.grade);

      // 수업 정보 저장
      setLectureList(data.lectureAllResponse.lectureResponseList);
      setLectureCount(data.lectureAllResponse.count);

      // 과제 정보 저장
      setTaskInfo(data.studentTaskAllResponse.studentTaskResponseList);
      setTaskCount(data.studentTaskAllResponse.studentTaskSize);
    });
  };

  // 검색 옵션을 가져오는 함수(반, 학년)
  const viewAllStudent = async () => {
    viewStudent().then((data) => {
      // console.log("학생 정보: ", data);
      // setGradeList(data.gradeList);
      setSectionList(data.sectionList);
    });
  };

  // 수정 모드를 토글하는 함수
  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);

    if (isEditMode === false) {
      setSelectedId(studentInfo.id);
      setSelectedSchool(studentInfo.school);
      setSelectedSection(studentInfo.sectionId);
      setSelectedStudentPhoneNumber(studentInfo.studentPhoneNumber);
      setSelectedParentPhoneNumber(studentInfo.parentPhoneNumber);
      setSelectedGrade(studentInfo.grade);
    }
  };

  // 수정된 학생 정보를 저장하는 함수
  const handleSaveChanges = async () => {
    const data = {
      studentId: studentInfo.id,
      school: selectedSchool,
      grade: gradeTypeConvert(selectedGrade),
      studentPhoneNumber: selectedStudentPhoneNumber,
      parentPhoneNumber: selectedParentPhoneNumber,
      sectionId: selectedSection,
    };

    try {
      console.log("수정된 학생 정보: ", data);
      await editStudentInfo(data);
      setIsEditMode(false);
      window.location.reload();
    } catch (error) {
      console.error("학생 정보 수정 중 오류 발생: ", error);
    }
  };

  // 학년, 분반 정보 수정 - dropdown
  const handleDropdownChange = (e, type) => {
    if (type === "section") {
      setSelectedSection(e.target.value);
    }
    if (type === "grade") {
      setSelectedGrade(e.target.value);
    }
  };

  // 학생 정보 수정 - input
  const handleInputChange = (e, type) => {
    if (type === "id") {
      setSelectedId(e.target.value);
    }
    if (type === "school") {
      setSelectedSchool(e.target.value);
    }
    if (type === "studentPhoneNumber") {
      setSelectedStudentPhoneNumber(e.target.value);
    }
    if (type === "parentPhoneNumber") {
      setSelectedParentPhoneNumber(e.target.value);
    }
  };

  return (
    <Div>
      <Title>상세 정보</Title>
      <Container>
        <Button onClick={handleToggleEditMode}>
          {isEditMode ? "취소" : "수정"}
        </Button>
        {isEditMode && <Button onClick={handleSaveChanges}>저장</Button>}
      </Container>
      <Guide1>학생 인적 사항</Guide1>
      <Table>
        <tbody>
          <tr>
            <Th>이름</Th>
            <Td>{studentInfo.name}</Td>
            <Th>학번</Th>
            <Td>
              {isEditMode ? (
                <input
                  type="text"
                  name="id"
                  value={selectedId}
                  onChange={(e) => handleInputChange(e, "id")}
                />
              ) : (
                studentInfo.id
              )}
            </Td>
          </tr>
          <tr>
            <th>학교</th>
            <td>
              {isEditMode ? (
                <input
                  type="text"
                  name="school"
                  value={selectedSchool}
                  onChange={(e) => handleInputChange(e, "school")}
                />
              ) : (
                studentInfo.school
              )}
            </td>
            <th>학년</th>
            <td>
              {isEditMode ? (
                <select
                  value={selectedGrade}
                  onChange={(e) => handleDropdownChange(e, "grade")}
                >
                  {gradeList.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              ) : (
                studentInfo.grade
              )}
            </td>
          </tr>
          <tr>
            <th>
              학생<br></br>연락처
            </th>
            <td>
              {isEditMode ? (
                <input
                  type="text"
                  name="studentPhoneNumber"
                  value={selectedStudentPhoneNumber}
                  onChange={(e) => handleInputChange(e, "studentPhoneNumber")}
                />
              ) : (
                studentInfo.studentPhoneNumber
              )}
            </td>
            <th>
              부모<br></br>연락처
            </th>
            <td>
              {isEditMode ? (
                <input
                  type="text"
                  name="parentPhoneNumber"
                  value={selectedParentPhoneNumber}
                  onChange={(e) => handleInputChange(e, "parentPhoneNumber")}
                />
              ) : (
                studentInfo.parentPhoneNumber
              )}
            </td>
            <th>반</th>
            <td>
              {isEditMode ? (
                <select
                  onChange={(e) => handleDropdownChange(e, "section")}
                  value={selectedSection}
                >
                  {sectionList.map((banOption) => (
                    <option key={banOption.name} value={banOption.id}>
                      {banOption.name}
                    </option>
                  ))}
                </select>
              ) : (
                studentInfo.sectionName
              )}
            </td>
          </tr>
        </tbody>
      </Table>

      <Guide2>수강 정보</Guide2>
      <p>
        {studentInfo.name} 학생은 총 {lectureCount}개의 수업을 수강 중입니다.
      </p>
      <Table>
        <thead>
          <tr>
            {columns &&
              columns.map((column) => <th key={column.key}>{column.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {lectureList &&
            lectureList.map((lecture, index) => (
              <tr key={index}>
                {columns &&
                  columns.map((column) => (
                    <td key={column.key}>
                      {column.key === "index"
                        ? index + 1
                        : column.key === "dayList"
                        ? lecture.dayList.join(", ")
                        : column.key === "time"
                        ? `${lecture.startTime.slice(
                            0,
                            5
                          )}-${lecture.endTime.slice(0, 5)}`
                        : lecture[column.key]}
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </Table>

      <Guide2>과제 정보</Guide2>
      <p>
        {studentInfo.name} 학생은 총 {taskCount && taskCount}개의 할 일이
        있습니다.
      </p>
      {/* <Button onClick={openAddModal}>등록</Button>
      {isAddModalOpen && (
        <AddPersonalTaskModal onClose={closeAddModal} onAdd={AddPersonalTask} />
      )} */}
      <Table>
        <thead>
          <th>과제명</th>
          <td>상태</td>
        </thead>
        <tbody>
          {taskInfo &&
            taskInfo.map((task) => (
              <tr key={task.id}>
                <td>{task.taskName}</td>
                <td>{task.taskProgress}</td>
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

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 23px;
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
  width: 50%;
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

const Button = styled.button`
  cursor: pointer;
  width: 80px;
  height: 30px;
  border-radius: 6px;
  background: #000;
  color: #fff;
  font-family: Poppins;
  font-size: 15px;
  font-style: normal;
  line-height: normal;
  border: none;
  margin-right: 10px;
`;

const Th = styled.th`
  width: auto;
`;

const Td = styled.td`
  width: 150px;
  /* width: 2%; */
`;
export default WebStudentDetail;
