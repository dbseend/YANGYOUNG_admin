import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import Modal from "./WebModal";
import { getStudentInfo, viewStudent } from "../api/StudentApi";
import { useNavigate } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  body {
    margin : 0;
    padding: 0;
  }
`;

const Div = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  overflow: auto;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  margin-top: 20px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const TableContainer = styled.div`
  margin: 20px;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
`;

const StyledThead = styled.thead`
  background-color: #f2f2f2;
`;

const StyledTh = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const StyledTd = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const HoverTr = styled.tr`
  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
`;

const PostInput = styled.input`
  /* margin-top: 30px; */
  width: 200px;
`;

const Label = styled.label`
  /* margin-top: 20px; */
  display: flex;
  flex-direction: column;
`;

const SearhDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const WebStudent = () => {
  const [sectionId, setSectionId] = useState(0);
  const [studentList, setStudentList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedGrade, setSelectedGrade] = useState(0);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sectionList, setSection] = useState([]);
  const [gradeList, setGrade] = useState([]);
  const [schoolList, setSchool] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [studentInfo, setStudentInfo] = useState({});
  const [lectureInfo, setLectureInfo] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    viewAllStudent();
  }, []);
  const moveToAddSt = () => {
    navigate("/addstudent");
  }
  const viewAllStudent = async () => {
    try {
      const response = await viewStudent();
      setStudentList(response.studentOneResponseList);
      setFilteredData(response.studentOneResponseList);
      setSection(response.sectionList);
      setGrade(response.gradeList);
      setSchool(response.schoolList);
      console.log(response);
    } catch (error) {
      console.log("학생 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const search = () => {
    const filteredData = studentList.filter((item) => {
      const nameMatch =
        !searchTerm ||
        (item.name &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      const sectionMatch =
        !selectedSection ||
        item.sectionName.toLowerCase().includes(selectedSection.toLowerCase());
      const schoolMatch =
        !selectedSchool ||
        item.school.toLowerCase().includes(selectedSchool.toLowerCase());
      const gradeMatch = !selectedGrade || item.grade === selectedGrade;

      return nameMatch && sectionMatch && schoolMatch && gradeMatch;
    });

    setFilteredData(filteredData);
  };

  const getValue = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleDropdownChange = (e, type) => {
    const selectedValue = e.target.value;

    if (type === "section") {
      setSelectedSection(selectedValue);
      const sectionId = sectionList.indexOf(selectedValue) + 1;
      setSectionId(sectionId);
      console.log("하나");
    } else if (type === "school") {
      setSelectedSchool(selectedValue);
      console.log("둘");
    } else if (type === "grade") {
      setSelectedGrade(selectedValue);
      console.log("셋");
    }
  };

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      search();
    }
  }

  const handleReset = () => {
    setSelectedSection("");
    setSelectedSchool("");
    setSelectedGrade(0);
    setFilteredData(studentList);
  };

  const openModal = async (studentId) => {
    try {
      const response = await getStudentInfo(studentId);
      console.log(response);
      setStudentInfo(response.studentOneResponse);
      setLectureInfo(response.lectureGetOneResponseList);
      setModalOpen(true);
    } catch (error) {
      console.log("학생 상세 데이터를 가져오는 중 오류 발생: ", error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };
 
  return (
    <>
      <GlobalStyle />
      <Div>
        <SearhDiv>
          <Label>학생 이름</Label>
          <PostInput
            onChange={getValue}
            onKeyDown={handleKeyPress}
            placeholder="학생 이름을 입력해주세요"
          />
          <Label>반</Label>
          <select
            onChange={(e) => handleDropdownChange(e, "section")}
            value={selectedSection || ""}
          >
            <option disabled value="">
              반 선택
            </option>
            {sectionList.map((banOption) => (
              <option key={banOption} value={banOption}>
                {banOption}
              </option>
            ))}
          </select>
          <Label>학교</Label>
          <select
            onChange={(e) => handleDropdownChange(e, "school")}
            value={selectedSchool || ""}
          >
            <option disabled value="">
              학교 선택
            </option>
            {schoolList.map((banOption) => (
              <option key={banOption} value={banOption}>
                {banOption}
              </option>
            ))}
          </select>
          <Label>학년</Label>
          <select
            onChange={(e) => handleDropdownChange(e, "grade")}
            value={selectedGrade || ""}
          >
            <option disabled value="">
              학년 선택
            </option>
            {gradeList.map((banOption) => (
              <option key={banOption} value={banOption}>
                {banOption}
              </option>
            ))}
          </select>
          <button onClick={handleReset}>모든 설정 초기화</button>
          <button onClick={search} onKeyPress={handleKeyPress}>
            학생 or 반 조회
          </button>
        </SearhDiv>
        {isModalOpen && (
          <Modal
            onClose={closeModal}
            studentInfo={studentInfo}
            lectureInfo={lectureInfo}
          ></Modal>
        )}
        <button onClick={moveToAddSt}>학생 추가</button>
        <TableContainer>
          <h1>학생 목록</h1>
          <StyledTable>
            <StyledThead>
              <tr>
                <StyledTh></StyledTh>
                <StyledTh>반</StyledTh>
                <StyledTh>이름</StyledTh>
                <StyledTh>학교</StyledTh>
                <StyledTh>연락처</StyledTh>
                <StyledTh>학년</StyledTh>
                <StyledTh>ID</StyledTh>
              </tr>
            </StyledThead>
            <tbody>
              {filteredData.map((student) => (
                <HoverTr onClick={() => openModal(student.id)} key={student.id}>
                  <StyledTd>count </StyledTd>
                  <StyledTd>{student.sectionName}</StyledTd>
                  <StyledTd>{student.name}</StyledTd>
                  <StyledTd>{student.school}</StyledTd>
                  <StyledTd>{student.phoneNumber}</StyledTd>
                  <StyledTd>{student.grade}</StyledTd>
                  <StyledTd>{student.id}</StyledTd>
                </HoverTr>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      </Div>
    </>
  );
};

export default WebStudent;
