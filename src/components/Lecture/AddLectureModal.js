import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { addLecture } from "../../api/LectureApi";
import { viewStudent } from "../../api/StudentApi";

const AddLectureModal = ({ onClose, onAdd }) => {
  const [newLecture, setNewLecture] = useState({
    name: "",
    teacher: "",
    dayList: [],
    startTime: { hour: 0, minute: 0, second: 0, nano: 0 },
    endTime: { hour: 0, minute: 0, second: 0, nano: 0 },
    room: "",
    sectionId: 0,
  });
  const [sectionList, setSectionList] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const daysOfWeek = [
    { id: 1, label: "월" },
    { id: 2, label: "화" },
    { id: 3, label: "수" },
    { id: 4, label: "목" },
    { id: 5, label: "금" },
    { id: 6, label: "토" },
    { id: 7, label: "일" },
  ];

  useEffect(() => {
    viewAllStudent();
  }, []);

  const viewAllStudent = async () => {
    try {
      const response = await viewStudent();
      setSectionList(response.sectionList);
      setNewLecture((prevLecture) => ({
        ...prevLecture,
        sectionId: response.sectionList.length > 0 ? response.sectionList[0].id : 0,
      }));
    } catch (error) {
      console.log("학생 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const handleNameChange = (e) => {
    setNewLecture((prevLecture) => ({
      ...prevLecture,
      name: e.target.value,
    }));
  };

  const handleTeacherChange = (e) => {
    setNewLecture((prevLecture) => ({
      ...prevLecture,
      teacher: e.target.value,
    }));
  };

  const handleDayChange = (dayId) => {
    const isSelected = selectedDays.includes(dayId);
    setSelectedDays((prevDays) =>
      isSelected ? prevDays.filter((day) => day !== dayId) : [...prevDays, dayId]
    );
  };

  const handleStartTimeChange = (e) => {
    const time = e.target.value.split(":");
    setNewLecture((prevLecture) => ({
      ...prevLecture,
      startTime: { hour: parseInt(time[0]), minute: parseInt(time[1]), second: 0, nano: 0 },
    }));
  };

  const handleEndTimeChange = (e) => {
    const time = e.target.value.split(":");
    setNewLecture((prevLecture) => ({
      ...prevLecture,
      endTime: { hour: parseInt(time[0]), minute: parseInt(time[1]), second: 0, nano: 0 },
    }));
  };

  const handleRoomChange = (e) => {
    setNewLecture((prevLecture) => ({
      ...prevLecture,
      room: e.target.value,
    }));
  };

  const handleSectionIdChange = (e) => {
    setNewLecture((prevLecture) => ({
      ...prevLecture,
      sectionId: parseInt(e.target.value),
    }));
  };

  const handleAddLecture = async (e) => {
    e.preventDefault();
    try {
      if (
        newLecture.name.trim() === "" ||
        newLecture.teacher.trim() === "" ||
        newLecture.room.trim() === "" ||
        selectedDays.length === 0 ||
        newLecture.sectionId === 0
      ) {
        alert("모든 필수 항목을 입력하세요.");
        return;
      }

      const lectureData = {
        name: newLecture.name,
        teacher: newLecture.teacher,
        dayList: selectedDays.map((dayId) => daysOfWeek.find((day) => day.id === dayId).label),
        startTime: newLecture.startTime,
        endTime: newLecture.endTime,
        room: newLecture.room,
        sectionId: newLecture.sectionId,
      };

      console.log("전송 데이터:", lectureData);

      const response = await addLecture(lectureData);

      alert("수업 정보가 추가되었습니다.");
      onAdd(response);
      onClose();
    } catch (error) {
      console.error("Error adding lecture:", error);
      alert("수업 추가 중 오류가 발생했습니다.");
    }
  };

  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalContent>
          <ModalHeader>
            <h2>수업 등록</h2>
            <CloseButton onClick={onClose}>닫기</CloseButton>
          </ModalHeader>
          <Form onSubmit={handleAddLecture}>
            <FormGroup>
              <Label>수업명</Label>
              <Input type="text" name="name" value={newLecture.name} onChange={handleNameChange} />
            </FormGroup>
            <FormGroup>
              <Label>강사</Label>
              <Input type="text" name="teacher" value={newLecture.teacher} onChange={handleTeacherChange} />
            </FormGroup>
            <FormGroup>
              <Label>요일</Label>
              <div style={{ display: "flex" }}>
                {daysOfWeek.map((day) => (
                  <div
                    key={day.id}
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      margin: "4px",
                      cursor: "pointer",
                      background: selectedDays.includes(day.id) ? "#eee" : "white",
                    }}
                    onClick={() => handleDayChange(day.id)}
                  >
                    {day.label}
                  </div>
                ))}
              </div>
            </FormGroup>
            <FormGroup>
              <Label>시작 시간</Label>
              <Input type="time" value={formatTime(newLecture.startTime)} onChange={handleStartTimeChange} />
            </FormGroup>
            <FormGroup>
              <Label>마치는 시간</Label>
              <Input type="time" value={formatTime(newLecture.endTime)} onChange={handleEndTimeChange} />
            </FormGroup>
            <FormGroup>
              <Label>강의실</Label>
              <Input type="text" name="room" value={newLecture.room} onChange={handleRoomChange} />
            </FormGroup>
            <FormGroup>
              <Label>분반</Label>
              <Select onChange={handleSectionIdChange} value={newLecture.sectionId}>
                {sectionList.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.name}
                  </option>
                ))}
              </Select>
            </FormGroup>
            <AddButton type="submit">등록</AddButton>
          </Form>
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalWrapper = styled.div`
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px; /* 최대 넓이 설정 */
  width: 100%;
`;

const ModalContent = styled.div`
  padding: 20px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;

  h2 {
    font-size: 1.5rem;
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #666;
`;

const Form = styled.form``;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 1rem;
  display: block;
  margin-bottom: 8px;
  color: #333;
  text-align: left;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const AddButton = styled.button`
  background: #000;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
`;

// 함수: 시간을 'hh:mm' 형식으로 포맷하는 함수
const formatTime = (time) => {
  const hour = time.hour.toString().padStart(2, '0');
  const minute = time.minute.toString().padStart(2, '0');
  return `${hour}:${minute}`;
};

export default AddLectureModal;
