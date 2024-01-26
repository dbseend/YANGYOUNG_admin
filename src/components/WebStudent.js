import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import Modal from "./WebModal";
import { getStudentInfo, viewStudent } from "../api/StudentApi";
import { useNavigate } from "react-router-dom";

const WebStudent = () => {
  const navigate = useNavigate();
  const [sectionId, setSectionId] = useState(0);
  const [studentList, setStudentList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedGrade, setSelectedGrade] = useState(0);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sectionList, setSection] = useState([]);
  const [gradeList, setGrade] = useState([]);

  const moveToAddSt = () => {
    navigate("/addstudent");
  };

  const search = () => {
    const filteredData = studentList.filter((item) => {
      console.log(typeof selectedGrade);
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

      return nameMatch && sectionMatch && schoolMatch;
      // && gradeMatch;
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
    } else if (type === "grade") {
      setSelectedGrade(parseInt(selectedValue));
      console.log(selectedValue);
      console.log("셋");
    }
  };

  const handleSchoolChange = (e) => {
    setSelectedSchool(e.target.value);
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

  return (
    <>
      <GlobalStyle />
      <Div>
        <Title>학생 검색</Title>
        <SearchDiv>
          <OptionSelectDiv>
            <Label>학생 이름</Label>
            <PostInput
              onChange={getValue}
              onKeyDown={handleKeyPress}
              placeholder="학생 이름을 입력해주세요"
            />

            <Label>반</Label>
            <OptionSelect
              onChange={(e) => handleDropdownChange(e, "section")}
              value={selectedSection || ""}
            >
              {sectionList.map((banOption) => (
                <option key={banOption} value={banOption}>
                  {banOption}
                </option>
              ))}
            </OptionSelect>

            <Label>학교</Label>
            <PostInput
              type="text"
              value={selectedSchool}
              onChange={handleSchoolChange}
              onKeyDown={handleKeyPress}
            />

            <Label>학년</Label>
            <OptionSelect
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
            </OptionSelect>
          </OptionSelectDiv>

          <SearchButtonDiv>
            <button onClick={handleReset}>초기화</button>
            <button onClick={search} onKeyPress={handleKeyPress}>
              검색
            </button>
          </SearchButtonDiv>
        </SearchDiv>
        <CenteredContainer>
          <AddStudentButton>학생 추가</AddStudentButton>
        </CenteredContainer>{" "}
        <Title>학생 목록</Title>
        <TableContainer></TableContainer>
      </Div>
    </>
  );
};

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
  margin-top: 120px;
`;

const Title = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 20px;
  margin-left: 200px;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
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

const SearchDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* 수정된 부분 */
  margin: 0 auto;
  padding: 0px 10px 0px 10px;
  border: 2px solid #9d221a; /* 수정된 부분 */
  border-radius: 10px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const PostInput = styled.input`
  margin-right: 10px;
`;

const OptionSelect = styled.select`
  margin-right: 10px;
`;

const OptionSelectDiv = styled(RowDiv)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SearchButtonDiv = styled(RowDiv)`
  display: flex;
  justify-content: center;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const AddStudentButton = styled.button`
  width: 300px;
`;
export default WebStudent;
