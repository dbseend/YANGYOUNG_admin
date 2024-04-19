import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getLectureAPI, updateLectureAPI } from "../../api/LectureAPI";
import {
  ListTable,
  ListTd,
  ListTh,
  ListTr,
  SubTitle,
  Title,
  Button,
  RowDiv,
} from "../../styles/CommonStyles";

const WebLectureDetail = () => {
  const { id } = useParams();
  const [lectureOneInfo, setLectureOneInfo] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [updateLectureData, setUpdateLectureData] = useState({});

  const daysOfWeek = [
    { key: "월요일", label: "월" },
    { key: "화요일", label: "화" },
    { key: "수요일", label: "수" },
    { key: "목요일", label: "목" },
    { key: "금요일", label: "금" },
    { key: "토요일", label: "토" },
    { key: "일요일", label: "일" },
  ];

  useEffect(() => {
    const fetchLectureDetail = async () => {
      try {
        const response = await getLectureAPI(id);
        console.log(response);
        setLectureOneInfo(response.data);
        setUpdateLectureData(response.data);
      } catch (error) {
        console.log("분반 상세 정보 가져오는 중 오류 발생: ", error);
      }
    };
    fetchLectureDetail();
  }, [id]);

  const updateLecture = async () => {
    try {
      const response = await updateLectureAPI(updateLectureData);
      console.log(response);
      alert("수업 정보가 수정되었습니다.");
      window.location.reload(true);
    } catch (error) {
      console.error("수업 정보 수정 중 오류 발생: ", error);
    }
  };

  const handleInputChange = (e, type) => {
    //type이 dateList라면 배열이 아닌 문자열로 저장
    if (type === "dateList") {
      setUpdateLectureData({
        ...updateLectureData,
        [type]: e.target.value.split(","),
      });
    } else {
      setUpdateLectureData({
        ...updateLectureData,
        [type]: e.target.value,
      });
    }
  };

  const handleDayListChange = (day, type) => {
    if (updateLectureData.dayList.includes(day)) {
      setUpdateLectureData({
        ...updateLectureData,
        dayList: updateLectureData.dayList.filter((item) => item !== day),
      });
    } else {
      setUpdateLectureData({
        ...updateLectureData,
        dayList: [...updateLectureData.dayList, day],
      });
    }
  };

  const handleEditModeChange = () => {
    setIsEditMode(!isEditMode);

    if (!isEditMode) {
      setUpdateLectureData(lectureOneInfo);
    }
  };

  return (
    <Div>
      <Title>상세 정보</Title>
      <SubTitle>수업 정보</SubTitle>
      <RowDiv style={{ gap: "20px" }}>
        <Button onClick={handleEditModeChange}>
          {isEditMode ? "취소" : "수정"}
        </Button>
        {isEditMode && <Button onClick={updateLecture}>저장</Button>}
      </RowDiv>
      <ListTable>
        <tbody>
          <ListTr>
            <ListTh>수업명</ListTh>
            {isEditMode ? (
              <ListTd>
                <input
                  type="text"
                  onChange={(e) => handleInputChange(e, "name")}
                  defaultValue={updateLectureData.name}
                />
              </ListTd>
            ) : (
              <ListTd>{lectureOneInfo ? lectureOneInfo.name : "-"}</ListTd>
            )}
            <ListTh>선생님</ListTh>
            {isEditMode ? (
              <ListTd>
                <input
                  type="text"
                  onChange={(e) => handleInputChange(e, "teacher")}
                  defaultValue={updateLectureData.teacher}
                />
              </ListTd>
            ) : (
              <ListTd>{lectureOneInfo ? lectureOneInfo.teacher : "-"}</ListTd>
            )}
          </ListTr>
          <ListTr>
            <ListTh>요일</ListTh>
            {isEditMode ? (
              <ListTd>
                <div>
                  <div>
                    {daysOfWeek.map((day) => (
                      <DayButton
                        style={{ marginRight: "10px" }}
                        defaultValue={day.key}
                        key={day.key}
                        selected={updateLectureData.dayList.includes(day.key)}
                        onClick={() => handleDayListChange(day.key, "dayList")}
                      >
                        {day.label}
                      </DayButton>
                    ))}
                  </div>
                </div>
              </ListTd>
            ) : (
              <ListTd>
                {lectureOneInfo && lectureOneInfo.dayList
                  ? lectureOneInfo.dayList.join(", ")
                  : "-"}
              </ListTd>
            )}
            <ListTh>날짜</ListTh>
            {isEditMode ? (
              <ListTd>
                <input
                  type="date"
                  defaultValue={
                    lectureOneInfo && lectureOneInfo.dateList
                      ? lectureOneInfo.dateList.join(", ")
                      : "-"
                  }
                  onChange={(e) => handleInputChange(e, "dateList")}
                />
              </ListTd>
            ) : (
              <ListTd>
                {lectureOneInfo && lectureOneInfo.dateList
                  ? lectureOneInfo.dateList.join(", ")
                  : "-"}
              </ListTd>
            )}
          </ListTr>
          <ListTr>
            <ListTh>강의실</ListTh>
            {isEditMode ? (
              <ListTd>
                <input
                  type="text"
                  onChange={(e) => handleInputChange(e, "lectureRoom")}
                  defaultValue={updateLectureData.lectureRoom}
                />
              </ListTd>
            ) : (
              <ListTd>
                {lectureOneInfo ? lectureOneInfo.lectureRoom : "-"}
              </ListTd>
            )}
            <ListTh>시간</ListTh>
            {isEditMode ? (
              <ListTd>
                <input
                  type="time"
                  defaultValue={updateLectureData.startTime}
                  onChange={(e) => {
                    handleInputChange(e, "startTime");
                  }}
                />
                {" ~ "}
                <input
                  type="time"
                  defaultValue={updateLectureData.endTime}
                  onChange={(e) => {
                    handleInputChange(e, "endTime");
                  }}
                />
              </ListTd>
            ) : (
              <ListTd>
                {lectureOneInfo
                  ? `${lectureOneInfo.startTime.slice(
                      0,
                      5
                    )}-${lectureOneInfo.endTime.slice(0, 5)}`
                  : "-"}
              </ListTd>
            )}
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
          lectureOneInfo.sectionNameList &&
          lectureOneInfo.sectionNameList.length > 0 ? (
            lectureOneInfo.sectionNameList.map((section, index) => (
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

const DayButton = styled.button`
  border: 1px solid #ccc;
  cursor: pointer;
  background: ${({ selected }) => (selected ? "#eee" : "white")};
`;

export default WebLectureDetail;
