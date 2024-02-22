import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { viewSection } from "../../api/SectionAPI";

const Section = () => {
  const [sectionList, setSectionList] = useState([]);
  const [sectionCount, setSectionCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await viewSection();
        const { sectionResponseList, size } = response.data;
        setSectionList(sectionResponseList);
        setSectionCount(size);
      } catch (error) {
        console.error("Error fetching lecture data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Div>
        <TableContainer>
          <h1>분반 정보</h1>
          <p> 개설 분반 수: {sectionCount}</p>
          <StyledTable>
            <StyledThead>
              <tr>
                <StyledTh>ID</StyledTh>
                <StyledTh>반 이름</StyledTh>
                <StyledTh>담임</StyledTh>
              </tr>
            </StyledThead>
            <tbody>
              {sectionList.map((section) => (
                <HoverTr key={section.id}>
                  <StyledTd>{section.id}</StyledTd>
                  <StyledTd>{section.name}</StyledTd>
                  <StyledTd>{section.teacher}</StyledTd>
                </HoverTr>
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
  margin: 0;
  overflow: auto;
`;

const TableContainer = styled.div`
  margin: 20px;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledThead = styled.thead`
  background-color: #f2f2f2;
`;

const StyledTh = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const StyledTd = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const HoverTr = styled.tr`
  &:hover {
    background-color: #f5f5f5;
  }
`;

export default Section;
