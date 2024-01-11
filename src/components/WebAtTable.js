import React, { useState } from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const StyledTh = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #f2f2f2;
  text-align: center;
`;

const StyledTd = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
`;

const InputNote = styled.input`
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
`;

const AttendanceLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-around;
  input {
    cursor: pointer;
  }
`;
const Radio1 = styled.input`
  margin-bottom: 4px;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 10px;
  border: 1px solid;
  /* 선택되지 않은 상태의 배경색과 기타 스타일 */
  &:not(:checked) {
    background-color: transparent; /* 선택되지 않은 상태에서는 배경색이 투명합니다. */
  }
  /* 선택된 상태에서의 배경색과 기타 스타일 */
  &:checked {
    background-color: #50d68f; /* 선택된 상태에서의 배경색 */
  }
`;
const Radio2 = styled.input`
  margin-bottom: 4px;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 10px;
  border: 1px solid;
  /* 선택되지 않은 상태의 배경색과 기타 스타일 */
  &:not(:checked) {
    background-color: transparent; /* 선택되지 않은 상태에서는 배경색이 투명합니다. */
  }
  /* 선택된 상태에서의 배경색과 기타 스타일 */
  &:checked {
    background-color: #f6cc62; /* 선택된 상태에서의 배경색 */
  }
`;
const Radio3 = styled.input`
  margin-bottom: 4px;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 10px;
  border: 1px solid;
  /* 선택되지 않은 상태의 배경색과 기타 스타일 */
  &:not(:checked) {
    background-color: transparent; /* 선택되지 않은 상태에서는 배경색이 투명합니다. */
  }
  /* 선택된 상태에서의 배경색과 기타 스타일 */
  &:checked {
    background-color: #cb3c44; /* 선택된 상태에서의 배경색 */
  }
`;

const AtTable = () => {
  const [data, setData] = useState([
    { name: "홍길동", contact: "010-1234-5678", attendance: "출석", note: "" },
    {
      name: "김예은",
      contact: "010-9731-8985",
      attendance: "결석",
      note: "병원",
    },
    {
      name: "김예은",
      contact: "010-9731-8985",
      attendance: "결석",
      note: "병원",
    },
    {
      name: "전재우",
      contact: "010-9731-8985",
      attendance: "",
      note: "",
    },
    // 다른 데이터 항목들 추가
  ]);

  const columns = [
    { key: "num", label: "" },
    { key: "name", label: "이름" },
    { key: "contact", label: "연락처" },
    { key: "attendance", label: "출결" },
    { key: "note", label: "비고" },
    // 다른 열들 추가
  ];

  const handleRadioChange = (index, value) => {
    const newData = [...data];
    newData[index].attendance = value;
    setData(newData);
  };

  return (
    <StyledTable>
      <thead>
        <tr>
          {columns.map((column) => (
            <StyledTh key={column.key}>{column.label}</StyledTh>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <StyledTd key={column.key}>
                {column.key === "num" ? (
                  index + 1 // num은 인덱스에 1을 더한 값
                ) : column.key === "attendance" ? (
                  <AttendanceLabel>
                    <Radio1
                      type="radio"
                      value="출석"
                      checked={row[column.key] === "출석"}
                      onChange={() => handleRadioChange(index, "출석")}
                    />
                    출석
                    <Radio2
                      type="radio"
                      value="지각"
                      checked={row[column.key] === "지각"}
                      onChange={() => handleRadioChange(index, "지각")}
                    />
                    지각
                    <Radio3
                      type="radio"
                      value="결석"
                      checked={row[column.key] === "결석"}
                      onChange={() => handleRadioChange(index, "결석")}
                    />
                    결석
                  </AttendanceLabel>
                ) : column.key === "note" ? (
                  <InputNote
                    type="text"
                    value={row[column.key]}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index][column.key] = e.target.value;
                      setData(newData);
                    }}
                  />
                ) : (
                  row[column.key]
                )}
              </StyledTd>
            ))}
          </tr>
        ))}
      </tbody>
      <button>저장</button>
    </StyledTable>
  );
};

export default AtTable;
