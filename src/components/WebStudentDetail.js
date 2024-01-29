import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getStudentInfo, editStudentInfo } from "../api/StudentApi";
import { IoMdColorWand, IoIosTrash } from "react-icons/io";
const WebStudentDetail = () => {
  const { id } = useParams();
  const [studentPersonalInfo, setStudentPersonalInfo] = useState({});
  const [originalStudentPersonalInfo, setOriginalStudentPersonalInfo] =
    useState({});
  const [lectureInfo, setLectureInfo] = useState([]);
  const [taskInfo, setTaskInfo] = useState([]);
  const [lectureCount, setLectureCount] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchStudentDetail = async () => {
      try {
        const response = await getStudentInfo(id);
        setStudentPersonalInfo(response.studentResponse);
        setOriginalStudentPersonalInfo(response.studentResponse);
        setLectureInfo(
          response.lectureGetAllResponse.lectureGetOneResponseList
        );
        setTaskInfo(response.taskGetAllResponse.taskGetOneResponseList);
        setLectureCount(response.lectureGetAllResponse.count);
      } catch (error) {
        console.log("학생 상세 정보 가져오는 중 오류 발생: ", error);
      }
    };
    fetchStudentDetail();
  }, [id]);

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSaveChanges = async () => {
    try {
      await editStudentInfo(id, {
        studentId: studentPersonalInfo.id,
        school: studentPersonalInfo.school,
        grade: studentPersonalInfo.grade,
        phoneNumber: studentPersonalInfo.phoneNumber,
        sectionId: studentPersonalInfo.sectionId,
      });
      // 학생 정보가 성공적으로 업데이트되면 편집 모드를 해제합니다.
      setIsEditMode(false);
    } catch (error) {
      console.error("학생 정보 수정 중 오류 발생: ", error);
      // 에러 처리
    }
  };

  const handleCancelEdit = () => {
    setStudentPersonalInfo(originalStudentPersonalInfo); // 원래의 값으로 복원
    setIsEditMode(false); // 편집 모드 종료
  };

  return (
    <div>
      <h2>상세 정보</h2>
      <IconDiv>
        {isEditMode ? (
          <>
            <StyledSaveButton onClick={handleSaveChanges}>
              저장
            </StyledSaveButton>
            <StyledCancelButton onClick={handleCancelEdit}>
              취소
            </StyledCancelButton>
          </>
        ) : (
          <StyledColorWandIcon size={30} onClick={handleToggleEditMode} />
        )}
        <StyledTrashIcon size={30} />
      </IconDiv>
      {/* 학생 개인 정보 */}
      <Table>
        <tbody>
          <tr>
            <th>이름</th>
            <td>
              {isEditMode ? (
                <input
                  type="text"
                  value={studentPersonalInfo.name}
                  onChange={(e) =>
                    setStudentPersonalInfo({
                      ...studentPersonalInfo,
                      name: e.target.value,
                    })
                  }
                />
              ) : (
                studentPersonalInfo.name
              )}
            </td>
          </tr>
          <tr>
            <th>학번</th>
            <td>
              {isEditMode ? (
                <input
                  type="text"
                  value={studentPersonalInfo.id}
                  onChange={(e) =>
                    setStudentPersonalInfo({
                      ...studentPersonalInfo,
                      id: e.target.value,
                    })
                  }
                />
              ) : (
                studentPersonalInfo.id
              )}
            </td>
          </tr>
          <tr>
            <th>학교</th>
            <td>
              {isEditMode ? (
                <input
                  type="text"
                  value={studentPersonalInfo.school}
                  onChange={(e) =>
                    setStudentPersonalInfo({
                      ...studentPersonalInfo,
                      school: e.target.value,
                    })
                  }
                />
              ) : (
                studentPersonalInfo.school
              )}
            </td>
          </tr>
          <tr>
            <th>학년</th>
            <td>
              {isEditMode ? (
                <input
                  type="text"
                  value={studentPersonalInfo.grade}
                  onChange={(e) =>
                    setStudentPersonalInfo({
                      ...studentPersonalInfo,
                      grade: e.target.value,
                    })
                  }
                />
              ) : (
                studentPersonalInfo.grade
              )}
            </td>
          </tr>
          <tr>
            <th>연락처</th>
            <td>
              {isEditMode ? (
                <input
                  type="text"
                  value={studentPersonalInfo.phoneNumber}
                  onChange={(e) =>
                    setStudentPersonalInfo({
                      ...studentPersonalInfo,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              ) : (
                studentPersonalInfo.phoneNumber
              )}
            </td>
          </tr>
          <tr>
            <th>반</th>
            <td>
              {isEditMode ? (
                <input
                  type="text"
                  value={studentPersonalInfo.sectionName}
                  onChange={(e) =>
                    setStudentPersonalInfo({
                      ...studentPersonalInfo,
                      sectionName: e.target.value,
                    })
                  }
                />
              ) : (
                studentPersonalInfo.sectionName
              )}
            </td>
          </tr>
        </tbody>
      </Table>
      {/* 수강 정보 */}
      <h3>수강 정보</h3>
      <p>총 강의 수: {lectureCount}</p> {/* 강의 수 출력 */}
      <Table>
        <thead>
          <tr>
            <th>강의명</th>
            <th>요일</th>
            <th>시간</th>
            <th>강의실</th>
          </tr>
        </thead>
        <tbody>
          {lectureInfo.map((lecture) => (
            <tr key={lecture.id}>
              <td>{lecture.name}</td>
              <td>{lecture.day}</td>
              <td>{lecture.time}</td>
              <td>{lecture.room}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* 과제 정보 */}
      {/* <h3>과제 정보</h3>
        <Table>
          <thead>
            <tr>
              <th>과제</th>
              <th>진행 상태</th>
            </tr>
          </thead>
          <tbody>
            {taskInfo.map((task) => (
              <tr key={task.id}>
                <td>{task.assignment}</td>
                <td>{task.taskProgress}</td>
              </tr>
            ))}
          </tbody>
        </Table> */}
    </div>
  );
};

const IconDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  margin-top: 20px;
  gap: 20px;
  @media screen and (max-width: 768px) {
    margin-right: 50px;
  }
`;

const StyledColorWandIcon = styled(IoMdColorWand)`
  cursor: pointer;
`;

const StyledTrashIcon = styled(IoIosTrash)`
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;
const StyledSaveButton = styled.button`
  cursor: pointer;
`;

const StyledCancelButton = styled.button`
  /* 버튼에 대한 스타일 지정 */
  cursor: pointer;
`;
export default WebStudentDetail;
