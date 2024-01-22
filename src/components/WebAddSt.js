import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { addStudent, addStudentSection } from "../api/StudentApi";
import navigate from "navigate";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedBan, setSelectedBan] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const ban = ["W", "I", "N", "T", "E", "R"];
  const grade = ["중3", "고1", "고2", "고3"];

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
  };
  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const handleSchoolChange = (e) => {
    e.preventDefault();
    setSchool(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data1 = {
      id: id,
      name: name,
      school: school,
      grade: gradeId,
      phoneNumber: phoneNumber,
    };
    const data2 = {
      studentId: id,
      sectionId: sectionId,
    };
    console.log(data1, data2);
    addStudent(data1);
  
    await new Promise(resolve => setTimeout(resolve, 1000)); // 비동기 대기
  
    await addStudentSection(data2);
  
    setId("");
    setName("");
    setSchool("");
    setGradeId("");
    setPhoneNumber("");
    setSectionId("");
    setSelectedBan("");
    setSelectedGrade("");
  
    navigate("/student");
  };
  
  const handelGradeDropdownChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedGrade(selectedValue);
    switch (selectedValue) {
      case "중3":
        setGradeId(0);
        break;
      case "고1":
        setGradeId(1);
        break;
      case "고2":
        setGradeId(2);
        break;
      case "고3":
        setGradeId(3);
        break;
    }
  };
  const handleBanDropdownChange = (event) => {
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

//   const handleButtonClick = (buttonNumber) => {
//     const buttonMap = ["", "W", "I", "N", "T", "E", "R"];
//     setButtonText(buttonMap[buttonNumber]);
//     const buttonMap2 = ["", ""]
//   };

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
      <select onChange={handelGradeDropdownChange} value={selectedGrade || ""}>
        <option disabled value="">
          학년 선택
        </option>
        {grade.map((gradeOption) => (
          <option key={gradeOption} value={gradeOption}>
            {gradeOption}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="전화번호"
        value={phoneNumber}
        //   onChange={handlePhoneNumberChange}
        onChange={(e) => hypenTel(e)}
        maxLength="13"
      />
      <select onChange={handleBanDropdownChange} value={selectedBan || ""}>
        <option disabled value="">
          반 선택
        </option>
        {ban.map((banOption) => (
          <option key={banOption} value={banOption}>
            {banOption}
          </option>
        ))}
      </select>
      <button onClick={handleSubmit}>학생 등록</button>
    </Div>
  );
};

export default AddSt;
