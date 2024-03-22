import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  ListTable,
  ListTd,
  ListTh,
  ListTr,
  Title,
  SubTitle,
} from "../../styles/CommonStyles";
import { useParams } from "react-router-dom";
import { getOneLecture } from "../../api/LectureApi";

const lectures = [
  { key: "name", label: "수업명" },
  { key: "teacher", label: "선생님" },
  { key: "dayList", label: "요일" },
  { key: "dateList", label: "날짜" },
  { key: "time", label: "시간" },
  { key: "homeRoom", label: "홈룸" },
  { key: "lectureRoom", label: "강의실" },
];

const WebLectureDetail = () => {
  const { id } = useParams();
  const [lectureOneInfo, setLectureOneInfo] = useState(null);

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
      <SubTitle>수업 정보</SubTitle>
      <ListTable>
        <tbody>
          <ListTr>
            <ListTh>수업명</ListTh>
            <ListTd>{lectureOneInfo ? lectureOneInfo.name : "-"}</ListTd>
            <ListTh>선생님</ListTh>
            <ListTd>{lectureOneInfo ? lectureOneInfo.teacher : "-"}</ListTd>
          </ListTr>
          <ListTr>
            <ListTh>요일</ListTh>
            <ListTd>
              {lectureOneInfo && lectureOneInfo.dayList
                ? lectureOneInfo.dayList.join(", ")
                : "-"}
            </ListTd>{" "}
            <ListTh>날짜</ListTh>
            <ListTd>
              {lectureOneInfo && lectureOneInfo.dateList
                ? lectureOneInfo.dateList.join(", ")
                : "-"}
            </ListTd>
          </ListTr>
          <ListTr>
            <ListTh>강의실</ListTh>
            <ListTd>{lectureOneInfo ? lectureOneInfo.lectureRoom : "-"}</ListTd>
            <ListTh>시간</ListTh>
            <ListTd>
              {lectureOneInfo
                ? `${lectureOneInfo.startTime.slice(
                    0,
                    5
                  )}-${lectureOneInfo.endTime.slice(0, 5)}`
                : "-"}
            </ListTd>
          </ListTr>
        </tbody>
      </ListTable>

      <SubTitle>수강중인 분반</SubTitle>
      <ListTable>
        <tbody>
          <ListTr>
            <ListTh>분반명</ListTh>
          </ListTr>
          {lectureOneInfo &&
          lectureOneInfo.sectionName &&
          lectureOneInfo.sectionName.length > 0 ? (
            lectureOneInfo.sectionName.map((section, index) => (
              <ListTr key={index}>
                <ListTd>{section}</ListTd>
              </ListTr>
            ))
          ) : (
            <ListTr>
              <ListTd>수강중인 분반이 없습니다.</ListTd>
            </ListTr>
          )}
        </tbody>
      </ListTable>
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

const Guide1 = styled.h3`
  margin-top: 20px;
`;

const Table = styled.table`
  width: 80%;
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
