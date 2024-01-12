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
  const [lectureName, setLectureName] = useState("");
  const [lectureDay, setLectureDay] = useState("");
  const [lectureTime, setLectureTime] = useState("");
  const [lectureRoom, setLectureRoom] = useState("");
  const postLecture = async (e) => {
    e.preventDefault();
    try {
      await addLecture(lectureName, lectureDay, lectureTime, lectureRoom);
      // addLecture 함수가 완료된 후에 수행할 작업 추가
      console.log("Lecture added successfully!");
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
  const handleNameChange = (e) => {
    setLectureName(e.target.value);
  };
  const handleDayChange = (e) => {
    setLectureDay(e.target.value);
  };
  const handleTimeChange = (e) => {
    setLectureTime(e.target.value);
  };
  const handleRoomChange = (e) => {
    setLectureRoom(e.target.value);
  };

  return (
    <>
      <GlobalStyle />
      <Div>
        <Form onSubmit={postLecture}>
          강의 제목{" "}
          <input
            type="text"
            value={lectureName}
            onChange={handleNameChange}
          ></input>
          요일{" "}
          <input
            type="text"
            value={lectureDay}
            onChange={handleDayChange}
          ></input>
          시간{" "}
          <input
            type="text"
            value={lectureTime}
            onChange={handleTimeChange}
          ></input>
          강의실{" "}
          <input
            type="text"
            value={lectureRoom}
            onChange={handleRoomChange}
          ></input>
          <button type="submit"> 강의 생성하기 </button>
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
