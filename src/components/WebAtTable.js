import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getSectionAttendanceInfo } from "../api/AttendanceApi";

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

const AtTable = (props) => {
  // const [data, setData] = useState([]);
  const [sectionInfo, setSectionIfno] = useState([]);
  const [studentInfo, setStudentIfno] = useState([]);
  const sectionId = props.sectionId;
  const columns = [
    { key: "num", label: "" },
    { key: "name", label: "이름" },
    { key: "phoneNumber", label: "연락처" },
    { key: "attendance", label: "출결" },
    { key: "note", label: "비고" },
  ];

  useEffect(() => {
    console.log(sectionId);
    const fetchData = async () => {
      getSectionAttendanceInfo(sectionId).then(function (data) {
        setSectionIfno(data.sectionGetOneResponse);
        setStudentIfno(data.ssAttendanceGetOneResponseList);
        console.log(data.sectionGetOneResponse);
        console.log(data.ssAttendanceGetOneResponseList);
      });
    };
    fetchData();
    // alert();
  }, [sectionId]);

  const handleRadioChange = (index, value) => {
    setStudentIfno((prevStudentInfo) => {
      const updatedStudentInfo = [...prevStudentInfo];
      updatedStudentInfo[index].attendanceType = value;
      return updatedStudentInfo;
    });
  };

  return (
    <>
      <h1>{sectionId}</h1>
      <StyledTable>
        <thead>
          <tr>
            {columns.map((column) => (
              <StyledTh key={column.key}>{column.label}</StyledTh>
            ))}
          </tr>
        </thead>
        <tbody>
          {studentInfo &&
            studentInfo.map((data, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <StyledTd key={column.key}>
                    {column.key === "num" ? (
                      index + 1 // num은 인덱스에 1을 더한 값
                    ) : column.key === "attendance" ? (
                      <AttendanceLabel>
                        <Radio1
                          type="radio"
                          value="ATTENDANCE"
                          checked={
                            studentInfo[index].attendanceType === "ATTENDANCE"
                          }
                          onChange={() =>
                            handleRadioChange(index, "ATTENDANCE")
                          }
                        />
                        출석
                        <Radio2
                          type="radio"
                          value="LATENESS"
                          checked={
                            studentInfo[index].attendanceType === "LATENESS"
                          }
                          onChange={() => handleRadioChange(index, "LATENESS")}
                        />
                        지각
                        <Radio3
                          type="radio"
                          value="ABSENCE"
                          // checked={data.attendanceType === "ABSENCE"}
                          checked={
                            studentInfo[index].attendanceType === "ABSENCE"
                          }
                          onChange={() => handleRadioChange(index, "ABSENCE")}
                        />
                        결석
                      </AttendanceLabel>
                    ) : column.key === "note" ? (
                      <InputNote
                        type="text"
                        value={data.note}
                        onChange={(e) =>
                          handleRadioChange(index, e.target.value)
                        }
                      />
                    ) : column.key === "name" ? (
                      data.studentOneResponse.name
                    ) : column.key === "phoneNumber" ? (
                      data.studentOneResponse.phoneNumber
                    ) : (
                      ""
                    )}
                  </StyledTd>
                ))}
              </tr>
            ))}
        </tbody>
      </StyledTable>
      <button>저장</button>
    </>
  );
};

export default AtTable;
