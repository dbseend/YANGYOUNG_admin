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
  align-items: center;
<<<<<<< HEAD
`;

const Label = styled.label`
  margin-top: 20px;
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

const Button = styled.div`
  cursor: pointer;
  width: 30px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
=======
>>>>>>> main
`;

const Label = styled.label`
  margin-top: 20px;
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
  gap:10px;
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
  const [date, setDate] = useState("");
  const [buttonText, setButtonText] = useState("");

  const changeDate = (e) => {
    setDate(e.target.value);
    console.log(e.target.value);
  };

  const handleButtonClick = (buttonNumber) => {
    if (!date) {
      // 날짜를 선택하지 않은 경우 알림창 표시
      alert("날짜를 먼저 선택하세요.");
      return;
    }

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
        <Label>
          {" "}
          날짜 선택<Inputing type="date" onChange={changeDate}></Inputing>
        </Label>
        <ButtonWrapper>
          <Button onClick={() => handleButtonClick(1)}>W</Button>
          <Button onClick={() => handleButtonClick(2)}>I</Button>
          <Button onClick={() => handleButtonClick(3)}>N</Button>
          <Button onClick={() => handleButtonClick(4)}>T</Button>
          <Button onClick={() => handleButtonClick(5)}>E</Button>
          <Button onClick={() => handleButtonClick(6)}>R</Button>
        </ButtonWrapper>
        <div>
          {/* 현재 보여지는 내용을 표시하는 부분 */}
          {buttonText && <AtTable buttonText={buttonText} />}
        </div>
      </Div>
    </>
  );
};

export default Attendance;
