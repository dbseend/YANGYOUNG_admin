import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getOneLecture } from "../../api/LectureApi";

const WebLectureDetail = () => {
  const { id } = useParams();
  const [lectureOneInfo, setLectureOneInfo] = useState([]);

  useEffect(() => {
    const fetchLectureDetail = async () => {
      try {
        const response = await getOneLecture(id);
        console.log(response);
        setLectureOneInfo(response.data);
        console.log(lectureOneInfo);
      } catch (error) {
        console.log("분반 상세 정보 가져오는 중 오류 발생: ", error);
      }
    };
    fetchLectureDetail();
  }, [id]);

  return (
    <Div>
      <Title>상세 정보</Title>
      <Guide1>수업 정보</Guide1>
      <Table>
        <tbody>
          <tr>
            <th>수업명</th>
            <td>{lectureOneInfo.name}</td>
            <th>선생님</th>
            <td>{lectureOneInfo.teacher}</td>
          </tr>
          <tr>
            <th>요일</th>
            <td>{lectureOneInfo.day}</td>
            <th>시간</th>
            <td>{lectureOneInfo.time}</td>
          </tr>
          <tr>
            <th>강의실</th>
            <td>{lectureOneInfo.room}</td>
            <th>수업코드</th>
            <td>{lectureOneInfo.id}</td>
          </tr>
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

export default WebLectureDetail;
