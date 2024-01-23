import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import AtTable from "./WebAtTable";

const Attendance = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-CA");
  const [date, setDate] = useState(formattedDate);
  const [selectedBan, setSelectedBan] = useState("");
  const [sectionId, setSectionId] = useState(0);
  const [buttonText, setButtonText] = useState("");
  const ban = ["W", "I", "N", "T", "E", "R"];

  const changeDate = (e) => {
    setDate(e.target.value);
  };

  const handleDropdownChange = (event) => {
    if (!date) {
      alert("날짜를 먼저 선택하세요.");
      return;
    }

    const selectedValue = event.target.value;

    setSelectedBan(selectedValue);

    switch (selectedValue) {
      case "W":
        setSectionId(1);
        break;
      case "I":
        setSectionId(2);
        break;
      case "N":
        setSectionId(3);
        break;
      case "T":
        setSectionId(4);
        break;
      case "E":
        setSectionId(5);
        break;
      case "R":
        setSectionId(6);
        break;
    }
  };

  const handleButtonClick = (buttonNumber) => {
    if (!date) {
      alert("날짜를 먼저 선택하세요.");
      return;
    }

    const buttonMap = ["", "W", "I", "N", "T", "E", "R"];
    setButtonText(buttonMap[buttonNumber]);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
      <Div>
        <Title>출결관리</Title>

        <Box>
          <Guide>1. 날짜를 선택해주세요.</Guide>
          <input type="date" value={date} onChange={changeDate} />
        </Box>

        <div>
          <Guide>2. 반을 선택해주세요.</Guide>
          <select onChange={handleDropdownChange} value={selectedBan || ""}>
            <option disabled value="">
              반 선택
            </option>
            {ban.map((banOption) => (
              <option key={banOption} value={banOption}>
                {banOption}
              </option>
            ))}
          </select>
        </div>
      </Div>

      <StyledTable>{selectedBan && <AtTable date={date} sectionId={sectionId} />}</StyledTable>
      </Container>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

const Container = styled.div`
display: flex;
flex-direction: row;
`;
const Div = styled.div`
  margin-top: 39px;
  margin-left: 67px;
`;

const Title = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 13px;
`;

const Box = styled.div`
margin-bottom: 13px;
`;
const Guide = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledTable = styled.div`
`;
export default Attendance;
