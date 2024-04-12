import { useEffect, useState } from "react";
import { useParams, useNavigate, useInRouterContext } from "react-router-dom";
import styled from "styled-components";
import { getOneSectionAPI, deleteSectionStudentAPI } from "../../api/SectionAPI";
import {
  Button,
  ListTable,
  ListTd,
  ListTh,
  ListTr,
  RowDiv,
  SubTitle,
} from "../../styles/CommonStyles";

const WebSectionStudentList = () => {
  const { id } = useParams();
  const [sectionInfo, setSectionInfo] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [studentCount, setStudentCount] = useState(0);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const students = [
    { key: "name", label: "이름" },
    { key: "school", label: "학교" },
    { key: "grade", label: "학년" },
    { key: "check", label: "선택" },
  ];

  // 선택된 학생 목록 업데이트 함수
  const updateSelectedStudents = (newSelectedStudents) => {
    setSelectedStudents(newSelectedStudents);
  };

  const openNewWindow = () => {
    // 새 창의 너비와 높이 설정
    const screenWidth = window.screen.availWidth;
    const screenHeight = window.screen.availHeight;
    const w = screenWidth / 2;
    const h = screenHeight;
    // id 값을 가져와서 경로를 생성
    const newPath = `/section/${id}/newWindow`;

    // 새 창 열기
    const newWindow = window.open(newPath, "_blank", `width=${w}, height=${h}`);

    window.addEventListener('message', (event) => {
      if (event.origin !== window.location.origin) return; // 보안을 위해 오리진을 확인합니다.
      if (event.data === 'refresh') {
        window.location.reload(); // 새로고침합니다.
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOneSectionAPI(id);
        console.log(response);
        setStudentList(response.studentAllResponse.studentResponseList); // 학생 목록
        setStudentCount(response.studentAllResponse.size); // 학생 수
        setSectionInfo(response.sectionResponse); // 반 목록
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, [id]);

  // 체크박스 리스트 전체 선택 및 해제
  const handleAllCheckboxChange = () => {
    if (selectedStudents.length === studentList.length) {
      setSelectedStudents([]);
    }
    if (selectedStudents.length !== studentList.length) {
      setSelectedStudents(studentList.map((student) => student.id));
    }
  };

  // 체크박스 선택 시 학생 목록에 추가/제거
  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prevSelected) => {
      if (prevSelected.includes(studentId)) {
        return prevSelected.filter((id) => id !== studentId);
      } else {
        return [...prevSelected, studentId];
      }
    });
  };

  const deleteSectionStudent = () => {
    console.log (sectionInfo.id, selectedStudents);
    const data = {
      sectionId: sectionInfo.id,
      studentIdList: selectedStudents
    };
    console.log (data);
    deleteSectionStudentAPI(data);
  };

  // useEffect(() => {
  //   console.log(selectedStudents);
  // }, [selectedStudents]);
  
  return (
    <div>
      <SubTitle>학생</SubTitle>
      <p>
        {sectionInfo.name} 분반에는 총 {studentCount}명의 학생이 배정되어
        있습니다.
      </p>
      <RowDiv style={{ marginBottom: 10 }}>
        <Button style={{ marginRight: 10 }} onClick={openNewWindow}>
          등록
        </Button>
        <Button style={{ marginRight: 10 }} onClick={deleteSectionStudent}>
          등록
        </Button>
      </RowDiv>

      <ListTable>
        <thead>
          <ListTr>
            {students &&
              students.map((student) => (
                <ListTh key={student.key}>
                  {student.key === "check" ? (
                    <input
                      type="checkbox"
                      checked={selectedStudents.length === studentList.length}
                      onClick={handleAllCheckboxChange}
                    />
                  ) : (
                    student.label
                  )}
                </ListTh>
              ))}
          </ListTr>
        </thead>
        <tbody>
          {studentList &&
            studentList.map((student, index) => (
              <ListTr key={index}>
                {students.map((col) => (
                  <ListTd key={col.key}>
                    {col.key === "check" ? (
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => handleCheckboxChange(student.id)}
                      />
                    ) : (
                      <div>{student[col.key]}</div>
                    )}
                  </ListTd>
                ))}
              </ListTr>
            ))}
        </tbody>
      </ListTable>
    </div>
  );
};

export default WebSectionStudentList;
