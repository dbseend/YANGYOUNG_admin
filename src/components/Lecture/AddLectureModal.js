import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { addLecture } from "../../api/LectureApi";
import { getSearchOptionAPI } from "../../api/UtilAPI";

const AddLectureModal = ({ onClose, onAdd }) => {
  const [newLecture, setNewLecture] = useState({
    name: "",
    teacher: "",
    dayList: [],
    startTime: { hour: 0, minute: 0, second: 0, nano: 0 },
    endTime: { hour: 0, minute: 0, second: 0, nano: 0 },
    room: "",
    sectionIdList: [],
  });
  const [sectionList, setSectionList] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedSectionIds, setSelectedSectionIds] = useState([]);
  const daysOfWeek = [
    { key: "월요일", label: "월" },
    { key: "화요일", label: "화" },
    { key: "수요일", label: "수" },
    { key: "목요일", label: "목" },
    { key: "금요일", label: "금" },
    { key: "토요일", label: "토" },
    { key: "일요일", label: "일" },
  ];

  useEffect(() => {
    viewSearchOption();
  }, []);

  const viewSearchOption = async () => {
    const response = await getSearchOptionAPI();
    setSectionList(response.sectionList);
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

  const handleDayChange = (day) => {
    const isSelected = selectedDays.includes(day);
    setSelectedDays((prevDays) =>
      isSelected
        ? prevDays.filter((prevDay) => prevDay !== day)
        : [...prevDays, day]
    );
  };

  const handleSectionIdChange = (sectionId) => {
    const isSelected = selectedSectionIds.includes(sectionId);
    setSelectedSectionIds((prevSectionIds) =>
      isSelected
        ? prevSectionIds.filter((prevSectionId) => prevSectionId !== sectionId)
        : [...prevSectionIds, sectionId]
    );
  };

  const handleStartTimeChange = (e) => {
    const time = e.target.value.split(":");
    setNewLecture((prevLecture) => ({
      ...prevLecture,
      startTime: {
        hour: parseInt(time[0]),
        minute: parseInt(time[1]),
        second: 0,
        nano: 0,
      },
    }));
  };

  const handleEndTimeChange = (e) => {
    const time = e.target.value.split(":");
    setNewLecture((prevLecture) => ({
      ...prevLecture,
      endTime: {
        hour: parseInt(time[0]),
        minute: parseInt(time[1]),
        second: 0,
        nano: 0,
      },
    }));
  };

  const handleRoomChange = (e) => {
    setNewLecture((prevLecture) => ({
      ...prevLecture,
      room: e.target.value,
    }));
  };

  const handleAddLecture = async (e) => {
    e.preventDefault();
    try {
      // 필수 입력 사항 확인
      if (
        newLecture.name.trim() === "" ||
        newLecture.teacher.trim() === "" ||
        newLecture.room.trim() === "" ||
        selectedDays.length === 0 ||
        selectedSectionIds.length === 0 ||
        (newLecture.startTime.hour === null) | // 시작 시간이 0시인 경우
          (newLecture.startTime.minute === null) || // 시작 분이 0분인 경우
        newLecture.endTime.hour === null || // 종료 시간이 0시인 경우
        newLecture.endTime.minute === null // 종료 분이 0분인 경우
      ) {
        alert("모든 필수 항목을 입력하세요.");
        return;
      }

      const lectureData = {
        name: newLecture.name,
        teacher: newLecture.teacher,
        dayList: selectedDays, // 수정된 부분
        startTime: formatTime(newLecture.startTime), // 시간 형식에 맞게 변환
        endTime: formatTime(newLecture.endTime), // 시간 형식에 맞게 변환
        room: newLecture.room,
        sectionIdList: selectedSectionIds,
        // sectionIdList: newLecture.sectionIdList,
      };

      console.log("전송 데이터:", lectureData);

      // addLecture 함수 호출
      const response = await addLecture(lectureData);

      alert("수업 정보가 추가되었습니다.");
      window.location.reload(true); // Reload the page
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
            <BigForm>
              <FormGroup>
                <Label>수업명</Label>
                <Input
                  type="text"
                  name="name"
                  value={newLecture.name}
                  onChange={handleNameChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>강사</Label>
                <Input
                  type="text"
                  name="teacher"
                  value={newLecture.teacher}
                  onChange={handleTeacherChange}
                />
              </FormGroup>
            </BigForm>
            <BigForm>
              <FormGroup>
                <Label>요일</Label>
                <DaySelection>
                  {daysOfWeek.map((day) => (
                    <DayButton
                      key={day.key}
                      selected={selectedDays.includes(day.key)}
                      onClick={() => handleDayChange(day.key)}
                    >
                      {day.label}
                    </DayButton>
                  ))}
                </DaySelection>
              </FormGroup>
              <FormGroup>
                <Label>강의실</Label>
                <Input
                  type="text"
                  name="room"
                  value={newLecture.room}
                  onChange={handleRoomChange}
                />
              </FormGroup>
            </BigForm>
            <BigForm>
              <FormGroup>
                <Label>시작 시간</Label>
                <Input
                  type="time"
                  value={formatTime(newLecture.startTime)}
                  onChange={handleStartTimeChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>마치는 시간</Label>
                <Input
                  type="time"
                  value={formatTime(newLecture.endTime)}
                  onChange={handleEndTimeChange}
                />
              </FormGroup>
            </BigForm>
            <Label>분반</Label>
            <Select
              onChange={(e) => handleSectionIdChange(e.target.value)}
              value={selectedSectionIds}
              multiple
            >
              {sectionList.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.name}
                </option>
              ))}
            </Select>
            {/* <Select
              onChange={handleSectionIdChange}
              value={selectedSectionIds}
              multiple
            >
              {sectionList &&
                sectionList.map((section) => (
                  <option selected = {selectedSectionIds.includes(section.key)} key={section.id} value={section.id}>
                    {section.name}
                  </option>
                ))}
            </Select> */}
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
  height: 70%;
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

const BigForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
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
  margin-bottom: 20px;
  margin-left: 2.3%;
  width: 95%;
  height: 300px;
  padding: 8px;
  font-size: 15px;
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

const DaySelection = styled.div`
  display: flex;
`;

const DayButton = styled.div`
  border: 1px solid #ccc;
  padding: 8px;
  margin: 4px;
  cursor: pointer;
  background: ${({ selected }) => (selected ? "#eee" : "white")};
`;

// 함수: 시간을 'hh:mm' 형식으로 포맷하는 함수
const formatTime = (time) => {
  const hour = time.hour.toString().padStart(2, "0");
  const minute = time.minute.toString().padStart(2, "0");
  return `${hour}:${minute}`;
};

export default AddLectureModal;
