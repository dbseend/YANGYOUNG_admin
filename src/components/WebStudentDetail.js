import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getStudentInfo } from "../api/StudentApi";
import { IoMdColorWand, IoIosTrash } from "react-icons/io";
const WebStudentDetail = () => {
  const { id } = useParams();
  const [studentPersonalInfo, setStudentPersonalInfo] = useState({});
  const [lectureInfo, setLectureInfo] = useState([]);
  const [taskInfo, setTaskInfo] = useState([]);
  const [lectureCount, setLectureCount] = useState(0);

  useEffect(() => {
    const fetchStudentDetail = async () => {
      try {
        const response = await getStudentInfo(id);
        setStudentPersonalInfo(response.studentResponse);
        setLectureInfo(
          response.lectureGetAllResponse.lectureGetOneResponseList
        );
        setTaskInfo(response.taskGetAllResponse.taskGetOneResponseList);
        setLectureCount(response.lectureGetAllResponse.count);
      } catch (error) {
        console.log("학생 상세 정보 가져오는 중 오류 발생: ", error);
      }
    };
    fetchStudentDetail();
  }, [id]);

  return (
    <div>
      <h2>상세 정보</h2>
      <IconDiv>
        <StyledColorWandIcon size={30} />
        <StyledTrashIcon size={30} />
      </IconDiv>
      {/* 학생 개인 정보 */}
      <h3>학생 인적 사항</h3>
      <p>이름: {studentPersonalInfo.name}</p>
      <p>학번: {studentPersonalInfo.id}</p>
      <p>학교: {studentPersonalInfo.school}</p>
      <p>학년: {studentPersonalInfo.grade}</p>
      <p>연락처: {studentPersonalInfo.phoneNumber}</p>
      <p>반: {studentPersonalInfo.sectionName}</p>
      <h3>수강 정보</h3>
      <p>총 강의 수: {lectureCount}</p> {/* 강의 수 출력 */}
      <ul>
        {lectureInfo.map((lecture) => (
          <li key={lecture.id}>
            <p>강의명: {lecture.name}</p>
            <p>요일: {lecture.day}</p>
            <p>시간: {lecture.time}</p>
            <p>강의실: {lecture.room}</p>
          </li>
        ))}
      </ul>
      {/* 과제 정보 */}
      {/* <h3>과제 정보</h3>
      <ul>
        {taskInfo.map((task) => (
          <li key={task.id}>
            <p>과제: {task.assignment}</p>
            <p>진행 상태: {task.taskProgress}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

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

const StyledColorWandIcon = styled(IoMdColorWand)`
  cursor: pointer;
`;

const StyledTrashIcon = styled(IoIosTrash)`
  cursor: pointer;
`;

export default WebStudentDetail;
