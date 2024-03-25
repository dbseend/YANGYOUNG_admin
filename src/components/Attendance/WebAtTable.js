import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getAttendanceBySectionAPI,
  postAttendanceBySectionAPI,
} from "../../api/AttendanceAPI";

const AtTable = (props) => {
  const [studentInfo, setStudentInfo] = useState([]);
  const sectionId = props.sectionId;
  const date = props.date;
  const formattedDate = new Date(`${date}T12:00:00Z`);
  const formattedDateString = formattedDate.toISOString().slice(0, 19);

  const columns = [
    { key: "num", label: "" },
    { key: "name", label: "이름" },
    { key: "studentPhoneNumber", label: "학생 연락처" },
    { key: "parentPhoneNumber", label: "부모님 연락처" },
    { key: "attendance", label: "출결" },
    { key: "note", label: "비고" },
  ];

  useEffect(() => {
    console.log("sectionId:", sectionId);
    console.log("date:", date);
    fetchData();
  }, [sectionId, date]);

  const fetchData = async () => {
    try {
      const data = await getAttendanceBySectionAPI(
        sectionId,
        formattedDateString
      );
      if (data && data.attendanceList) {
        const sortedStudentInfo = data.attendanceList.sort((a, b) => {
          if (a.studentName < b.studentName) return -1;
          if (a.studentName > b.studentName) return 1;
          return 0;
        });
        console.log(sortedStudentInfo);
        setStudentInfo(sortedStudentInfo);
      } else {
        alert("반 정보가 없습니다.");
        setStudentInfo([]); // 반 정보가 없는 경우 빈 배열로 설정
      }
    } catch (error) {
      console.log("반 정보를 불러오는 도중 에러 발생:", error);
    }
  };

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
    console.log(formattedDateString);
    const data = {
      sectionId: sectionId,
      attendanceUpdateRequestList: studentInfo
        .filter((info) => info.attendanceType !== null)
        .map((info) => ({
          attendedDateTime: formattedDateString,
          studentId: info.studentId,
          attendanceType: info.attendanceType,
          note: info.note,
        })),
    };

    console.log(data);

    postAttendanceBySectionAPI(data);
  };

  return (
    <Div>
      <ButtonContainer>
        <Button onClick={fetchData}>새로고침</Button>
        <Button onClick={postAttendance}>저장</Button>
      </ButtonContainer>
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
                        <Label>
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
                        </Label>
                        <Label>
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
                        </Label>
                        <Label>
                          <input
                            type="radio"
                            value="ABSENCE"
                            checked={
                              studentInfo[index].attendanceType === "ABSENCE"
                            }
                            onChange={() => handleRadioChange(index, "ABSENCE")}
                          />
                          결석
                        </Label>
                      </AttendanceLabel>
                    ) : column.key === "note" ? (
                      <InputNote
                        value={data.note}
                        onChange={(e) =>
                          handleNoteChange(index, e.target.value)
                        }
                      />
                    ) : column.key === "name" ? (
                      data.studentName
                    ) : column.key === "studentPhoneNumber" ? (
                      data.studentPhoneNumber
                    ) : column.key === "parentPhoneNumber" ? (
                      data.parentPhoneNumber
                    ) : (
                      ""
                    )}
                  </StyledTd>
                ))}
              </tr>
            ))}
        </tbody>
      </StyledTable>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  overflow: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  @media screen and (min-width: 768px) {
    width: 60vw;
  }
`;

const StyledTh = styled.th`
  //표 길어질 경우 th 고정 - 아직 test 안해봄
  position: sticky;
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  background-color: #dfdfdf;
  @media screen and (min-width: 768px) {
    width: auto;
  }
  min-width: 45px;
`;

const StyledTd = styled.td`
  border: 1px solid #ddd;
  padding: 2px;
  text-align: center;

  @media screen and (min-width: 768px) {
    width: auto;
  }
`;

const InputNote = styled.textarea`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  resize: none;
  border: transparent;
`;

const AttendanceLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-around;
  input {
    cursor: pointer;
  }
  label {
    padding: 0 8px;
  }
`;

const Label = styled.label`
  min-width: 55px;
`;

const Button = styled.button`
  margin-left: 20px;
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
export { Button };
export default AtTable;
