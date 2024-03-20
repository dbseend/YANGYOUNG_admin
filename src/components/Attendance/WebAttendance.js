import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AtTable from "./WebAtTable";
import { GlobalStyle } from "../../Globalstyle";
import { getSearchOption } from "../../api/UtilAPI";

const Attendance = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-CA");
  const [date, setDate] = useState(formattedDate);
  const [selectedSection, setSelectedSection] = useState(""); // 초기값을 빈 문자열로 설정
  const [sectionId, setSectionId] = useState(0);
  const [sectionList, setSection] = useState([]);

  useEffect(() => {
    getSearchOption().then ((response) => {
      setSection(response.sectionList);
    });
  }, []);

  useEffect(() => {
    // sectionList가 업데이트될 때 첫 번째 항목을 선택
    if (sectionList.length > 0) {
      setSelectedSection(sectionList[0]);
      console.log(sectionList[0]);
      setSectionId(sectionList[0].id); // 첫 번째 항목 선택에 따른 sectionId 설정
    }
  }, [sectionList]);

  const changeDate = (e) => {
    setDate(e.target.value);
  };

  const handleDropdownChange = (e) => {
    if (!date) {
      alert("날짜를 먼저 선택하세요.");
      return;
    }
    const selectedValue = e.target.value;
    setSelectedSection(selectedValue);
    setSectionId(sectionList[selectedValue].id);
  };

  return (
    <>
      <GlobalStyle />

      <AttendanceContainer>
        <AttendanceContent>
          <Title>출결관리</Title>
          <Guide>1. 날짜를 선택해주세요.</Guide>
          <DatePicker type="date" value={date} onChange={changeDate} />
          <Guide>2. 반을 선택해주세요.</Guide>
          <Select
            onChange={(e) => handleDropdownChange(e)}
            value={selectedSection}
          >
            {sectionList.map(
              (
                banOption,
                index // index 매개변수 추가
              ) => (
                <option key={index} value={index}>
                  {banOption.name}
                </option>
              )
            )}
          </Select>
        </AttendanceContent>

        <StyledTableContainer>
          {selectedSection && <AtTable date={date} sectionId={sectionId} />}
        </StyledTableContainer>
      </AttendanceContainer>
    </>
  );
};

const AttendanceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* align-items: flex-start; */
  margin-top: 80px;
  /* margin-left: 5%; */
  gap: 5%;
`;

const AttendanceContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 90px;
  align-items: flex-start;
`;

const StyledTableContainer = styled.div`
  margin-top: 49px;
  margin-bottom: 90px;
`;

const Title = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Guide = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 10px;
  margin-top: 30px;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 339px;
`;

const DatePicker = styled.input`
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 320px;
  margin-bottom: 10px;
`;
export { Title };
export default Attendance;

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

// const Attendance = () => {
//   const today = new Date();
//   const formattedDate = today.toLocaleDateString("en-CA");
//   const [date, setDate] = useState(formattedDate);
//   const [selectedBan, setSelectedBan] = useState("");
//   const [sectionId, setSectionId] = useState(0);
//   const [buttonText, setButtonText] = useState("");
//   const ban = ["W", "I", "N", "T", "E", "R"];

//   const changeDate = (e) => {
//     setDate(e.target.value);
//   };

//   const handleDropdownChange = (event) => {

//     if (!date) {
//       alert("날짜를 먼저 선택하세요.");
//       return;
//     }

//     const selectedValue = event.target.value;

//     setSelectedBan(selectedValue);

//     switch (selectedValue) {
//       case "W":
//         setSectionId(1);
//         break;
//       case "I":
//         setSectionId(2);
//         break;
//       case "N":
//         setSectionId(3);
//         break;
//       case "T":
//         setSectionId(4);
//         break;
//       case "E":
//         setSectionId(5);
//         break;
//       case "R":
//         setSectionId(6);
//         break;
//     }
//   };

//   const handleButtonClick = (buttonNumber) => {
//     if (!date) {
//       alert("날짜를 먼저 선택하세요.");
//       return;
//     }

//     const buttonMap = ["", "W", "I", "N", "T", "E", "R"];
//     setButtonText(buttonMap[buttonNumber]);
//   };

//   return (
//     <>
//       <GlobalStyle />
//       <Container>
//         <h1>출결관리</h1>
//         <h2>날짜와 반을 선택해주세요</h2>
//         <Label>날짜</Label>
//         <Inputing type="date" value={date} onChange={changeDate} />
//         <Label>반</Label>
//         <select onChange={handleDropdownChange} value={selectedBan || ""}>
//           <option disabled value="">
//             반 선택
//           </option>
//           {ban.map((banOption) => (
//             <option key={banOption} value={banOption}>
//               {banOption}
//             </option>
//           ))}
//         </select>
//         <div>
//           {selectedBan && <AtTable date={date} sectionId={sectionId} />}
//         </div>
//       </Container>
//     </>
//   );
// };
// =======
// const StyledTable = styled.div``;
// >>>>>>> main

// export default Attendance;
// >>>>>>> 4d5d0817bd4d0d7191aa5c84d19b5cb6f0f8316c:src/components/WebAttendance.js
