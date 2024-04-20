import update from "immutability-helper";
import { useCallback, useContext } from "react";
import { Table, Td, Th, Tr } from "../../styles/CommonStyles.js";
import { LectureItem } from "./LectureItem.js";
import { DataContext } from "./WebLecture.js";

const LectureList = () => {
  const { lectureList, setLectureList, selectedLectureList, setSelectedLectureList } = useContext(DataContext);

  const lectureColumns = [
    { key: "index", label: "순번" },
    { key: "name", label: "수업명" },
    { key: "dayList/dateList", label: "요일/날짜" },
    { key: "time", label: "시간" },
    { key: "lectureRoom", label: "강의실" },
    { key: "teacher", label: "선생님" },
    { key: "check", label: "선택" },
  ];

  // const moveCard = useCallback((dragIndex, hoverIndex) => {
  //   setLectureList((prevCards) =>
  //     update(prevCards, {
  //       $splice: [
  //         [dragIndex, 1],
  //         [hoverIndex, 0, prevCards[dragIndex]],
  //       ],
  //     })
  //   );
  // }, []);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setLectureList((prevCards) => {
      const draggedCard = prevCards[dragIndex];
      const targetCard = prevCards[hoverIndex];

      // Swap the lectureSeq values
      const tempSeq = draggedCard.lectureSeq;
      draggedCard.lectureSeq = targetCard.lectureSeq;
      targetCard.lectureSeq = tempSeq;

      return update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedCard],
        ],
      });
    });
  }, []);

  // 체크박스 선택 시 학생 목록에 추가/제거
  const handleAllCheckboxChange = () => {
    if (selectedLectureList.length === lectureList.length) {
      setSelectedLectureList([]);
    }
    if (selectedLectureList.length !== lectureList.length) {
      setSelectedLectureList(lectureList.map((student) => student.id));
    }
  };

  return (
    <>
      <Table>
        <thead>
          <Tr>
            {lectureColumns.map((column) => (
              <Th key={column.key}>
                {column.key === "check" ? (
                  <input
                    type="checkbox"
                    checked={selectedLectureList.length === lectureList.length}
                    onChange={handleAllCheckboxChange}
                  />
                ) : (
                  column.label
                )}
              </Th>
            ))}
          </Tr>
        </thead>
        <tbody>
          {lectureList && lectureList.length > 0 ? (
            lectureList.map((lecture, index) => (
              <LectureItem
                index={index}
                lectureData={lecture}
                moveCard={moveCard}
                columns={lectureColumns}
              />
            ))
          ) : (
            <Tr>
              <Td colSpan="6">강의 목록이 없습니다.</Td>
            </Tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default LectureList;
