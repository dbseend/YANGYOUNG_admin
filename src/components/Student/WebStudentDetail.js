import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import {
  getStudentInfo,
  editStudentInfo,
  viewStudent,
} from "../../api/StudentApi";

const columns = [
  { key: "name", label: "수업명" },
  { key: "dayList", label: "요일" },
  { key: "time", label: "시간" },
  { key: "room", label: "강의실" },
  { key: "teacher", label: "선생님" },
];

const WebStudentDetail = () => {
  const { id } = useParams();
  const [studentPersonalInfo, setStudentPersonalInfo] = useState({});
  const [originalStudentPersonalInfo, setOriginalStudentPersonalInfo] =
    useState({});
  const [taskInfo, setTaskInfo] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  // const [selectedGrade, setSelectedGrade] = useState("");
  // const [grades, setGrades] = useState(["중3", "고1", "고2", "고3"]);
  // const [grades, setGrades] = useState(["M3", "H1", "H2", "H3"]);
  const [selectedSection, setSelectedSection] = useState(""); // 초기값을 빈 문자열로 설정
  const [sectionId, setSectionId] = useState(0);
  const [sectionList, setSection] = useState([]);
  const [lectureList, setLectureList] = useState([]);
  const [lectureCount, setLectureCount] = useState(0);

  const viewAllStudent = async () => {
    try {
      const response = await viewStudent();

      setSection(response.sectionList);

      console.log(response);
    } catch (error) {
      console.log("학생 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    const fetchStudentDetail = async () => {
      try {
        const response = await getStudentInfo(id);
        setStudentPersonalInfo(response.studentResponse);
        setOriginalStudentPersonalInfo(response.studentResponse);
        setLectureList(response.lectureAllResponse.lectureResponseList);
        setTaskInfo(response.studentTaskAllResponse.studentTaskResponseList);
        setLectureCount(response.lectureAllResponse.count);
        setTaskCount(response.studentTaskAllResponse.studentTaskSize);
      } catch (error) {
        console.log("학생 상세 정보 가져오는 중 오류 발생: ", error);
      }
    };
    fetchStudentDetail();
    viewAllStudent();
  }, [id]);

  const handleDropdownChange = (e, type) => {
    const selectedValue = e.target.value;

    if (type === "section") {
      setSelectedSection(selectedValue);
      const sectionId = sectionList.indexOf(selectedValue) + 1;
      setSectionId(sectionId);
    }
  };
  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
    // 수정 모드가 종료되면 원래의 정보로 복원
    if (!isEditMode) {
      setStudentPersonalInfo(originalStudentPersonalInfo);
    }
  };

  const handleSaveChanges = async () => {
    try {
      console.log("수정 전 학생 정보:", studentPersonalInfo);
      await editStudentInfo({
        studentId: studentPersonalInfo.id,
        school: studentPersonalInfo.school,
        grade: studentPersonalInfo.grade,
        phoneNumber: studentPersonalInfo.phoneNumber,
        sectionId: studentPersonalInfo.sectionId,
        // sectionId: parseInt(selectedSection),
      });
      // 학생 정보가 성공적으로 업데이트되면 편집 모드를 해제합니다.
      setIsEditMode(false);
      console.log("수정 후 학생 정보:", studentPersonalInfo);
    } catch (error) {
      console.error("학생 정보 수정 중 오류 발생: ", error);
      // 에러 처리
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentPersonalInfo({
      ...studentPersonalInfo,
      [name]: value,
    });
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  // const handleGradeChange = (e) => {
  //   setSelectedGrade(e.target.value);
  // };

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
            <th>이름</th>
            <td>{studentPersonalInfo.name}</td>
            <th>학번</th>
            <td>
              {isEditMode ? (
                <input
                  type="text"
                  name="id"
                  value={studentPersonalInfo.id}
                  onChange={handleInputChange}
                />
              ) : (
                studentPersonalInfo.id
              )}
            </td>
          </tr>
          <tr>
            <th>학교</th>
            <td>
              {isEditMode ? (
                <input
                  type="text"
                  name="school"
                  value={studentPersonalInfo.school}
                  onChange={handleInputChange}
                />
              ) : (
                studentPersonalInfo.school
              )}
            </td>
            {/* <th>학년</th>
            <td>
              {isEditMode ? (
                <select
                  name="grade"
                  value={studentPersonalInfo.grade}
                  onChange={handleGradeChange}
                >
                  {grades.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              ) : (
                studentPersonalInfo.grade
              )}
            </td> */}
          </tr>
          <tr>
            <th>연락처</th>
            <td>
              {isEditMode ? (
                <input
                  type="text"
                  name="phoneNumber"
                  value={studentPersonalInfo.phoneNumber}
                  onChange={handleInputChange}
                />
              ) : (
                studentPersonalInfo.phoneNumber
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
                    <option key={banOption} value={banOption}>
                      {banOption.name}
                    </option>
                  ))}
                </select>
              ) : (
                studentPersonalInfo.sectionName
              )}
            </td>
          </tr>
        </tbody>
      </Table>

      <Guide2>수강 정보</Guide2>
      <p>
        {studentPersonalInfo.name} 학생은 총 {lectureCount}개의 수업을 수강
        중입니다.
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
        {studentPersonalInfo.name} 학생은 총 {taskCount && taskCount}개의 할
        일이 있습니다.
      </p>
      <Table>
        <thead>
          <th>과제명</th>
          <th>상태</th>
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
export default WebStudentDetail;
