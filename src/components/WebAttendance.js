import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getStudentInfo, editStudentInfo } from "../api/StudentApi";

const WebStudentDetail = () => {
  const { id } = useParams();
  const [studentPersonalInfo, setStudentPersonalInfo] = useState({});
  const [originalStudentPersonalInfo, setOriginalStudentPersonalInfo] =
    useState({});
  const [lectureInfo, setLectureInfo] = useState([]);
  const [lectureCount, setLectureCount] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [grades, setGrades] = useState(["H1", "H2", "M3", "H1"]);
  const [sections, setSections] = useState([]); // API로부터 섹션 정보를 가져와야 함
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  useEffect(() => {
    const fetchStudentDetail = async () => {
      try {
        const response = await getStudentInfo(id);
        setStudentPersonalInfo(response.studentResponse);
        setOriginalStudentPersonalInfo(response.studentResponse);
        setLectureInfo(
          response.lectureGetAllResponse.lectureGetOneResponseList
        );
        setLectureCount(response.lectureGetAllResponse.count);
        // API로부터 섹션 정보를 가져와서 설정
        // setSections(response.sectionList); 
      } catch (error) {
        console.log("학생 상세 정보 가져오는 중 오류 발생: ", error);
      }
    };
    fetchStudentDetail();
  }, [id]);

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
    // 수정 모드가 종료되면 원래의 정보로 복원
    if (!isEditMode) {
      setStudentPersonalInfo(originalStudentPersonalInfo);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await editStudentInfo(id, {
        studentId: studentPersonalInfo.id,
        school: studentPersonalInfo.school,
        grade: selectedGrade,
        phoneNumber: studentPersonalInfo.phoneNumber,
        sectionId: selectedSection,
      });
      // 학생 정보가 성공적으로 업데이트되면 편집 모드를 해제합니다.
      setIsEditMode(false);
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

  const handleDropdownChange = (e, type) => {
    const value = e.target.value;
    if (type === "grade") {
      setSelectedGrade(value);
    } else if (type === "section") {
      setSelectedSection(value);
    }
  };

  return (
    <Div>
      <Title>상세 정보</Title>
      <Button onClick={handleToggleEditMode}>
        {isEditMode ? "취소" : "수정"}
      </Button>
      {isEditMode && (
        <Button onClick={handleSaveChanges}>저장</Button>
      )}
      <Guide1>학생 인적 사항</Guide1>
      <Table>
        <tbody>
          <tr>
            <th>이름</th>
            <td>
              {isEditMode ? (
                <input
                  type="text"
                  name="name"
                  value={studentPersonalInfo.name}
                  onChange={handleInputChange}
                />
              ) : (
                studentPersonalInfo.name
              )}
            </td>
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
            <th>학년</th>
            <td>
              {isEditMode ? (
                <select
                  onChange={(e) => handleDropdownChange(e, "grade")}
                  value={selectedGrade}
                >
                  <option value="">학년 선택</option>
                  {grades.map((grade) => (
                    <option key={grade} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              ) : (
                studentPersonalInfo.grade
              )}
            </td>
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
                <Select
                  onChange={(e) => handleDropdownChange(e, "section")}
                  value={selectedSection}
                >
                  <option value="">반 선택</option>
                  {sections.map((section) => (
                    <option key={section} value={section}>
                      {section}
                    </option>
                  ))}
                </Select>
              ) : (
                studentPersonalInfo.sectionName
              )}
            </td>
          </tr>
        </tbody>
      </Table>
      <Guide2>수강 정보</Guide2>
      <p>{studentPersonalInfo.name} 학생은 총 {lectureCount} 개의 수업을 수강 중입니다.</p>
      <Table>
        <thead>
          <tr>
            <th>강의명</th>
            <th>요일</th>
            <th>시간</th>
            <th>강의실</th>
          </tr>
        </thead>
        <tbody>
          {lectureInfo.map((lecture) => (
            <tr key={lecture.id}>
              <td>{lecture.name}</td>
              <td>{lecture.day}</td>
              <td>{lecture.time}</td>
              <td>{lecture.room}</td>
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
`;

const Title = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 10px;
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

const Guide1 = styled.h3`
  margin-top: 30px;
`;

const Guide2 = styled.h3`
  margin-top: 30px;
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

const Select = styled.select`
  width: 100%;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export default WebStudentDetail;
