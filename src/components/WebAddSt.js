import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { addStudent,addStudentSection } from "../api/StudentApi";

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
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedBan, setSelectedBan] = useState("");
  const [sectionId, setSectionId] = useState(0);
  const [section, setSection] = useState("");
  const [buttonText, setButtonText] = useState("");
  const ban = ["W", "I", "N", "T", "E", "R"];

  const hypenTel = (event) => {
    let inputValue = event.target.value.replace(/[^0-9]/g, "");

    if (inputValue.length <= 10) {
      setPhoneNumber(inputValue.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    } else if (inputValue.length > 10 && inputValue.length <= 13) {
      setPhoneNumber(
        inputValue
          .replace(/-/g, "")
          .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
      );
    }
  };
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
    const data1 = {
        id: id,
        name: name,
        school: school,
        grade: grade,
        phoneNumber: phoneNumber
    };
    const data2 = {
        studentID: id,
        sectionID: sectionId
    };
    console.log(data1, data2);
    addStudent(data1);
    addStudentSection(data2);
    setId("");
    setName("");
    setSchool("");
    setGrade("");
    setPhoneNumber("");
    setSectionId("");
  };
  const handleDropdownChange = (event) => {
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
    const buttonMap = ["", "W", "I", "N", "T", "E", "R"];
    setButtonText(buttonMap[buttonNumber]);
    setSection(buttonMap[buttonNumber]);
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
        //   onChange={handlePhoneNumberChange}
          onChange={(e) => hypenTel(e)}
          maxLength="13"
        />
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
        <button type = "submit" onClick={handleSubmit}>제출</button>
    </Div>
  );
};

export default AddSt;
