import React, { useState } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { addStudent, addStudentSection, viewStudent } from "../api/StudentApi";

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
  }
`;

const WebStudent = () => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedBan, setSelectedBan] = useState("");
  const [sectionId, setSectionId] = useState(0);
  const ban = ["W", "I", "N", "T", "E", "R"];

  const viewAllStudent = async () => {
    try {
      const { studentOneResponseList, count } = await viewStudent();
      setStudentList(studentOneResponseList);
      setTotalCount(count);
    } catch (error) {
      console.error("학생 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const postStudent = async (e) => {
    e.preventDefault();
    try {
      await addStudent(id, name, school, grade, phoneNumber);
      console.log("학생이 성공적으로 추가되었습니다!");
    } catch (error) {
      console.error("학생 데이터를 추가하는 중 오류 발생:", error);
    }
  };

  const handleChangeId = (e) => {
    setId(e.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeSchool = (e) => {
    setSchool(e.target.value);
  };

  const handleChangeGrade = (e) => {
    setGrade(e.target.value);
  };

  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleDropdownChange = (e) => {
    const selectedValue = e.target.value;

    setSelectedBan(selectedValue);

    switch (selectedValue) {
      case "W":
        setSectionId(1);
        break;
      case "I":
        setSectionId(2);
        break;
      case "N":
        setSectionId(3);
        break;
      case "T":
        setSectionId(4);
        break;
      case "E":
        setSectionId(5);
        break;
      case "R":
        setSectionId(6);
        break;
    }
  };

  return (
    <>
      <GlobalStyle />
      <Div>
        <Form onSubmit={postStudent}>
          ID:
          <input type="text" value={id} onChange={handleChangeId} />
          이름:
          <input type="text" value={name} onChange={handleChangeName} />
          학교:
          <input type="text" value={school} onChange={handleChangeSchool} />
          학년:
          <input type="text" value={grade} onChange={handleChangeGrade} />
          연락처:
          <input
            type="text"
            value={phoneNumber}
            onChange={handleChangePhoneNumber}
          />
          <select onChange={handleDropdownChange} value={selectedBan || ""}>
            <option disabled value="">
              반 선택
            </option>
            {ban.map((banOption) => (
              <option key={banOption} value={banOption}>
                {banOption}
              </option>
            ))}
          </select>
          <button type="submit">학생 정보 등록</button>
        </Form>

        <button onClick={viewAllStudent}>학생 정보 조회</button>
        <TableContainer>
          <h1>학생 목록</h1>
          <p>등록된 전체 학생 수: {totalCount}</p>
          <StyledTable>
            <StyledThead>
              <tr>
                <StyledTh>ID</StyledTh>
                <StyledTh>이름</StyledTh>
                <StyledTh>학교</StyledTh>
                <StyledTh>학년</StyledTh>
                <StyledTh>연락처</StyledTh>
              </tr>
            </StyledThead>
            <tbody>
              {studentList.map((student) => (
                <HoverTr key={student.id}>
                  <StyledTd>{student.id}</StyledTd>
                  <StyledTd>{student.name}</StyledTd>
                  <StyledTd>{student.school}</StyledTd>
                  <StyledTd>{student.grade}</StyledTd>
                  <StyledTd>{student.phoneNumber}</StyledTd>
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