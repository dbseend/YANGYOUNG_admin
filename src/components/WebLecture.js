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
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const viewAllLecture = async () => {
    try {
      const { lectureGetOneResponseList, count } = await viewLecture();
      setLectureList(lectureGetOneResponseList);
      setTotalCount(count);
    } catch (error) {
      console.error("Error fetching lecture data:", error);
    }
  };

  const postLecture = async (e) => {
    e.preventDefault();
    const lectureDay = mapDayToServerFormat(selectedDay);
    const lectureRoom = mapRoomToServerFormat(selectedRoom);
    const lectureTime = mapRoomToServerFormat(selectedTime);
    try {
      await addLecture(lectureName, lectureDay, lectureTime, lectureRoom);
      // addLecture 함수가 완료된 후에 수행할 작업 추가
      console.log("Lecture added successfully!");
    } catch (error) {
      console.error("Error fetching lecture data:", error);
    }
  };

  const handleDayDropdownChange = (e) => {
    const selectedOption = e.target.value;
    console.log("Selected Day:", selectedOption);
    setSelectedDay(selectedOption);
  };
  const handleRoomDropdownChange = (e) => {
    const selectedOption = e.target.value;
    console.log("Selected Room:", selectedOption);
    setSelectedRoom(selectedOption);
  };
  const handleTimeDropdownChange = (e) => {
    const selectedOption = e.target.value;
    console.log("Selected Time:", selectedOption);
    setSelectedTime(selectedOption);
  };

  const mapDayToServerFormat = (day) => {
    switch (day) {
      case "월요일":
        return "MONDAY";
      case "화요일":
        return "TUESDAY";
      case "수요일":
        return "WEDNESDAY";
      case "목요일":
        return "THURSDAY";
      case "금요일":
        return "FRIDAY";
      case "토요일":
        return "SATURDAY";
      case "일요일":
        return "SUNDAY";
      default:
        return "";
    }
  };
  const mapRoomToServerFormat = (room) => {
    switch (room) {
      case "601호":
        return "R1";
      case "602호":
        return "R2";
      case "603호":
        return "R3";
      case "509호":
        return "R4";
      case "510호":
        return "R5";
      case "511호":
        return "R6";
      default:
        return "";
    }
  };
  const mapTimeToServerFormat = (time) => {
    switch (time) {
      case "12:40-2:10":
        return "T1";
      case "2:15-3:45":
        return "T2";
      case "3:45-5:20":
        return "T3";
      case "5:25-6:55":
        return "T4";
      case "7:00-8:30":
        return "T5";
      case "8:35-10:05":
        return "T6";
      default:
        return "";
    }
  };

  const handleNameChange = (e) => {
    setLectureName(e.target.value);
  };
  const handleRoomChange = (e) => {
    setLectureRoom(e.target.value);
  };
  const handleTimeChange = (e) => {
    setLectureTime(e.target.value);
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
          <select onChange={handleDayDropdownChange}>
            <option value={selectedDay} disabled>
              요일 선택
            </option>
            <option value="월요일">월요일</option>
            <option value="화요일">화요일</option>
            <option value="수요일">수요일</option>
            <option value="목요일">목요일</option>
            <option value="금요일">금요일</option>
            <option value="토요일">토요일</option>
            <option value="일요일">일요일</option>
          </select>
          {/* <input
            type="text"
            value={lectureDay}
            onChange={handleDayChange}
          ></input> */}
          시간{" "}
          <select onChange={handleTimeDropdownChange}>
            <option value={selectedTime} disabled>
              요일 선택
            </option>
            <option value="12:40-2:10">12:40-2:10</option>
            <option value="2:15-3:45">2:15-3:45</option>
            <option value="3:45-5:20">3:45-5:20</option>
            <option value="5:25-6:55">5:25-6:55</option>
            <option value="7:00-8:30">7:00-8:30</option>
            <option value="8:35-10:05">8:35-10:05</option>
          </select>
          {/* <input
            type="text"
            value={lectureTime}
            onChange={handleTimeChange}
          ></input> */}
          강의실{" "}
          <select onChange={handleRoomDropdownChange}>
            <option value={selectedRoom} disabled>
              요일 선택
            </option>
            <option value="601호">601호</option>
            <option value="602호">602호</option>
            <option value="603호">603호</option>
            <option value="509호">509호</option>
            <option value="510호">510호</option>
            <option value="511호">511호</option>
          </select>
          {/* <input
            type="text"
            value={lectureRoom}
            onChange={handleRoomChange}
          ></input> */}
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
