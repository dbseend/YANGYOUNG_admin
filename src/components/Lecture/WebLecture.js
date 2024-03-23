import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { viewLecture, deleteLecture } from "../../api/LectureApi";
import AddLectureModal from "./AddLectureModal";
import { Button, StyledButtonContainer } from "../Student/WebStudentList";

const columns = [
  { key: "index", label: "순번" },
  { key: "name", label: "수업명" },
  { key: "dayList/dateList", label: "요일/날짜" },
  { key: "time", label: "시간" },
  { key: "lectureRoom", label: "강의실" },
  { key: "teacher", label: "선생님" },
  { key: "check", label: "선택" },
];

const Lecture = () => {
  const [lectureList, setLectureList] = useState([]);
  const [lectureCount, setLectureCount] = useState(0);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedLectures, setSelectedLectures] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await viewLecture();
        const { lectureResponseList, lectureCount } = response;
        setLectureList(lectureResponseList);
        setLectureCount(lectureCount);
      } catch (error) {
        console.error("Error fetching lecture data:", error);
      }
    }
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleRowClick = (lectureId) => {
    moveToLectureDetail(lectureId);
  };
  const moveToLectureDetail = (lectureId) => {
    navigate(`/lecture/${lectureId}`);
  };

  // 체크박스 리스트 전체 선택 및 해제
  const handleAllCheckboxChange = () => {
    if (selectedLectures.length === lectureList.length) {
      setSelectedLectures([]);
    }
    if (selectedLectures.length !== lectureList.length) {
      setSelectedLectures(lectureList.map((student) => student.id));
    }
  };

  // 체크박스 선택 시 학생 목록에 추가/제거
  const handleCheckboxChange = (lectureId) => {
    setSelectedLectures((prevSelected) => {
      if (prevSelected.includes(lectureId)) {
        return prevSelected.filter((id) => id !== lectureId);
      } else {
        return [...prevSelected, lectureId];
      }
    });
  };

  const handleDeleteSelectedLectures = async () => {
    console.log("Delete selected lectures:", selectedLectures);
    try {
      // Promise.all로 여러개의 section을 삭제
      selectedLectures.map(async (lectureId) => {
        console.log("Delete lectureId: ", lectureId);
        console.log(typeof lectureId);
        await deleteLecture(lectureId);
      });

      setSelectedLectures([]);
      alert("선택한 수업이 삭제되었습니다.");
      window.location.reload(true);
    } catch (error) {
      console.error("수업 삭제 중 오류 발생", error);
    }
    console.log("Delete selected lectures:", selectedLectures);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const handleAddLecture = (response) => {
    console.log("새 수업 정보: ", response);
  };

  return (
    <>
      <GlobalStyle />
      <Div>
        <TableContainer>
          <h1>수업 정보</h1>
          <p> 개설 수업 수: {lectureCount}</p>
          <StyledButtonContainer>
            <Button onClick={openAddModal}>등록</Button>
            {isAddModalOpen && (
              <AddLectureModal
                onClose={closeAddModal}
                onAdd={handleAddLecture}
              />
            )}

            <Button onClick={handleDeleteSelectedLectures}>삭제</Button>
          </StyledButtonContainer>

          <StyledTable>
            <thead>
              <tr>
                {columns.map((column) => (
                  <React.Fragment key={column.key}>
                    {column.key === "check" ? (
                      <StyledTh>
                        <input
                          type="checkbox"
                          checked={
                            selectedLectures.length === lectureList.length
                          }
                          onClick={handleAllCheckboxChange}
                        />
                      </StyledTh>
                    ) : (
                      <StyledTh>{column.label}</StyledTh>
                    )}
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {lectureList &&
                lectureList.map((lecture, index) => (
                  <StyledTr key={index}>
                    {columns &&
                      columns.map((column) => (
                        <StyledTd
                          key={column.key}
                          onClick={
                            column.key === "check"
                              ? null
                              : () => moveToLectureDetail(lecture.id)
                          }
                        >
                          {column.key === "index" ? index + 1 : ""}
                          {column.key === "name" ? lecture.name : ""}
                          {column.key === "dayList/dateList"
                            ? lecture.dayList.length > 0
                              ? lecture.dayList.join(", ")
                              : lecture.dateList.length > 0
                              ? lecture.dateList.join(", ")
                              : ""
                            : ""}

                          {column.key === "time"
                            ? `${lecture.startTime.slice(
                                0,
                                5
                              )}-${lecture.endTime.slice(0, 5)}`
                            : ""}
                          {column.key === "homrRoom" ? lecture.homeRoom : ""}
                          {column.key === "lectureRoom"
                            ? lecture.lectureRoom
                            : ""}
                          {column.key === "teacher" ? lecture.teacher : ""}
                          {column.key === "check" ? (
                            <input
                              type="checkbox"
                              checked={selectedLectures.includes(lecture.id)}
                              onChange={() => handleCheckboxChange(lecture.id)}
                            />
                          ) : (
                            ""
                          )}
                        </StyledTd>
                      ))}
                  </StyledTr>
                ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      </Div>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  margin-top: 60px;
  align-items: center;
  /* background-color: aliceblue; */
`;

const TableContainer = styled.div`
  width: 90%;
  /* margin: 20px; */
  margin-bottom: 200px;
`;
const StyledTable = styled.table`
  border-collapse: collapse;
  margin-top: 20px;
  width: 90%;
  /* width: 80%; */
`;

const StyledTh = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  background-color: #dfdfdf;
`;

const StyledTd = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  align-items: center;
`;

const StyledTr = styled.tr`
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
export default Lecture;
