import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getSectionAttendanceInfo,
  postAttendanceBySection,
} from "../api/AttendanceApi";

const AtTable = (props) => {
  const [sectionInfo, setSectionIfno] = useState([]);
  const [studentInfo, setStudentIfno] = useState([]);
  const sectionId = props.sectionId;
  const date = props.date;
  const columns = [
    { key: "num", label: "" },
    { key: "name", label: "이름" },
    { key: "phoneNumber", label: "연락처" },
    { key: "attendance", label: "출결" },
    { key: "note", label: "비고" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      getSectionAttendanceInfo(sectionId, date).then(function (data) {
        if (data) {
          setSectionIfno(data.sectionGetOneResponse);

          const sortedStudentInfo = data.ssAttendanceGetOneResponseList.sort(
            (a, b) => {
              if (a.studentOneResponse.name < b.studentOneResponse.name)
                return -1;
              if (a.studentOneResponse.name > b.studentOneResponse.name)
                return 1;
              return 0;
            }
          );

          setStudentIfno(sortedStudentInfo);
        } else {
          alert("반 정보가 없습니다");
        }
      });
    };
    fetchData();
  }, [sectionId, date]);

  const handleRadioChange = (index, value) => {
    setStudentIfno((prevStudentInfo) => {
      const updatedStudentInfo = [...prevStudentInfo];
      updatedStudentInfo[index].attendanceType = value;
      return updatedStudentInfo;
    });
  };

  const handleNoteChange = (index, value) => {
    setStudentIfno((prevStudentInfo) => {
      const updatedStudentInfo = [...prevStudentInfo];
      updatedStudentInfo[index].note = value;
      return updatedStudentInfo;
    });
  };

  const postAttendance = () => {
    const data = {
      sectionId: sectionId,
      selectedDay: date,
      attendancePostRequestList: studentInfo.map((info) => ({
        studentId: info.studentOneResponse.id,
        attendanceType: info.attendanceType,
        note: info.note,
      })),
    };

    console.log(data);

    postAttendanceBySection(data);
  };

  return (
    <>
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
                      index + 1
                    ) : column.key === "attendance" ? (
                      <AttendanceLabel>
                        <label>
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
                        </label>
                        <label>
                          <Radio2
                            type="radio"
                            value="LATENESS"
                            checked={
                              studentInfo[index].attendanceType === "LATENESS"
                            }
                            onChange={() =>
                              handleRadioChange(index, "LATENESS")
                            }
                          />
                          지각
                        </label>
                        <label>
                          <Radio3
                            type="radio"
                            value="ABSENCE"
                            checked={
                              studentInfo[index].attendanceType === "ABSENCE"
                            }
                            onChange={() => handleRadioChange(index, "ABSENCE")}
                          />
                          결석
                        </label>
                      </AttendanceLabel>
                    ) : column.key === "note" ? (
                      <InputNote
                        type="text"
                        value={data.note}
                        onChange={(e) =>
                          handleNoteChange(index, e.target.value)
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
      <button onClick={postAttendance}>저장</button>
    </>
  );
};

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
  /* margin-top: 5px; */
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
  /* margin-bottom: 4px; */
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
  /* margin-bottom: 4px; */
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

export default AtTable;
