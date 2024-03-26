import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { RowDiv } from "../../styles/CommonStyles";
import {
  getAttendanceBySectionAPI,
  postAttendanceBySectionAPI,
} from "../../api/AttendanceAPI";
import { sortListByNameAscending } from "../../util/Util";

const AtTable = (props) => {
  const [studentList, setStudentList] = useState([]);
  const sectionId = props.sectionId;
  const date = new Date(`${props.date}T12:00:00Z`).toISOString().slice(0, 19);

  const attendanceColumns = [
    { key: "num", label: "순번" },
    { key: "name", label: "이름" },
    { key: "studentPhoneNumber", label: "학생 연락처" },
    { key: "parentPhoneNumber", label: "부모님 연락처" },
    { key: "attendance", label: "출결" },
    { key: "note", label: "비고" },
  ];

  const attendanceType = [
    { key: "ATTENDANCE", label: "출석" },
    { key: "LATENESS", label: "지각" },
    { key: "ABSENCE", label: "결석" },
  ];

  // 반 출결 정보 조회
  const getAttendanceBySection = useCallback(async () => {
    try {
      const { attendanceList } = await getAttendanceBySectionAPI(
        sectionId,
        date
      );

      const sortedAttendanceList = attendanceList.map((student) => ({
        attendedDateTime: student.attendedDateTime,
        studentId: student.studentId,
        studentName: student.studentName,
        studentPhoneNumber: student.studentPhoneNumber,
        parentPhoneNumber: student.parentPhoneNumber,
        attendanceType: student.attendanceType,
        note: student.note,
        isEdited: false,
      }));

      const sortedStudentList = sortListByNameAscending(
        sortedAttendanceList,
        "studentName"
      );

      setStudentList(sortedStudentList);
    } catch (error) {
      console.error("출결 정보를 불러오는 중 오류가 발생했습니다:", error);
      alert("출결 정보를 불러오는 중 오류가 발생했습니다.");
    }
  }, [sectionId, date]);

  useEffect(() => {
    getAttendanceBySection();
  }, [getAttendanceBySection]);

  // 출결 정보 저장
  const postAttendance = async () => {
    const requestData = {
      sectionId: sectionId,
      attendanceUpdateRequestList: studentList
        .filter((info) => info.isEdited)
        .map((info) => ({
          attendedDateTime: date,
          studentId: info.studentId,
          attendanceType: info.attendanceType,
          note: info.note,
        })),
    };

    try {
      await postAttendanceBySectionAPI(requestData);
      alert("출결 정보가 수정되었습니다");
    } catch (error) {
      alert("출결 정보가 수정 중 오류 발생했습니다");
    }
  };

  // 출결 정보 수정 시 상태 업데이트 핸들러
  const handleInputChange = (index, value, type) => {
    const updatedStudentListCopy = [...studentList];

    if (type === "attendanceType") {
      updatedStudentListCopy[index] = {
        ...updatedStudentListCopy[index],
        attendanceType: value,
        isEdited: true,
      };
    }

    if (type === "note") {
      updatedStudentListCopy[index] = {
        ...updatedStudentListCopy[index],
        note: value,
        isEdited: true,
      };
    }

    setStudentList(updatedStudentListCopy);
  };

  return (
    <Div>
      <RowDiv>
        <Button onClick={getAttendanceBySection}>새로고침</Button>
        <Button onClick={postAttendance}>저장</Button>
      </RowDiv>
      <StyledTable>
        <thead>
          <tr>
            {attendanceColumns.map((column) => (
              <StyledTh key={column.key}>{column.label}</StyledTh>
            ))}
          </tr>
        </thead>

        <tbody>
          {studentList &&
            studentList.map((data, index) => (
              <tr key={index}>
                {attendanceColumns.map((column) => (
                  <StyledTd key={column.key}>
                    {column.key === "num" ? (
                      index + 1
                    ) : column.key === "attendance" ? (
                      <AttendanceLabel>
                        {attendanceType.map((type) => (
                          <Label key={type.key}>
                            <input
                              type="radio"
                              value={type.key}
                              checked={data.attendanceType === type.key}
                              onChange={() =>
                                handleInputChange(
                                  index,
                                  type.key,
                                  "attendanceType"
                                )
                              }
                            />
                            {type.label}
                          </Label>
                        ))}
                      </AttendanceLabel>
                    ) : column.key === "note" ? (
                      <InputNote
                        value={data.note}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value, "note")
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

export const Button = styled.button`
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

export default AtTable;
