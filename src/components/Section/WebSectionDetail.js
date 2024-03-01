import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getOneSection } from "../../api/SectionAPI";

const lectures = [
  { key: "name", label: "강의명" },
  { key: "dayList", label: "요일" },
  { key: "time", label: "시간" },
  { key: "teacher", label: "선생님" },
  { key: "room", label: "강의실" },
];

const WebSectionDetail = () => {
  const { id } = useParams();
  const [sectionOneInfo, setSectionOneInfo] = useState({});
  const [sectionLectureInfo, setSectionLectureInfo] = useState({
    lectureGetAllResponse: [],
    count: 0,
  });


  const [studentPersonalInfo, setStudentPersonalInfo] = useState([]);
  const [lectureList, setLectureList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [grades, setGrades] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOneSection(id); 
        console.log(response.data);
        setStudentPersonalInfo(response.studentAllResponse.studentResponseList); // 학생 정보
        console.log(response.studentAllResponse.studentResponseList);
        // setLectureList(response.lectureAllResponse.lectureResponseList); // 수업 목록
        // setSectionList(response.studentAllResponse.sectionList); // 반 목록
        // setGrades(response.studentAllResponse.gradeList); // 학년 목록
        // setTasks(response.sectionTaskAllResponse.sectionTaskResponseList); // 과제 목록
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, [id]);

  // useEffect(() => {
  //   const fetchStudentDetail = async () => {
  //     try {
  //       const response = await getOneSection(id);
  //       console.log(response);

  //       // 첫 번째 상태 업데이트
  //       setSectionOneInfo(response.data.sectionResponse);
  //       console.log(
  //         "sectionOneInfo after update:",
  //         response.data.sectionResponse
  //       );

  //       // 두 번째 상태 업데이트
  //       setSectionLectureInfo(response.data.lectureAllResponse);
  //       console.log(
  //         "sectionLectureInfo after update:",
  //         response.data.lectureAllResponse
  //       );
  //     } catch (error) {
  //       console.log("분반 상세 정보 가져오는 중 오류 발생: ", error);
  //     }
  //   };
  //   fetchStudentDetail();
  // }, [id]);
  return (
    <Div>
      <Title>상세 정보</Title>
  
      {/* 분반 정보 */}
      <Guide1>분반 정보</Guide1>
      <Table>
        <tbody>
          <tr>
            <th>분반명</th>
            <td>{sectionOneInfo.name}</td>
            <th>담임</th>
            <td>{sectionOneInfo.teacher}</td>
            <th>id</th>
            <td>{sectionOneInfo.id}</td>
          </tr>
        </tbody>
      </Table>
  
      {/* 수강 정보 */}
      <Guide2>수강 정보</Guide2>
      <p>
        {sectionOneInfo.name} 분반에는 총 {sectionLectureInfo.count}개의 수업이 배정되어 있습니다.
      </p>
      <Table>
        <thead>
          <tr>
            {lectures &&
              lectures.map((lecture) => (
                <th key={lecture.key}>{lecture.label}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {sectionLectureInfo.lectureResponseList &&
            sectionLectureInfo.lectureResponseList.map((lecture, index) => (
              <tr key={index}>
                {lectures.map((col) => (
                  <td key={col.key}>
                    {col.key === "index"
                      ? index + 1
                      : col.key === "dayList"
                      ? lecture.dayList.join(", ")
                      : col.key === "time"
                      ? `${lecture.startTime.slice(0, 5)}-${lecture.endTime.slice(0, 5)}`
                      : lecture[col.key]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </Table>
    </Div>
  );
  
//   return (
//     <Div>
//       <Title>상세 정보</Title>
//       <Guide1>분반 정보</Guide1>
//       <Table>
//         <tbody>
//           <tr>
//             <th>분반명</th>
//             <td>{sectionOneInfo.name}</td>
//             <th>담임</th>
//             <td>{sectionOneInfo.teacher}</td>
//             <th>id</th>
//             <td>{sectionOneInfo.id}</td>
//           </tr>
//         </tbody>
//       </Table>

//       <Guide2>수강 정보</Guide2>
//       <p>
//         {sectionOneInfo.name} 분반에는 총 {sectionLectureInfo.count}개의 수업이
//         배정되어 있습니다.
//       </p>
//       <Table>
//         <thead>
//           <tr>
//             {lectures &&
//               lectures.map((lecture) => (
//                 <th key={lecture.key}>{lecture.label}</th>
//               ))}
//           </tr>
//         </thead>
//         <tbody>
//           {sectionLectureInfo.lectureResponseList &&
//             sectionLectureInfo.lectureResponseList.map((lecture, index) => (
//               <tr key={index}>
//                 {lectures.map((col) => (
//                   <td key={col.key}>
//                     {col.key === "index"
//                       ? index + 1
//                       : col.key === "dayList"
//                       ? lecture.dayList.join(", ")
//                       : col.key === "time"
//                       ? `${lecture.startTime.slice(
//                           0,
//                           5
//                         )}-${lecture.endTime.slice(0, 5)}`
//                       : lecture[col.key]}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//         </tbody>
//       </Table>
//     </Div>
//   );
};

const Div = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  overflow: auto;
  margin-top: 100px;
  margin-left: 12.5%;
  margin-right: 12.5%;
`;

const Title = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Guide1 = styled.h3`
  margin-top: 20px;
`;

const Guide2 = styled.h3`
  margin-top: 40px;
`;

const Table = styled.table`
  width: 50%;
  border-collapse: collapse;

  th {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: center;
    background-color: #f2f2f2;
    width: 15%;
  }

  td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: center;
  }
`;

export default WebSectionDetail;
