import React, { createContext, useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
  deleteLectureAPI,
  getAllLectureAPI,
  updateLectureOrderAPI,
} from "../../api/LectureAPI";
import { Button, StyledButtonContainer } from "../Student/StudentList";
import AddLectureModal from "./AddLectureModal";
import LectureList from "./LectureList.js";

export const DataContext = createContext();

const Lecture = () => {
  const [lectureCount, setLectureCount] = useState(0);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [lectureList, setLectureList] = useState([]);
  const [selectedLectureList, setSelectedLectureList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAllLectureAPI();
        const { lectureResponseList, lectureCount } = response;
        setLectureList(lectureResponseList);
        setLectureCount(lectureCount);
      } catch (error) {
        console.error("Error fetching lecture data:", error);
      }
    }
    fetchData();
  }, []);

  // 수업 순서 변경 저장
  const handleSaveLectureOrder = async () => {
    console.log("Save lecture order:", lectureList);
    const lectureSeqList = lectureList.map((lecture) => ({
      id: lecture.id,
      lectureSeq: lecture.lectureSeq,
    }));
    const lectureSeqUpdateRequest = { lectureSeqList };
    console.log("lectureSeqUpdateRequest: ", lectureSeqUpdateRequest);
    try {
      await updateLectureOrderAPI(lectureSeqUpdateRequest);
      alert("수업 순서가 저장되었습니다.");
      // window.location.reload(true);
    } catch (error) {
      console.error("수업 순서 저장 중 오류 발생", error);
    }
  };

  // 선택한 수업 삭제
  const handleDeleteSelectedLectures = async () => {
    console.log("Delete selected lectures:", selectedLectureList);
    try {
      // Promise.all로 여러개의 section을 삭제
      selectedLectureList.map(async (lectureId) => {
        console.log("Delete lectureId: ", lectureId);
        console.log(typeof lectureId);
        await deleteLectureAPI(lectureId);
      });

      setSelectedLectureList([]);
      alert("선택한 수업이 삭제되었습니다.");
      window.location.reload(true);
    } catch (error) {
      console.error("수업 삭제 중 오류 발생", error);
    }
    console.log("Delete selected lectures:", selectedLectureList);
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
            <Button onClick={handleSaveLectureOrder}>순서 저장</Button>
          </StyledButtonContainer>

          <DataContext.Provider
            value={{
              lectureList,
              setLectureList,
              selectedLectureList,
              setSelectedLectureList,
            }}
          >
            <LectureList />
          </DataContext.Provider>
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

export { StyledTable, StyledTd, StyledTh, StyledTr, TableContainer };
export default Lecture;
