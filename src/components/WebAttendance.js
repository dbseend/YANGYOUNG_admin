import React, { useState } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useRecoilState } from "recoil";
import AtTable from "./WebAtTable";

const GlobalStyle = createGlobalStyle`
  body {
    margin : 0;
    padding: 0;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  overflow: hidden;
`;

const Attendance = () => {
  const [date, setDate] = useState("");
  const changeDate = (e) => {
    setDate(e.target.value);
    console.log(e.target.value);
  };
  const [buttonText, setButtonText] = useState("");
  const handleButtonClick = (buttonNumber) => {
    // 각 버튼을 누를 때마다 다른 내용 설정
    switch (buttonNumber) {
      case 1:
        setButtonText("W");
        break;
      case 2:
        setButtonText("I");
        break;
      case 3:
        setButtonText("N");
        break;
      case 4:
        setButtonText("T");
        break;
      case 5:
        setButtonText("E");
        break;
      case 6:
        setButtonText("R");
        break;
      default:
        setButtonText("");
    }
  };
  return (
    <>
      <GlobalStyle />
      <Div>
        <div>날짜를 선택하세요</div>
        <input type="date" onChange={changeDate}></input>
        <div>{date}</div>
        <div>
          <button onClick={() => handleButtonClick(1)}>W</button>
          <button onClick={() => handleButtonClick(2)}>I</button>
          <button onClick={() => handleButtonClick(3)}>N</button>
          <button onClick={() => handleButtonClick(4)}>T</button>
          <button onClick={() => handleButtonClick(5)}>E</button>
          <button onClick={() => handleButtonClick(6)}>R</button>
          <div>
            {/* 현재 보여지는 내용을 표시하는 부분 */}
            {buttonText && <AtTable buttonText={buttonText} />}
          </div>
        </div>
      </Div>
    </>
  );
};
export default Attendance;
