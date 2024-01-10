import React, { useState } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useRecoilState } from "recoil";
import { addStudent } from "../api/AdminApi";

const GlobalStyle = createGlobalStyle`
  body {
    margin : 0;
    padding: 0;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0;
  overflow: auto;
`;

const Student = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [grade, setGrade] = useState("");
  const [birth, setBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const postStudent = () => {
    try {
      addStudent(id, name, gender, grade, birth, phoneNumber);
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
  const handleChangeGender = (e) => {
    setGender(e.target.value); // 수정된 부분
  };
  const handleChangeGrade = (e) => {
    setGrade(e.target.value); // 수정된 부분

    setBirth(e.target.value);
  };
  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value); // 수정된 부분
  };

  return (
    <>
      <GlobalStyle />
      <Div>
        id:
        <input type="text" value={id} onChange={handleChangeId} />
        이름:
        <input type="text" value={name} onChange={handleChangeName} />
        성별:
        <input type="text" value={gender} onChange={handleChangeGender} />
        학년:
        <input type="text" value={grade} onChange={handleChangeGrade} />
        연락처:
        <input
          type="text"
          value={phoneNumber}
          onChange={handleChangePhoneNumber}
        />
        <button onClick={postStudent}>학생 정보 등록</button>
      </Div>
    </>
  );
};
export default Student;
