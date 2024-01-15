import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import AtTable from "./WebAtTable";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Head = styled.div`
  color: #000;
  font-family: IBM Plex Sans KR;
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const Label = styled.label`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const Inputing = styled.input`
  margin-left: 10px;
  width: 159px;
  height: 17px;
  flex-shrink: 0;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const Button = styled.button`
  cursor: pointer;
  width: 30px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
        <h1>{buttonText}</h1>
        <Label>날짜</Label>
        <Inputing type="date" value={date} onChange={changeDate} />
        <Label>반</Label>
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
        <div>
          {selectedBan && <AtTable date={date} sectionId={sectionId} />}
        </div>
      </Container>
    </>
  );
};

export default Attendance;
