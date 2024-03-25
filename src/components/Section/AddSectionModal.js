import React, { useState } from "react";
import styled from "styled-components";
import { addSectionAPI } from "../../api/SectionAPI";
const AddSectionModal = ({ onClose, onAdd }) => {
  const [newSection, setNewSection] = useState({
    name: "",
    teacher: "",
    homeRoom: "",
    studentIdList:[]
  });

  const handleNameChange = (e) => {
    setNewSection((prevSection) => ({
      ...prevSection,
      name: e.target.value,
    }));
  };

  const handleTeacherChange = (e) => {
    setNewSection((prevSection) => ({
      ...prevSection,
      teacher: e.target.value,
    }));
  };

  const handleHomeRoomChange = (e) => {
    setNewSection((prevSection) => ({
      ...prevSection,
      homeRoom: e.target.value,
    }));
  };

  const handleAddSection = async (e) => {
    try {
      e.preventDefault();
      if (newSection.name.trim() === "" || newSection.teacher.trim() === "") {
        alert("모든 필수 항목을 입력하세요.");
        return;
      }

      // const sectionData = {
      //   name: newSection.name,
      //   teacher: newSection.teacher,
      //   homeRoom: newSection.homeRoom,
      // };

      console.log("전송 데이터:", newSection);

      const response = await addSectionAPI(newSection);

      // 서버에서 데이터 추가 완료 후에 처리
      alert("분반 정보가 추가 되었습니다");

      // 실제 추가된 학생 정보를 사용하여 onAdd 호출
      onAdd(response);
      onClose();
      window.location.reload(true); // Reload the page
    } catch (error) {
      alert("에러 발생: " + error.message);
      console.error("Error adding student:", error);
    }
  };

  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalContent>
          <ModalHeader>
            <h2>분반 등록</h2>
            <CloseButton onClick={onClose}>닫기</CloseButton>
          </ModalHeader>
          <Form>
            <FormGroup>
              <Label>분반명</Label>
              <Input
                type="text"
                name="name"
                value={newSection.name}
                onChange={handleNameChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>담임</Label>
              <Input
                type="text"
                name="teacher"
                value={newSection.teacher}
                onChange={handleTeacherChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>홈룸</Label>
              <Input
                type="text"
                name="homeRoom"
                value={newSection.homeRoom}
                onChange={handleHomeRoomChange}
              />
            </FormGroup>

            <AddButton onClick={handleAddSection}>등록</AddButton>
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

export default AddSectionModal;
