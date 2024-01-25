import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getSectionAttendanceInfo,
  postAttendanceBySection,
} from "../api/AttendanceApi";

const AtTable = (props) => {
  const [studentInfo, setStudentInfo] = useState([]);
  const [attendanceCheck, setAttendanceCheck] = useState([]);
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
        if (data && data.ssAttendanceGetOneResponseList) {
          setAttendanceCheck(data.ssAttendanceGetOneResponseList);

          const sortedStudentInfo = attendanceCheck.sort((a, b) => {
            if (a.studentResponse.name < b.studentResponse.name) return -1;
            if (a.studentResponse.name > b.studentResponse.name) return 1;
            return 0;
          });

          setStudentInfo(sortedStudentInfo);
        } else {
          alert("반 정보가 없습니다.");
        }
      });
    };
    fetchData();
  }, [sectionId, date]);

  const handleRadioChange = (index, value) => {
    setStudentInfo((prevStudentInfo) => {
      const updatedStudentInfo = [...prevStudentInfo];
      updatedStudentInfo[index].attendanceType = value;
      return updatedStudentInfo;
    });
  };

  const handleNoteChange = (index, value) => {
    setStudentInfo((prevStudentInfo) => {
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
        studentId: info.studentResponse.id,
        attendanceType: info.attendanceType,
        note: info.note,
      })),
    };

    console.log(data);

    postAttendanceBySection(data);
  };

  return (
    <>
      <Button onClick={postAttendance}>저장</Button>

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
                          <input
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
                          <input
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
                          <input
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
                      data.studentResponse.name
                    ) : column.key === "phoneNumber" ? (
                      data.studentResponse.phoneNumber
                    ) : (
                      ""
                    )}
                  </StyledTd>
                ))}
              </tr>
            ))}
        </tbody>
      </StyledTable>
    </>
  );
};

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  @media screen and (min-width: 768px) {
    width: 40vw;
  }
`;

const StyledTh = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  background-color: #dfdfdf;
  @media screen and (min-width: 768px) {
    width: auto;
  }
`;

const StyledTd = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;

  @media screen and (min-width: 768px) {
    width: auto;
  }
`;

const InputNote = styled.input`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid;
  border-color: lightgray;
`;

const AttendanceLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-around;
  input {
    cursor: pointer;
  }
  /* 라디오 버튼과 텍스트 간격 조절 */
  label {
    padding: 0 8px; /* 좌우 패딩을 조정하여 간격을 조절합니다. */
  }
`;

const Button = styled.button`
  background-color: black;
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 16px;
  font-weight: normal;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #2c3e50;
  }
`;
export default AtTable;
