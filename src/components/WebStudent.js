import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import StudentList from "./WebStudentList";
import { viewStudent } from "../api/StudentApi";
import { IoIosAddCircleOutline, IoMdColorWand, IoIosTrash } from "react-icons/io";

const WebStudent = () => {
  const navigate = useNavigate();
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
  }, []);

  const viewAllStudent = async () => {
    try {
      const response = await viewStudent();
      const studentsWithIndex = response.studentResponseList.map(
        (student, index) => ({
          ...student,
          index: index + 1,
        })
      );
      setGradeList(response.gradeList);
      setSectionList(response.sectionList);
      setStudentList(studentsWithIndex);
      setFilteredData(studentsWithIndex);
    } catch (error) {
      console.log("학생 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const moveToAddSt = () => {
    navigate("/addstudent");
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

      const gradeMatch =
        !selectedGrade ||
        item.grade.toLowerCase().includes(selectedGrade.toLowerCase());
      // const gradeMatch = !selectedGrade || item.grade === selectedGrade;

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
    } else if (type === "grade") {
      setSelectedGrade(parseInt(selectedValue));
    }
  };

  const handleSchoolChange = (e) => {
    setSelectedSchool(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedSection("");
    setSelectedSchool("");
    setSelectedGrade("");
    setFilteredData(studentList);
  };

  return (
    <>
      <Div>
        <Title>학생 검색</Title>
        <SearchDiv>
          <OptionSelectDiv>
            <Label>학생 이름</Label>
            <PostInput
              value={searchTerm}
              onChange={getValue}
              onKeyDown={handleKeyPress}
              placeholder="학생 이름으로 검색"
            />

            <Label>반</Label>
            <OptionSelect
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
            </OptionSelect>

            <Label>학교</Label>
            <PostInput
              type="text"
              value={selectedSchool}
              onChange={handleSchoolChange}
              onKeyDown={handleKeyPress}
              placeholder="학교 이름으로 검색"
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
            <Button onClick={handleReset}>초기화</Button>
            <Button onClick={search} onKeyPress={handleKeyPress}>
              검색
            </Button>
          </SearchButtonDiv>
        </SearchDiv>

        <Title>학생 목록</Title>
        <IconDiv>
          <StyledAddIcon onClick={moveToAddSt} size={30} />
          <StyledColorWandIcon size={30} />
          <StyledTrashIcon size={30} />
        </IconDiv>
        <TableContainer>
          {filteredData && <StudentList filteredData={filteredData} />}
        </TableContainer>
      </Div>
    </>
  );
};

const Div = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  overflow: auto;
  margin-top: 100px;
  margin-left: 10%;
  margin-right:10%;
`;

const Title = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const TableContainer = styled.div``;

const SearchDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 100px;
`;

const Label = styled.label`
  font-family: Poppins;
  font-size: 20px;
  line-height: 40px;
  margin-right: 10px;
`;

const PostInput = styled.input`
  width: 188px;
  height: 21px;
  font-size: 16px;
  color: #000;
  font-family: Poppins;
  font-weight: 400;
  margin-right: 40px;
  padding: 8px;
  border: 0.5px solid #d0d5dd;
  border-radius: 6px;

  &:focus {
    outline: none;
    border-color: #5b76f7;
    box-shadow: 0 0 5px rgba(91, 118, 247, 0.5);
  }
`;

const OptionSelect = styled.select`
  width: 188px;
  height: 40px;
  font-size: 16px;
  color: #000;
  font-family: Poppins;
  font-weight: 400;
  margin-right: 40px;
  padding: 8px;
  border: 0.5px solid #d0d5dd;
  border-radius: 6px;

  &:focus {
    outline: none;
    border-color: #5b76f7;
    box-shadow: 0 0 5px rgba(91, 118, 247, 0.5);
  }

  &::-ms-expand {
    display: none;
  }

  &::after {
    content: '▼';
    color: #000;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    pointer-events: none;
  }
`;

const OptionSelectDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
`;

const SearchButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  gap: 26px;
`;

const Button = styled.button`
  width: 80px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 6px;
  background: #000;
  color: #fff;
  font-family: Poppins;
  font-size: 15px;
  font-style: normal;
  line-height: normal;
  cursor: pointer;
  border: none;
`;

const IconDiv = styled.div`
  display: flex;
  justify-content: flex-end; /* Align icons to the right */
  cursor: pointer;
  margin-top: 20px;
  gap: 20px;
  @media screen and (max-width: 768px) {
    margin-right: 50px;
  }
`;

const StyledAddIcon = styled(IoIosAddCircleOutline)`
  cursor: pointer;
`;

const StyledColorWandIcon = styled(IoMdColorWand)`
  cursor: pointer;
`;

const StyledTrashIcon = styled(IoIosTrash)`
  cursor: pointer;
`;

export default WebStudent;
