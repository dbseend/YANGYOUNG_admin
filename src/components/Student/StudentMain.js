import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllStudentAPI } from "../../api/StudentAPI";
import { getSearchOptionAPI } from "../../api/UtilAPI";
import { Button, Title } from "../../styles/CommonStyles";
import { GlobalStyle } from "../../styles/Globalstyle";
import StudentList from "./StudentList";

const WebStudent = () => {
  const [sectionId, setSectionId] = useState(0);
  const [studentList, setStudentList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedGrade, setSelectedGrade] = useState(0);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [gradeList, setGradeList] = useState([]);

  useEffect(() => {
    viewAllStudent();
    getSearchOptionAPI().then((response) => {
      setSectionList(response.sectionList);
      const sortedByName = response.gradeList
        .slice()
        .sort((a, b) => a.localeCompare(b));
      setGradeList(sortedByName);
    });
  }, []);

  // 학생 전체 조회
  const viewAllStudent = async () => {
    try {
      const response = await getAllStudentAPI();
      handleStudentData(response.studentResponseList);
    } catch (error) {
      console.log("학생 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  // 학생 데이터 처리 및 상태 업데이트
  const handleStudentData = (students) => {
    const studentsWithIndex = students.map((student, index) => ({
      ...student,
      index: index + 1,
    }));
    setStudentList(studentsWithIndex); // 학생 목록 업데이트
    setFilteredData(studentsWithIndex); // 필터링된 데이터 업데이트
  };

  // 학생 검색
  const search = () => {
    const filteredData = studentList.filter((item) => {
      const nameMatch =
        !searchTerm ||
        (item.name &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      const sectionMatch =
        !selectedSection || item.sectionNameList.includes(selectedSection);
      // item.sectionName.toLowerCase().includes(selectedSection.toLowerCase());
      const schoolMatch =
        !selectedSchool ||
        item.school.toLowerCase().includes(selectedSchool.toLowerCase());

      const gradeMatch =
        !selectedGrade ||
        item.grade.toLowerCase().includes(selectedGrade.toLowerCase());
      // const gradeMatch = !selectedGrade || item.grade === selectedGrade;

      return nameMatch && sectionMatch && schoolMatch && gradeMatch;
    });
    setFilteredData(filteredData);
  };

  // 검색어 입력 시 상태 업데이트
  const getValue = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // 드롭다운 선택 시 상태 업데이트
  const handleDropdownChange = (e, type) => {
    const selectedValue = e.target.value;

    if (type === "section") {
      setSelectedSection(selectedValue);
      const sectionId = sectionList.indexOf(selectedValue) + 1;
      setSectionId(sectionId);
    } else if (type === "grade") {
      setSelectedGrade(selectedValue);
    }
  };

  // 학교 입력 시 상태 업데이트
  const handleSchoolChange = (e) => {
    setSelectedSchool(e.target.value);
  };

  // 엔터키 입력 시 검색
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  // 초기화 버튼 클릭 시 검색 조건 초기화
  const handleReset = () => {
    setSearchTerm("");
    setSelectedSection("");
    setSelectedSchool("");
    setSelectedGrade("");
    setFilteredData(studentList);
  };

  return (
    <Div>
      <GlobalStyle />
      <Title>학생 검색</Title>
      <SearchDiv>
        <OptionSelectDiv>
          <Label className="first-child">학생 이름</Label>
          <PostInput
            value={searchTerm}
            onChange={getValue}
            onKeyDown={handleKeyPress}
            placeholder="학생 이름으로 검색"
          />

          <Label className="second-child">반</Label>
          <OptionSelect
            onChange={(e) => handleDropdownChange(e, "section")}
            value={selectedSection || ""}
          >
            <option disabled value="">
              반 선택
            </option>
            {sectionList.map((banOption) => (
              <option key={banOption}>{banOption.name}</option>
            ))}
          </OptionSelect>

          <Label className="third-child">학교</Label>
          <PostInput
            type="text"
            value={selectedSchool}
            onChange={handleSchoolChange}
            onKeyDown={handleKeyPress}
            placeholder="학교 이름으로 검색"
          />

          <Label className="fourth-child">학년</Label>
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
          <Button onClick={handleReset}>초기화</Button>
          <Button onClick={search} onKeyPress={handleKeyPress}>
            검색
          </Button>
        </SearchButtonDiv>
      </SearchDiv>

      <Title>학생 목록</Title>
      <TableContainer>
        {filteredData && <StudentList filteredData={filteredData} />}
      </TableContainer>
    </Div>
  );
};

const Div = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  overflow: auto;
  margin-top: 100px;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 200px;
  align-items: flex-start;
`;

const TableContainer = styled.div`
  width: 85%;
  margin-bottom: 200px;
`;

const SearchDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 100px;
`;

const Label = styled.label`
  font-family: Poppins;
  font-size: 17px;
  line-height: 40px;
  text-align: left;
  margin-right: 10px;
  &.first-child {
    min-width: 75px;
  }

  &.second-child {
    min-width: 20px;
  }

  &.third-child {
    min-width: 35px;
  }

  &.fourth-child {
    min-width: 35px;
  }
`;

const PostInput = styled.input`
  width: 150px;
  height: 10px;
  font-size: 13px;
  color: #000;
  font-family: Poppins;
  font-weight: 400;
  margin-right: 40px;
  padding: 8px;
  border: 0.5px solid #d0d5dd;
  border-radius: 6px;
`;

const OptionSelect = styled.select`
  width: 168px;
  height: 28px;
  font-size: 13px;
  color: #000;
  font-family: Poppins;
  font-weight: 400;
  margin-right: 40px;
  padding: 3px;
  border: 0.5px solid #d0d5dd;
  border-radius: 6px;
`;

const OptionSelectDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  align-items: center;
`;

const SearchButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  gap: 26px;
`;

export { OptionSelect };
export default WebStudent;
