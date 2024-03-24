import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getSearchOptionAPI } from "../../api/UtilAPI";
import { viewStudent } from "../../api/StudentApi";
import {
  Button,
  ListTable,
  ListTd,
  ListTh,
  ListTr,
  RowDiv,
} from "../../styles/CommonStyles";
import {updateSectionAPI} from "../../api/SectionAPI";

const NewWindowContent = () => {
  const { id } = useParams();
  const [studentList, setStudentList] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [sectionId, setSectionId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedGrade, setSelectedGrade] = useState(0);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [gradeList, setGradeList] = useState([]);
  const students = [
    { key: "name", label: "이름" },
    { key: "school", label: "학교" },
    { key: "grade", label: "학년" },
    { key: "check", label: "선택" },
  ];
  useEffect(() => {
    // viewAllStudent();
    console.log(id);
    
    getSearchOptionAPI().then((response) => {
      setSectionList(response.sectionList);
      const sortedByName = response.gradeList
        .slice()
        .sort((a, b) => a.localeCompare(b));
      setGradeList(sortedByName);
    });
  }, []);
  useEffect(() => {
    const getStudentList = async () => {
      const response = await viewStudent();
      console.log(response.studentResponseList);
      setStudentList(response.studentResponseList); // 학생 목록
    };
    getStudentList();
  }, []);

  //업데이트 - 확인 필요
  const updateStudents = async () => {
    console.log (id);
    console.log (selectedStudents);
    const updatedData = {
        sectionId: id,
        studentIdList: selectedStudents
    };
    console.log (updatedData);
    const response = await updateSectionAPI(updatedData);
    alert ("학생 추가 할당 성공");
    console.log (response);
  }

  //   체크박스 리스트 전체 선택 및 해제
  const handleAllCheckboxChange = () => {
    if (selectedStudents.length === studentList.length) {
      setSelectedStudents([]);
    }
    if (selectedStudents.length !== studentList.length) {
      setSelectedStudents(studentList.map((student) => student.id));
    }
  };

  // 체크박스 선택 시 학생 목록에 추가/제거
  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prevSelected) => {
      if (prevSelected.includes(studentId)) {
        return prevSelected.filter((id) => id !== studentId);
      } else {
        return [...prevSelected, studentId];
      }
    });
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
    <div>
      <h2>학생 선택</h2>
      <RowDiv style={{ marginBottom: 10 }}></RowDiv>
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
      <Button onClick={updateStudents}>학생 배정</Button>
      {filteredData && (
        <ListTable>
          <thead>
            <ListTr>
              {students &&
                students.map((student) => (
                  <ListTh key={student.key}>
                    {student.key === "check" ? (
                      <input
                        type="checkbox"
                        checked={
                          selectedStudents.length === filteredData.length
                        }
                        onClick={handleAllCheckboxChange}
                      />
                    ) : (
                      student.label
                    )}
                  </ListTh>
                ))}
            </ListTr>
          </thead>
          <tbody>
            {filteredData &&
              filteredData.map((student, index) => (
                <ListTr key={index}>
                  {students.map((col) => (
                    <ListTd key={col.key}>
                      {col.key === "check" ? (
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student.id)}
                          onChange={() => handleCheckboxChange(student.id)}
                        />
                      ) : (
                        <div>{student[col.key]}</div>
                      )}
                    </ListTd>
                  ))}
                </ListTr>
              ))}
          </tbody>
        </ListTable>
      )}
    </div>
  );
};

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

export default NewWindowContent;
