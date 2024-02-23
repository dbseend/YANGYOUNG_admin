import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getOneSection } from "../../api/SectionAPI";

const WebSectionDetail = () => {
  const { id } = useParams();
  const [sectionOneInfo, setSectionOneInfo] = useState([]);
  const {sectionLectureInfo, setSectionLectureInfo} = useState({});
  const [studentPersonalInfo, setStudentPersonalInfo] = useState({});
  const [originalStudentPersonalInfo, setOriginalStudentPersonalInfo] =
    useState({});
  const [lectureInfo, setLectureInfo] = useState([]);
  const [lectureCount, setLectureCount] = useState(0);
  const [taskInfo, setTaskInfo] = useState([]);
  const [taskCount, setTaskCount] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedSection, setSelectedSection] = useState(0);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [grades, setGrades] = useState(["중3", "고1", "고2", "고3"]);
  const [sections, setSections] = useState(["A","I","N","T","E","R"]); // API로부터 섹션 정보를 가져와야 함

  useEffect(() => {
    const fetchStudentDetail = async () => {
      try {
        const response = await getOneSection(id);
        console.log (response.data);
        setSectionOneInfo(response.data.sectionResponse);
        setSectionLectureInfo(response.data.lectureGetAllResponse);
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

//   const handleSaveChanges = async () => {
//     try {
//       console.log("수정 전 학생 정보:", studentPersonalInfo);
//       await editStudentInfo({
//         studentId: studentPersonalInfo.id,
//         school: studentPersonalInfo.school,
//         grade: "M3",
//         phoneNumber: studentPersonalInfo.phoneNumber,
//         sectionId: parseInt(selectedSection),
//       });
//       // 학생 정보가 성공적으로 업데이트되면 편집 모드를 해제합니다.
//       setIsEditMode(false);
//       console.log("수정 후 학생 정보:", studentPersonalInfo);
//     } catch (error) {
//       console.error("학생 정보 수정 중 오류 발생: ", error);
//       // 에러 처리
//     }
//   };
  

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

  const handleGradeChange = (e) => {
    setSelectedGrade(e.target.value);
  };

  return (
    <Div>
      <Title>상세 정보</Title>
      <Container>
      <Button onClick={handleToggleEditMode}>
        {isEditMode ? "취소" : "수정"}
      </Button>
      {isEditMode && (
        <Button>저장</Button>
        // <Button onClick={handleSaveChanges}>저장</Button>

      )}
      </Container>
      <Guide1>분반 정보</Guide1>
      <Table>
        <tbody>
          <tr>
          <th>분반명</th>
            <td>
              {isEditMode ? (
                <input
                  type="text"
                  name="name"
                  value={sectionOneInfo.name}
                  onChange={handleInputChange}
                />
              ) : (
                sectionOneInfo.name
              )}
            </td>
            <th>id</th>
            <td>
              {isEditMode ? (
                <input
                  type="text"
                  name="id"
                  value={sectionOneInfo.id}
                  onChange={handleInputChange}
                />
              ) : (
                sectionOneInfo.id
              )}
            </td>
            <th>담임</th>
            <td>
              {isEditMode ? (
                <input
                  type="text"
                  name="id"
                  value={sectionOneInfo.teacher}
                  onChange={handleInputChange}
                />
              ) : (
                sectionOneInfo.teacher
              )}
            </td>
          </tr>
        </tbody>
      </Table>

      <Guide2>수강 정보</Guide2>
      <p>{sectionOneInfo.name} 분반에는 총 개의 수업이 배정되어 있습니다.</p>
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

const Container = styled.div`
display: flex;
flex-direction: row;
gap: 23px;
`
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

export default WebSectionDetail;
