import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getOneSection } from "../../api/SectionAPI";

const WebSectionDetail = () => {
  const { id } = useParams();
  const [sectionOneInfo, setSectionOneInfo] = useState([]);
  const [sectionLectureCount] = useState(0);
  const [lectureInfo, setLectureInfo] = useState([]);

  useEffect(() => {
    const fetchStudentDetail = async () => {
      try {
        const response = await getOneSection(id);
        console.log(response.data);
        setSectionOneInfo(response.data.sectionResponse);
        // setSectionLectureInfo(response.data.lectureGetAllResponse);
      } catch (error) {
        console.log("학생 상세 정보 가져오는 중 오류 발생: ", error);
      }
    };
    fetchStudentDetail();
  }, [id]);

  return (
    <Div>
      <Title>상세 정보</Title>
      <Guide1>분반 정보</Guide1>
      <Table>
        <tbody>
          <tr>
            <th>분반명</th>
            <td>{sectionOneInfo.name}</td>
            <th>담임</th>
            <td>{sectionOneInfo.teacher}</td>
            <th>id</th>
            <td>{sectionOneInfo.id}</td>
          </tr>
        </tbody>
      </Table>

      <Guide2>수강 정보</Guide2>
      <p>
        {sectionOneInfo.name} 분반에는 총 {sectionLectureCount}개의 수업이
        배정되어 있습니다.
      </p>
      <Table>
        <thead>
          <tr>
            <th>강의명</th>
            <th>요일</th>
            <th>시간</th>
            <th>강의실</th>
          </tr>
        </thead>
        <tbody>
          {lectureInfo.map((lecture) => (
            <tr key={lecture.id}>
              <td>{lecture.name}</td>
              <td>{lecture.day}</td>
              <td>{lecture.time}</td>
              <td>{lecture.room}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Div>
  );
};

const Div = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  overflow: auto;
  margin-top: 100px;
  margin-left: 12.5%;
  margin-right: 12.5%;
`;

const Title = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Guide1 = styled.h3`
  margin-top: 20px;
`;

const Guide2 = styled.h3`
  margin-top: 40px;
`;

const Table = styled.table`
  width: 50%;
  border-collapse: collapse;

  th {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: center;
    background-color: #f2f2f2;
    width: 15%;
  }

  td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: center;
  }
`;

export default WebSectionDetail;
