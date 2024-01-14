import React from "react";
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
  width: 50%;
  height: 50%;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const CloseButton = styled.button`
  background-color: #2d6f4c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
`;

const List = styled.div`
display: flex;
flex-direction: column;
`
const Modal = ({ onClose, studentInfo, lectureInfo, children }) => {
  const closeModal = () => {
    onClose();
  };

  return (
    <Overlay onClick={closeModal}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <div>
          <h1>학생 정보</h1>
          <p>ID: {studentInfo.id}</p>
          <p>이름: {studentInfo.name}</p>
          <p>학교: {studentInfo.school}</p>
          <h1>강의 정보</h1>
          {lectureInfo.map((lecture) => (
            <List key={lecture.id}>
              <div>이름: {lecture.name}</div>
              <div>요일: {lecture.day}</div>
              <div>시간: {lecture.time}</div>
              <div>강의실: {lecture.room}</div>
            </List>
          ))}
        </div>
        {children}
        <CloseButton onClick={closeModal}>닫기</CloseButton>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
