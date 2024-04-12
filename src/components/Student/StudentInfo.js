import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { updateStudentInfoAPI, getOneStudentAPI } from "../../api/StudentAPI";
import {
  ListTable,
  ListTd,
  ListTh,
  ListTr,
  SubTitle,
  Title,
} from "../../styles/CommonStyles";
import { gradeTypeConvert } from "../../util/Util";
import StudentTask from "./StudentTask";

const WebStudentDetail = () => {
  //분반 정보 테이블 컬럼
  const sectionColumns = [
    { key: "name", label: "이름" },
    { key: "teacher", label: "선생님" },
  ];

  // 수업 정보 테이블 컬럼
  const lectureColumn = [
    { key: "name", label: "수업명" },
    { key: "dayList", label: "요일" },
    { key: "dateList", label: "날짜" },
    { key: "time", label: "시간" },
    { key: "lectureRoom", label: "강의실" },
    { key: "teacher", label: "선생님" },
  ];

  // 학생 인적사항
  const { id } = useParams();
  const [studentInfo, setstudentInfo] = useState({});

  // 수업 정보
  const [lectureList, setLectureList] = useState([]);
  const [lectureCount, setLectureCount] = useState(0);

  // 검색 옵션(학년, 반) 리스트
  const [gradeList, setGradeList] = useState(["중3", "고1", "고2", "고3"]);
  const [sectionList, setSectionList] = useState([]);
  const [sectionCount, setSectionCount] = useState(0);

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
  }, []);

  // 학생 정보를 가져오는 함수
  const fetchStudentDetail = async () => {
    getOneStudentAPI(id).then((data) => {
      console.log("학생 상세 정보: ", data);

      // 학생 정보 저장
      setstudentInfo(data.studentResponse);
      setSelectedId(data.studentResponse.id);
      setSelectedSchool(data.studentResponse.school);
      setSelectedSection(data.studentResponse.sectionId);
      setSelectedStudentPhoneNumber(data.studentResponse.studentPhoneNumber);
      setSelectedParentPhoneNumber(data.studentResponse.parentPhoneNumber);
      setSelectedGrade(data.studentResponse.grade);

      // 분반 정보 저장
      setSectionList(data.sectionAllBriefResponse.sectionBriefResponses);
      setSectionCount(data.sectionAllBriefResponse.sectionCount);
      console.log(
        "분반 정보: ",
        data.sectionAllBriefResponse.sectionBriefResponses
      );

      // 수업 정보 저장
      setLectureList(data.lectureAllResponse.lectureResponseList);
      setLectureCount(data.lectureAllResponse.lectureCount);
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
      await updateStudentInfoAPI(data);
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

      <SubTitle>인적 사항</SubTitle>
      <ListTable>
        <tbody>
          <ListTr>
            <ListTh>이름</ListTh>
            <ListTd>{studentInfo.name}</ListTd>
            <ListTh>아이디</ListTh>
            <ListTd>{studentInfo.id}</ListTd>
          </ListTr>
          <ListTr>
            <ListTh>학교</ListTh>
            <ListTd>
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
            </ListTd>
            <ListTh>학년</ListTh>
            <ListTd>
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
            </ListTd>
          </ListTr>
          <ListTr>
            <ListTh>학생 연락처</ListTh>
            <ListTd>
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
            </ListTd>
            <ListTh>부모님 연락처</ListTh>
            <ListTd>
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
            </ListTd>
          </ListTr>
        </tbody>
      </ListTable>

      <StudentTask />

      <SubTitle style={{ marginBottom: -5 }}>분반 정보</SubTitle>
      <p>
        {studentInfo.name} 학생은 총 {sectionCount}개의 분반에 속해있습니다.
      </p>
      <ListTable>
        <thead>
          <tr>
            {sectionColumns &&
              sectionColumns.map((column) => (
                <ListTh key={column.key}>{column.label}</ListTh>
              ))}
          </tr>
        </thead>
        <tbody>
          {sectionList &&
            sectionList.map((section) => (
              <ListTr key={section.id}>
                {sectionColumns &&
                  sectionColumns.map((column) => (
                    <ListTd key={column.key}>
                      {column.key === "name"
                        ? section.name
                        : column.key === "teacher"
                        ? section.teacher
                        : ""}
                    </ListTd>
                  ))}
              </ListTr>
            ))}
        </tbody>
      </ListTable>

      <SubTitle style={{ marginBottom: -5 }}>수강 정보</SubTitle>
      <p>
        {studentInfo.name} 학생은 총 {lectureCount}개의 수업을 수강 중입니다.
      </p>
      <ListTable>
        <thead>
          <ListTr>
            {lectureColumn &&
              lectureColumn.map((column) => (
                <ListTh key={column.key}>{column.label}</ListTh>
              ))}
          </ListTr>
        </thead>
        <tbody>
          {lectureList &&
            lectureList.map((lecture, index) => (
              <ListTr key={index}>
                {lectureColumn &&
                  lectureColumn.map((column) => (
                    <ListTd key={column.key}>
                      {column.key === "index"
                        ? index + 1
                        : column.key === "dayList"
                        ? lecture.dayList.join(", ")
                        : column.key === "dateList"
                        ? lecture.dateList.join(", ")
                        : column.key === "time"
                        ? `${lecture.startTime.slice(
                            0,
                            5
                          )}-${lecture.endTime.slice(0, 5)}`
                        : lecture[column.key]}
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

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 23px;
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
