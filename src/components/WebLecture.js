import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { viewLecture, addLecture } from "../api/LectureApi";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
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
  const [lectureTeacher, setLectureTeacher] = useState("");

  useEffect(() => {
    viewAllLecture();
  }, []);

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
    const day = mapDayToServerFormat(selectedDay);
    const room = mapRoomToServerFormat(selectedRoom);
    const time = mapTimeToServerFormat(selectedTime);
    // setLectureDay(mapDayToServerFormat(selectedDay));
    // setLectureRoom(mapRoomToServerFormat(selectedRoom));
    // setLectureTime(mapTimeToServerFormat(selectedTime));
    const data = {
      name: lectureName,
      day: lectureDay,
      time: time,
      room: room,
      teacher: lectureTeacher,
    };
    console.log("not api: ", data);
    try {
      await addLecture(data);
      console.log("Lecture added successfully!");
    } catch (error) {
      console.error("Error fetching lecture data:", error);
    }
  };

  const handleDayDropdownChange = (e) => {
    const selectedOption = e.target.value;
    console.log("Selected Day:", selectedOption);
    mapDayToServerFormat(selectedOption);
  };

  const handleTimeDropdownChange = (e) => {
    const selectedOption = e.target.value;
    console.log("Selected Time:", selectedOption);
    mapTimeToServerFormat(selectedOption);
  };

  const handleRoomDropdownChange = (e) => {
    const selectedOption = e.target.value;
    console.log("Selected Room:", selectedOption);
    mapRoomToServerFormat(selectedOption);
  };

  const handleTeacherChange = (e) => {
    setLectureTeacher(e.target.value);
  };

  const mapDayToServerFormat = (day) => {
    console.log(day);
    switch (day) {
      case "월요일":
        setLectureDay("MONDAY");
        break;
      case "화요일":
        setLectureDay("TUESDAY");
        break;
      case "수요일":
        setLectureDay("WEDNESDAY");
        break;
      case "목요일":
        setLectureDay("THURSDAY");
        break;
      case "금요일":
        setLectureDay("FRIDAY");
        break;
      case "토요일":
        setLectureDay("SATURDAY")
        break;
      case "일요일":
        setLectureDay("SUNDAY");
      default:
        return "";
    }
  };

  const mapRoomToServerFormat = (room) => {
    switch (room) {
      case "601호":
        setLectureRoom("R1");
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
        {/* <Form onSubmit={postLecture}>
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
          시간{" "}
          <select onChange={handleTimeDropdownChange}>
            <option value={selectedTime} disabled>
              시간 선택
            </option>
            <option value="12:40-2:10">12:40-2:10</option>
            <option value="2:15-3:45">2:15-3:45</option>
            <option value="3:45-5:20">3:45-5:20</option>
            <option value="5:25-6:55">5:25-6:55</option>
            <option value="7:00-8:30">7:00-8:30</option>
            <option value="8:35-10:05">8:35-10:05</option>
          </select>
          강의실{" "}
          <select onChange={handleRoomDropdownChange}>
            <option value={selectedRoom} disabled>
              강의실 선택
            </option>
            <option value="601호">601호</option>
            <option value="602호">602호</option>
            <option value="603호">603호</option>
            <option value="509호">509호</option>
            <option value="510호">510호</option>
            <option value="511호">511호</option>
          </select>
          강의자{" "}
          <input
            type="text"
            value={lectureTeacher}
            onChange={handleTeacherChange}
          ></input>
          <button type="submit"> 강의 생성하기 </button>
        </Form> */}
        {/* <button onClick={viewAllLecture}> 강의 보기 </button> */}
        <TableContainer>
          <h1>수업 정보</h1>
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
