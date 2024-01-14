import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { addStudent } from "../api/StudentApi";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

const Div = styled.div`
  height: 41px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddSt = () => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");

//   const hypenTel = (event) => {
//     let inputValue = event.target.value.replace(/[^0-9]/g, "");

//     if (inputValue.length <= 10) {
//       setPhoneNumber(inputValue.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
//     } else if (inputValue.length > 10 && inputValue.length <= 13) {
//       setPhoneNumber(
//         inputValue
//           .replace(/-/g, "")
//           .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
//       );
//     }
//   };
const handleIdChange = (e) => {
    e.preventDefault();
    setId(e.target.value);
}
const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
}
const handleSchoolChange = (e) => {
    e.preventDefault();
    setSchool(e.target.value);
}
const handleGradeChange = (e) => {
    e.preventDefault();
    setGrade(e.target.value);
}
const handlePhoneNumberChange = (e) => {
    e.preventDefault();
    setPhoneNumber(e.target.value);
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Your logic to add a student using the addStudent function
    try {
      const response = await addStudent({
        id,
        name,
        school,
        grade,
        phoneNumber,
      });
    } catch (error) {
      console.log("학생 등록 실패: ", error);
    }

    // Clear the form after submission
    // setId(0);
    // setName("");
    // setSchool("");
    // setGrade(0);
    // setPhoneNumber("");
  };


  return (
    <Div>
      <GlobalStyle />
        <input
          type="text"
          placeholder="id"
          value={id}
          onChange={handleIdChange}
        />
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="text"
          placeholder="학교"
          value={school}
          onChange={handleSchoolChange}
        />
        <input
          type="text"
          placeholder="학년"
          value={grade}
          onChange={handleGradeChange}
        />
        <input
          type="text"
          placeholder="전화번호"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        //   onChange={(e) => hypenTel(e)}
          maxLength="13"
        />
        <button type = "submit" onClick={handleSubmit}>제출</button>
    </Div>
  );
};

export default AddSt;
