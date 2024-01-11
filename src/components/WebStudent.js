import React, { useState } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useRecoilState } from "recoil";
import { addStudent } from "../api/StudentApi";

const GlobalStyle = createGlobalStyle`
  body {
    margin : 0;
    padding: 0;
  }
`;

const Div = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const Button = styled.button`
  cursor: pointer;
  /* width: 30px;
  height: 20px; */
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Student = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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

  const postStudent = (e) => {
    try {
      e.preventDefault();
      addStudent(id, name, school, grade, phoneNumber);
      setId("");
      setName("");
      setSchool("");
      setGrade("");
      setPhoneNumber("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeId = (e) => {
    setId(e.target.value); // 수정된 부분
  };

  const handleChangeName = (e) => {
    setName(e.target.value); // 수정된 부분
  };
  const handleChangeSchool = (e) => {
    setSchool(e.target.value); // 수정된 부분
  };
  const handleChangeGrade = (e) => {
    setGrade(e.target.value); // 수정된 부분
  };
  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value); // 수정된 부분
  };

  return (
    <>
      <GlobalStyle />
      <Div>
      <ButtonWrapper>
          <Button onClick={() => handleButtonClick(1)}>학생 등록</Button>
          <Button onClick={() => handleButtonClick(2)}>I</Button>
          <Button onClick={() => handleButtonClick(3)}>N</Button>
          <Button onClick={() => handleButtonClick(4)}>T</Button>
          <Button onClick={() => handleButtonClick(5)}>E</Button>
          <Button onClick={() => handleButtonClick(6)}>R</Button>
        </ButtonWrapper>
        <Form onSubmit={postStudent}>
          id:
          <input type="text" value={id} onChange={handleChangeId} />
          이름:
          <input type="text" value={name} onChange={handleChangeName} />
          학교:
          <input type="text" value={school} onChange={handleChangeSchool} />
          학년:
          <input type="text" value={grade} onChange={handleChangeGrade} />
          연락처:
          <input
            type="text"
            value={phoneNumber}
            onChange={handleChangePhoneNumber}
          />
          <button>학생 정보 등록</button>
        </Form>
      </Div>
    </>
  );
};
export default Student;
