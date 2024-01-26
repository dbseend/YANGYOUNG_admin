import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import StudentList, { studentList} from "./WebStudentList";

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
        {/* <SearchDiv>
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
        </SearchDiv> */}
        <CenteredContainer>
          <AddStudentButton>학생 추가</AddStudentButton>
        </CenteredContainer>{" "}
        <Title>학생 목록</Title>
        <TableContainer><StudentList /> </TableContainer>
      </Div>
    </>
  );
};

