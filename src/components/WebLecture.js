import React, { useState } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { viewLecture, addLecture } from "../api/LectureApi";

const GlobalStyle = createGlobalStyle`
  body {
    margin : 0;
    padding: 0;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  overflow: auto;
`;

const TableContainer = styled.div`
  margin: 20px;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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
const Lecture = () => {
  const [lectureList, setLectureList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const postLecture = async () => {
    try {
    } catch (error) {
      console.error("Error fetching lecture data:", error);
    }
  };
  const viewAllLecture = async () => {
    try {
      const { lectureGetOneResponseList, count } = await viewLecture();
      setLectureList(lectureGetOneResponseList);
      setTotalCount(count);
    } catch (error) {
      console.error("Error fetching lecture data:", error);
    }
  };
  return (
    <>
      <GlobalStyle />
      <Div>
        <Form>
          강의 제목 <input type="text"></input>
          요일 <input type="text"></input>
          시간 <input type="text"></input>
          강의실 <input type="text"></input>
          <button> 강의 생성하기 </button>
        </Form>
        <button onClick={viewAllLecture}> 강의 보기 </button>
        <TableContainer>
          <h1>Lecture List</h1>
          <p> 개설 강좌 수: {totalCount}</p>
          <StyledTable>
            <StyledThead>
              <tr>
                <StyledTh>ID</StyledTh>
                <StyledTh>강의</StyledTh>
                <StyledTh>요일</StyledTh>
                <StyledTh>시간</StyledTh>
                <StyledTh>강의실</StyledTh>
              </tr>
            </StyledThead>
            <tbody>
              {lectureList.map((lecture) => (
                <HoverTr key={lecture.id}>
                  <StyledTd>{lecture.id}</StyledTd>
                  <StyledTd>{lecture.name}</StyledTd>
                  <StyledTd>{lecture.day}</StyledTd>
                  <StyledTd>{lecture.time}</StyledTd>
                  <StyledTd>{lecture.room}</StyledTd>
                </HoverTr>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      </Div>
    </>
  );
};
export default Lecture;
