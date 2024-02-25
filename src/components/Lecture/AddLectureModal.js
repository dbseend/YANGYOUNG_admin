import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { addLecture } from "../../api/LectureApi";
import { viewStudent } from "../../api/StudentApi";

const AddLectureModal = ({ onClose, onAdd }) => {
  const [newLecture, setNewLecture] = useState({
    name: "",
    teacher: "",
    day: "MONDAY",
    time: "T1",
    room: "R1",
    sectionId: 0,
  });
  const [selectedSection, setSelectedSection] = useState("");
  //   const [sectionList, setSectionList] = useState([]);
  const [sectionId, setSectionId] = useState(0);
  const [sectionList, setSection] = useState([]);

  useEffect(() => {
    viewAllStudent();
  }, []);

  const viewAllStudent = async () => {
    try {
      const response = await viewStudent();

      setSection(response.sectionList);
      setSectionId(response.sectionList[0].id);

      console.log(response);
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

  const handleDayChange = (e) => {
    setNewLecture((prevLecture) => ({
      ...prevLecture,
      day: e.target.value,
    }));
  };

  const handleTimeChange = (e) => {
    setNewLecture((prevLecture) => ({
      ...prevLecture,
      time: e.target.value,
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
      room: e.target.value,
    }));
  };

  // const handleDropdownChange = (e, type) => {
  //   const selectedValue = e.target.value;
  //   setSelectedSection(selectedValue);
  //   console.log("selectedValue: ", e.target.value);
  //   // setSectionId(sectionList[selectedValue].id);
  //   console.log("sectionId: ", sectionList[selectedValue].id);

  //   if (type === "section") {
  //     // 여기서 selectedValue는 이미 인덱스이므로 직접 사용 가능
  //     // setSectionId(sectionList[selectedValue].id);
  //   }
  // };
  const handleDropdownChange = (e) => {
    const selectedValue = e.target.value;
    console.log("selectedValue: ", selectedValue);
    console.log("sectionList[selectedValue].id: ", sectionList[selectedValue].id);
    setSelectedSection(selectedValue);
    setSectionId(sectionList[selectedValue].id);
  };

  const handleAddLecture = async (e) => {
    console.log("sectionId: ", sectionId);
    try {
      e.preventDefault();
      if (newLecture.name.trim() === "" || newLecture.teacher.trim() === "") {
        alert("모든 필수 항목을 입력하세요.");
        return;
      }

      const lectureData = {
        name: newLecture.name,
        teacher: newLecture.teacher,
        day: newLecture.day,
        time: newLecture.time,
        room: newLecture.room,
        sectionId: sectionId,
      };

      console.log("전송 데이터:", lectureData);

      const response = await addLecture(lectureData);

      // 서버에서 데이터 추가 완료 후에 처리
      alert("수업 정보가 추가 되었습니다");

      // 실제 추가된 학생 정보를 사용하여 onAdd 호출
      onAdd(response);
      onClose();
      //   window.location.reload(true); // Reload the page
    } catch (error) {
      alert("에러 발생: " + error.message);
      console.error("Error adding lecture:", error);
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
          <Form>
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

            <FormGroup>
              <Label>요일</Label>
              <Input
                type="text"
                name="day"
                // value={newLecture.day}
                value="MONDAY"
                onChange={handleDayChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>시간</Label>
              <Input
                type="text"
                name="time"
                // value={newLecture.time}
                value="T1"
                onChange={handleTimeChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>강의실</Label>
              <Input
                type="text"
                name="room"
                // value={newLecture.room}
                value="R1"
                onChange={handleRoomChange}
              />
            </FormGroup>
            <FormGroup>
              <Select
                onChange={(e) => handleDropdownChange(e)}
                value={selectedSection}
              >
                {sectionList.map(
                  (
                    banOption,
                    index // index 매개변수 추가
                  ) => (
                    <option key={index} value={index}>
                      {banOption.name}
                    </option>
                  )
                )}
              </Select>
            </FormGroup>

            <AddButton onClick={handleAddLecture}>등록</AddButton>
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

export default AddLectureModal;