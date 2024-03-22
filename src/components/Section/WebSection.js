import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { viewSection, deleteSection } from "../../api/SectionAPI";
import AddSectionModal from "./AddSectionModal";
import { Button, StyledButtonContainer } from "../Student/WebStudentList";

const columns = [
  { key: "index", label: "순번" },
  { key: "name", label: "반 이름" },
  { key: "teacher", label: "담임" },
  // { key: "id", label: "분반코드" },
  { key: "check", label: "선택" },
];

const Section = () => {
  const [sectionList, setSectionList] = useState([]);
  const [sectionCount, setSectionCount] = useState(0);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedSections, setSelectedSections] = useState([]);

  const navigate = useNavigate();

  const handleRowClick = (sectionId) => {
    moveToSectionDetail(sectionId);
  };

  const moveToSectionDetail = (sectionId) => {
    navigate(`/section/${sectionId}`);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await viewSection();
        const { sectionResponseList, size } = response;
        console.log("sectionResponseList: ", sectionResponseList);
        console.log("size: ", size);
        setSectionList(sectionResponseList);
        setSectionCount(size);
      } catch (error) {
        console.error("Error fetching lecture data:", error);
      }
    }
    fetchData();
  }, []);

  // const handleCheckboxChange = (sectionId) => {
  //   // Toggle the selection state of the lecture
  //   setSelectedSections((prevSelectedSections) => {
  //     if (prevSelectedSections.includes(sectionId)) {
  //       return prevSelectedSections.filter((id) => id !== sectionId);
  //     } else {
  //       return [...prevSelectedSections, sectionId];
  //     }
  //   });
  // };

  // 체크박스 리스트 전체 선택 및 해제
  const handleAllCheckboxChange = () => {
    if (selectedSections.length === sectionList.length) {
      setSelectedSections([]);
    }
    if (selectedSections.length !== sectionList.length) {
      setSelectedSections(sectionList.map((student) => student.id));
    }
  };

  // 체크박스 선택 시 학생 목록에 추가/제거
  const handleCheckboxChange = (sectionId) => {
    setSelectedSections((prevSelected) => {
      if (prevSelected.includes(sectionId)) {
        return prevSelected.filter((id) => id !== sectionId);
      } else {
        return [...prevSelected, sectionId];
      }
    });
  };

  const handleDeleteSelectedSections = async () => {
    console.log("Delete selected sections:", selectedSections);
    try {
      // Promise.all로 여러개의 section을 삭제
      selectedSections.map(async (sectionId) => {
        console.log("Delete sectionId: ", sectionId);
        console.log(typeof sectionId);
        await deleteSection(sectionId);
      });

      setSelectedSections([]);
      alert("선택한 분반이 삭제되었습니다.");
      window.location.reload(true);
    } catch (error) {
      console.error("분반 삭제 중 오류 발생", error);
    }
    console.log("Delete selected lectures:", selectedSections);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const handleAddSection = (response) => {
    console.log("새 분반 정보: ", response);
  };
  return (
    <>
      <GlobalStyle />
      <Div>
        <TableContainer>
          <h1>분반 정보</h1>
          <p> 개설 분반 수: {sectionCount}</p>
          <StyledButtonContainer>
            <Button onClick={openAddModal}>등록</Button>
            {isAddModalOpen && (
              <AddSectionModal
                onClose={closeAddModal}
                onAdd={handleAddSection}
              />
            )}

            <Button onClick={handleDeleteSelectedSections}>삭제</Button>
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
                            selectedSections.length === sectionList.length
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
              {sectionList.map((section, index) => (
                <StyledTr key={index}>
                  {columns.map((column) => (
                    <StyledTd
                      key={column.key}
                      onClick={
                        column.key === "check"
                          ? null
                          : () => moveToSectionDetail(section.id)
                      }
                    >
                      {column.key === "index" ? index + 1 : ""}
                      {column.key === "name" ? section.name : ""}
                      {column.key === "teacher" ? section.teacher : ""}
                      {column.key === "check" ? (
                        <input
                          type="checkbox"
                          checked={selectedSections.includes(section.id)}
                          onChange={() => handleCheckboxChange(section.id)}
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
  margin-left: 5%;
  margin-right: 5%;
  /* align-items: flex-start; */
`;

const TableContainer = styled.div`
  margin: 20px;
  width: 70%;
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
  @media screen and (min-width: 768px) {
    width: 75vw;
  }
`;

const StyledTd = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    width: 75vw;
  }
`;

const StyledTr = styled.tr`
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
export default Section;
