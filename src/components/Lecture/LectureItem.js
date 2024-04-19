import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../../components/ItemTypes.js";
import { Tr, Td } from "../../styles/CommonStyles.js";
import { DataContext } from "./WebLecture.js";


export const LectureItem = ({
  index,
  lectureData,
  moveCard,
  columns,
}) => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { selectedLectureList, setSelectedLectureList } = useContext(DataContext);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.LECTURE,
    item: () => {
      return { id: lectureData.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.LECTURE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // lectureData.lectureSeq = hoverIndex;
      moveCard(dragIndex, hoverIndex);
      console.log("moveCard: ", dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  // 체크박스 선택 시 학생 목록에 추가/제거
  const handleCheckboxChange = (lectureId) => {
    console.log(lectureId);
    setSelectedLectureList((prevSelected) => {
      if (prevSelected.includes(lectureId)) {
        return prevSelected.filter((id) => id !== lectureId);
      } else {
        return [...prevSelected, lectureId];
      }
    });
  };

  const moveToLectureDetail = (lectureId) => {
    navigate(`/lecture/${lectureId}`);
  };

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <Tr ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      {columns.map((column) => (
        <Td
          key={column.key}
          onClick={
            column.key !== "check"
              ? () => moveToLectureDetail(lectureData.id)
              : null
          }
        >
          {column.key === "index" && index + 1}
          {column.key === "name" && lectureData.name}
          {column.key === "dayList/dateList" &&
            (lectureData.dayList.length > 0
              ? lectureData.dayList.join(", ")
              : lectureData.dateList.length > 0
              ? lectureData.dateList.join(", ")
              : null)}
          {column.key === "time" &&
            `${lectureData.startTime.slice(0, 5)}-${lectureData.endTime.slice(
              0,
              5
            )}`}
          {column.key === "homeRoom" && lectureData.homeRoom}
          {column.key === "lectureRoom" && lectureData.lectureRoom}
          {column.key === "teacher" && lectureData.teacher}
          {column.key === "check" && (
            <input
              type="checkbox"
              checked={selectedLectureList.includes(lectureData.id)}
              onChange={() => handleCheckboxChange(lectureData.id)}
            />
          )}
        </Td>
      ))}
    </Tr>
  );
};
