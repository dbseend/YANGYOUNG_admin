import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AtTable from "./WebAtTable";
import { viewStudent } from "../../api/StudentApi";
import { GlobalStyle } from "../../Globalstyle";
const Attendance = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-CA");
  const [date, setDate] = useState(formattedDate);
  const [selectedSection, setSelectedSection] = useState(""); // 초기값을 빈 문자열로 설정
  const [sectionId, setSectionId] = useState(0);
  const [sectionList, setSection] = useState([]);

  useEffect(() => {
    viewAllStudent();
  }, []);

  useEffect(() => {
    // sectionList가 업데이트될 때 첫 번째 항목을 선택
    if (sectionList.length > 0) {
      setSelectedSection(sectionList[0]);
      setSectionId(1); // 첫 번째 항목 선택에 따른 sectionId 설정
    }
  }, [sectionList]);

  const changeDate = (e) => {
    setDate(e.target.value);
  };

  const handleDropdownChange = (e, type) => {
    if (!date) {
      alert("날짜를 먼저 선택하세요.");
      return;
    }
    const selectedValue = e.target.value;

    if (type === "section") {
      setSelectedSection(selectedValue);
      const sectionId = sectionList.indexOf(selectedValue) + 1;
      setSectionId(sectionId);
    }
  };

  const viewAllStudent = async () => {
    try {
      const response = await viewStudent();

      setSection(response.sectionList);

      console.log(response);
    } catch (error) {
      console.log("학생 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  return (
    <>
      <GlobalStyle />

      <AttendanceContainer>
        <AttendanceContent>
          <Title>출결관리</Title>

          <Box>
            <Guide>1. 날짜를 선택해주세요.</Guide>
            <DatePicker type="date" value={date} onChange={changeDate} />
          </Box>
            <Guide>2. 반을 선택해주세요.</Guide>
            <Select
              onChange={(e) => handleDropdownChange(e, "section")}
              value={selectedSection}
            >
              {sectionList.map((banOption) => (
                <option key={banOption} value={banOption}>
                  {banOption}
                </option>
              ))}
            </Select>
        </AttendanceContent>

        <StyledTableContainer>
            {selectedSection && (
              <AtTable date={date} sectionId={sectionId} />
            )}
        </StyledTableContainer>
        
      </AttendanceContainer>
    </>
  );
};


const AttendanceContainer = styled.div`
  display: flex;
  flex-direction: row;
  // justify-content: center; 
  margin-top: 120px;
  gap: 10%;
`;

const AttendanceContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 90px;
`;

const StyledTableContainer = styled.div`
  // margin-right: 200px;
  // margin-top: 39px;
  // margin-bottom: 90px;
`;

const Title = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 20px;
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
  margin-bottom: 10px;
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


export default Attendance;