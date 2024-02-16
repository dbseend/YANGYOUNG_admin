import React, { useEffect } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalContainer = styled.div`
  width: 1000px;
  height: 500px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column; /* Align children in a column */
  justify-content: center; /* Center children vertically */
  align-items: center; /* Center children horizontally */
`;

const CloseButton = styled.button`
  margin-top: 20px; /* Add some space between content and the close button */
  background-color: #2d6f4c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const Modal = ({ onClose, studentInfo, lectureInfo, children }) => {
  useEffect(() => {
    function handleKeyPress(event) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const closeModal = () => {
    onClose();
  };

  return (
    <Overlay>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <h2>학생 정보</h2>
        <RowDiv>
          <p>이름: {studentInfo.name}</p>
          <p>학교: {studentInfo.school}</p>
          <p>연락처: {studentInfo.phoneNumber}</p>
          <p>학년: {studentInfo.grade}</p>
          <p>ID: {studentInfo.id}</p>
        </RowDiv>
        <h2>강의 정보</h2>
        {lectureInfo.map((lecture) => (
          <RowDiv key={lecture.id}>
            <p>이름: {lecture.name}</p>
            <p>요일: {lecture.day}</p>
            <p>시간: {lecture.time}</p>
            <p>강의실: {lecture.room}</p>
          </RowDiv>
        ))}
        {children}
        <CloseButton onClick={closeModal}>닫기</CloseButton>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
