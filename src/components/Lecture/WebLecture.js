import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { viewLecture, deleteLecture } from "../../api/LectureApi";
import AddLectureModal from "./AddLectureModal";
import { Button, StyledButtonContainer } from "../Student/WebStudentList";

const columns = [
  { key: "index", label: "순번" },
  { key: "name", label: "반 이름" },
  { key: "dayList", label: "요일" },
  { key: "time", label: "시간" }, // 시작 시간과 마치는 시간 합쳐서 표시
  { key: "room", label: "강의실" },
  { key: "teacher", label: "선생님" },
  { key: "id", label: "수업코드" },
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
        const { lectureResponseList, count } = response;
        setLectureList(lectureResponseList);
        setLectureCount(count);
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

  const handleCheckboxChange = (lectureId) => {
    // Toggle the selection state of the lecture
    setSelectedLectures((prevSelectedLectures) => {
      if (prevSelectedLectures.includes(lectureId)) {
        return prevSelectedLectures.filter((id) => id !== lectureId);
      } else {
        return [...prevSelectedLectures, lectureId];
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
                {columns &&
                  columns.map((column) => (
                    <StyledTh key={column.key}>{column.label}</StyledTh>
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
                          onClick={() => moveToLectureDetail(lecture.id)}
                          key={column.key}
                        >
                          {column.key === "index"
                            ? index + 1
                            : column.key === "dayList"
                            ? lecture.dayList.join(", ")
                            : column.key === "time"
                            ? `${lecture.startTime}-${lecture.endTime}`
                            : lecture[column.key]}
                        </StyledTd>
                      ))}
                    <StyledTd>
                      <input
                        type="checkbox"
                        checked={selectedLectures.includes(lecture.id)}
                        onChange={() => handleCheckboxChange(lecture.id)}
                      />
                    </StyledTd>
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
  margin-left: 5%;
  margin-right: 5%;
`;

const TableContainer = styled.div`
  margin: 20px;
  width: 59%;
  margin-bottom: 200px;
`;
const StyledTable = styled.table`
  border-collapse: collapse;
  margin-top: 20px;
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
