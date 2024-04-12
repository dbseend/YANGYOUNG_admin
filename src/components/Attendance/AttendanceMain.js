import React, { useState, useEffect } from "react";
import Select from "react-select";
import styled from "styled-components";
import { Title } from "../../styles/CommonStyles";
import { GlobalStyle } from "../../styles/Globalstyle";
import AttendanceList from "./AttendanceList";
import { getSearchOptionAPI } from "../../api/UtilAPI";

const Attendance = () => {
  const today = new Date().toLocaleDateString("en-CA");

  const [date, setDate] = useState(today);
  const [selectedSectionId, setSelectedSectionId] = useState(0);
  const [sectionList, setSectionList] = useState([]);

  // 화면 렌더링 시 검색 옵션 받아오기 - 반정보
  useEffect(() => {
    getSearchOptionAPI()
      .then((response) => {
        console.log(response);
        setSectionList(response.sectionList);
        setSelectedSectionId(response.sectionList[0]?.id);
      })
      .catch((error) => {
        console.error("Failed to fetch section list:", error);
      });
  }, []);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSectionChange = (selectedOption) => {
    setSelectedSectionId(selectedOption.value);
  };

  return (
    <>
      <GlobalStyle />

      <AttendanceContainer>
        <AttendanceContent>
          <Title>출결관리</Title>
          <Guide>1. 날짜를 선택해주세요.</Guide>
          <DatePicker
            type="date"
            value={date}
            onChange={handleDateChange}
          />
          <Guide>2. 반을 선택해주세요.</Guide>
          <StyledSelect
            placeholder="반 검색"
            options={sectionList.map((section) => ({
              value: section.id,
              label: section.name,
              key: section.id
            }))}
            onChange={handleSectionChange}
          />
        </AttendanceContent>

        <StyledTableContainer>
          {selectedSectionId && (
            <AttendanceList date={date} sectionId={selectedSectionId} />
          )}
        </StyledTableContainer>
      </AttendanceContainer>
    </>
  );
};

const AttendanceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 80px;
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

const DatePicker = styled.input`
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 320px;
  margin-bottom: 10px;
`;

const StyledSelect = styled(Select)`
  width: 338px;
  text-align: left;
  cursor: pointer;
`;

export default Attendance;
