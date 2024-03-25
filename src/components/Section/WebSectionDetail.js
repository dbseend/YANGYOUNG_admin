import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getOneSectionAPI, updateSectionInfoAPI } from "../../api/SectionAPI";
import {
  ListTable,
  ListTd,
  ListTh,
  ListTr,
  SubTitle,
  Button,
  RowDiv,
} from "../../styles/CommonStyles";
import WebSectionTask from "./WebSectionTask";
import WebSectionStudentList from "../Section/WebSectionStudentList";
const lectures = [
  { key: "name", label: "강의명" },
  { key: "dayList", label: "요일" },
  { key: "time", label: "시간" },
  { key: "teacher", label: "선생님" },
  { key: "lectureRoom", label: "강의실" },
];

const students = [
  { key: "name", label: "이름" },
  { key: "school", label: "학교" },
  { key: "grade", label: "학년" },
];

const WebSectionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);

  const [updateData, setUpdateData] = useState({
    sectionId: parseInt(id),
    name: "",
    teacher: "",
    homeRoom: "",
  });

  const [sectionInfo, setSectionInfo] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [studentCount, setStudentCount] = useState(0);
  const [lectureCount, setLectureCount] = useState(0);
  const [lectureList, setLectureList] = useState([]);

  // 분반 정보 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOneSectionAPI(id);
        console.log(response);
        setStudentList(response.studentAllResponse.studentResponseList); // 학생 목록
        setStudentCount(response.studentAllResponse.size); // 학생 수
        setLectureCount(response.lectureAllResponse.count); // 수업 개수
        setLectureList(response.lectureAllResponse.lectureResponseList); // 수업 목록
        setSectionInfo(response.sectionResponse); // 반 목록

        setUpdateData({
          sectionId: id,
          name: response.sectionResponse.name,
          teacher: response.sectionResponse.teacher,
          homeRoom: response.sectionResponse.homrRoom,
        });
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
      setIsEdit(false);
    };

    fetchData();
  }, [id]);

  const updateSection = async () => {
    const data = {
      sectionId: parseInt(id),
      name: updateData.name,
      teacher: updateData.teacher,
      homeRoom: updateData.homeRoom,
    };

    try {
      const response = await updateSectionInfoAPI(data);
      console.log(response);
      alert("수정되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error("Error fetching student data:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  const moveToStudentDetail = (studentId) => {
    navigate(`/student/${studentId}`);
  };

  const handleChangeIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleChangeInput = (e, type) => {
    console.log(e.target.value, type);
    if (type === "name") {
      setUpdateData({ ...updateData, name: e.target.value });
    }
    if (type === "teacher") {
      setUpdateData({ ...updateData, teacher: e.target.value });
    }
    if (type === "homeRoom") {
      setUpdateData({ ...updateData, homeRoom: e.target.value });
    }
  };

  const addStudentToSection = () => {};
  return (
    <Div>
      <Title>상세 정보</Title>
      {/* 분반 정보 */}
      <SubTitle>분반 정보</SubTitle>
      {isEdit ? (
        <RowDiv>
          <Button
            onClick={updateSection}
            style={{ marginRight: 10, marginBottom: 10 }}
          >
            저장
          </Button>
          <Button onClick={handleChangeIsEdit} style={{ marginBottom: 10 }}>
            취소
          </Button>
        </RowDiv>
      ) : (
        <>
          <Button onClick={handleChangeIsEdit} style={{ marginBottom: 10 }}>
            수정
          </Button>
        </>
      )}

      <ListTable>
        <tbody>
          <ListTr>
            <ListTh>분반명</ListTh>
            <ListTd>
              {isEdit ? (
                <input
                  value={updateData.name}
                  onChange={(e) => handleChangeInput(e, "name")}
                />
              ) : (
                sectionInfo.name
              )}
            </ListTd>
            <ListTh>담임</ListTh>
            <ListTd>
              {isEdit ? (
                <input
                  value={updateData.teacher}
                  onChange={(e) => handleChangeInput(e, "teacher")}
                />
              ) : (
                sectionInfo.teacher
              )}
            </ListTd>
            <ListTh>홈룸</ListTh>
            <ListTd>
              {isEdit ? (
                <input
                  value={updateData.homeRoom}
                  onChange={(e) => handleChangeInput(e, "homeRoom")}
                />
              ) : (
                sectionInfo.homeRoom
              )}
            </ListTd>
          </ListTr>
        </tbody>
      </ListTable>

      {/* 수강 정보 */}
      <SubTitle>수강 정보</SubTitle>
      <p>
        {sectionInfo.name} 분반에는 총 {lectureCount}개의 수업이 배정되어
        있습니다.
      </p>
      <ListTable>
        <thead>
          <ListTr>
            {lectures &&
              lectures.map((lecture) => (
                <ListTh key={lecture.key}>{lecture.label}</ListTh>
              ))}
          </ListTr>
        </thead>
        <tbody>
          {lectureList &&
            lectureList.map((lecture, index) => (
              <ListTr key={index}>
                {lectures.map((col) => (
                  <ListTd key={col.key}>
                    {col.key === "index"
                      ? index + 1
                      : col.key === "dayList"
                      ? lecture.dayList.join(", ")
                      : col.key === "time"
                      ? `${lecture.startTime.slice(
                          0,
                          5
                        )}-${lecture.endTime.slice(0, 5)}`
                      : lecture[col.key]}
                  </ListTd>
                ))}
              </ListTr>
            ))}
        </tbody>
      </ListTable>

      <WebSectionTask />
      <WebSectionStudentList />
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
  margin-bottom: 200px;
`;

const Title = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Pointer = styled.td`
  cursor: pointer;
`;

export default WebSectionDetail;
