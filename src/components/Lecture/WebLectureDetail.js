import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getOneLecture } from "../../api/LectureApi";

const lectures = [
  { key: "name", label: "수업명" },
  { key: "teacher", label: "선생님" },
  { key: "dayList", label: "요일" },
  { key: "time", label: "시간" },
  { key: "room", label: "강의실" },
  { key: "id", label: "수업코드" },
];

const WebLectureDetail = () => {
  const { id } = useParams();
  const [lectureOneInfo, setLectureOneInfo] = useState(null); // Changed [] to null

  useEffect(() => {
    const fetchLectureDetail = async () => {
      try {
        const response = await getOneLecture(id);
        console.log(response);
        setLectureOneInfo(response.data);
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
            <th>{lectures[0].label}</th>
            <td>{lectureOneInfo ? lectureOneInfo[lectures[0].key] : "-"}</td>
            <th>{lectures[1].label}</th>
            <td>{lectureOneInfo ? lectureOneInfo[lectures[1].key] : "-"}</td>
          </tr>
          <tr>
            <th>{lectures[2].label}</th>
            <td colSpan="3">
              {lectureOneInfo
                ? lectureOneInfo[lectures[2].key].join(", ")
                : "-"}
            </td>
          </tr>
          <tr>
            <th>{lectures[3].label}</th>
            <td colSpan="3">
              {lectureOneInfo
                ? `${lectureOneInfo.startTime.slice(
                    0,
                    5
                  )}-${lectureOneInfo.endTime.slice(0, 5)}`
                : "-"}
            </td>
          </tr>
          <tr>
            <th>{lectures[4].label}</th>
            <td>{lectureOneInfo ? lectureOneInfo[lectures[4].key] : "-"}</td>
            <th>{lectures[5].label}</th>
            <td>{lectureOneInfo ? lectureOneInfo[lectures[5].key] : "-"}</td>
          </tr>
        </tbody>
      </Table>

      {/* </Table> */}
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
