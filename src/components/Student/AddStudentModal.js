import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { addStudent } from "../../api/StudentApi";
import { viewStudent } from "../../api/StudentApi";
const AddStudentModal = ({ onClose, onAdd }) => {
  const [newStudent, setNewStudent] = useState({
    id: 0,
    name: "",
    grade: "",
    school: "",
    phoneNumber: "",
    sectionId: 0,
  });
  const [sectionList, setSectionList] = useState([]);
  const [selectedSection, setSelectedSection] = useState(0);
  const [sectionId, setSectionId] = useState(0);

  useEffect(() => {
    viewAllStudent();
  }, []);

  const viewAllStudent = async () => {
    try {
      const response = await viewStudent();
      setSectionList(response.sectionList);
    } catch (error) {
      console.log("학생 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const formatPhoneNumber = (value) => {
    // Basic phone number formatting: 010-0000-0000
    const phoneNumberRegex = /^(\d{3})(\d{4})(\d{4})$/;
    const match = value.replace(/-/g, "").match(phoneNumberRegex);

    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }

    return value;
  };
  const setNewStudentSectionId = (newSectionId) => {
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      sectionId: newSectionId,
    }));
  };

  const handleDropdownChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedSection(selectedValue);
    setNewStudentSectionId(selectedValue);
    console.log(selectedValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "studentPhoneNumber") {
      setNewStudent((prevStudent) => ({
        ...prevStudent,
        [name]: formatPhoneNumber(value),
      }));
    } 
    else if (name === "parentPhoneNumber"){
      setNewStudent((prevStudent) => ({
        ...prevStudent,
        [name]: formatPhoneNumber(value),
      }));
    } else {
      setNewStudent((prevStudent) => ({ ...prevStudent, [name]: value }));
    }
  };

  const handleAddStudent = async (e) => {
    try {
      e.preventDefault();
      if (
        newStudent.id === 0 ||
        newStudent.name.trim() === "" ||
        newStudent.grade === "" ||
        newStudent.sectionId === "" ||
        newStudent.school.trim() === "" ||
        newStudent.studentPhoneNumber.trim() === "" ||
        newStudent.parentPhoneNumber.trim() === ""
      ) {
        alert("모든 필수 항목을 입력하세요.");
        return;
      }
      // Detailed phone number validation
      const phoneNumberRegex = /^(\d{3}-\d{4}-\d{4})?$/;
      if (
        newStudent.phoneNumber.trim() !== "" &&
        !phoneNumberRegex.test(newStudent.phoneNumber.trim())
      ) {
        alert("올바른 전화번호 형식이 아닙니다.");
        return;
      }
      const studentData = {
        id: newStudent.id,
        name: newStudent.name,
        school: newStudent.school,
        grade: newStudent.grade,
        phoneNumber: newStudent.phoneNumber,
        sectionId: newStudent.sectionId,
      };

      console.log("전송 데이터:", studentData);

      const response = await addStudent(studentData);

      // 서버에서 데이터 추가 완료 후에 처리
      alert("학생 정보가 추가 되었습니다");

      // 실제 추가된 학생 정보를 사용하여 onAdd 호출
      onAdd(response);
      onClose();
      window.location.reload(true); 
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
            <h2>학생 등록</h2>
            <CloseButton onClick={onClose}>닫기</CloseButton>
          </ModalHeader>
          <Form>
            <FormGroup>
              <Label>아이디</Label>
              <Input
                type="text"
                name="id"
                value={newStudent.id === 0 ? "" : newStudent.id}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>이름</Label>
              <Input
                type="text"
                name="name"
                value={newStudent.name}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>학년</Label>
              <Select
                name="grade"
                value={newStudent.grade}
                onChange={handleInputChange}
              >
                <option value="">학년 선택</option>
                <option value="M3">중3</option>
                <option value="H1">고1</option>
                <option value="H2">고2</option>
                <option value="H3">고3</option>
                {/* 다른 학년 옵션들 추가 */}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>반</Label>
              <Select
                onChange={handleDropdownChange}
                value={selectedSection || ""}
              >
                <option disabled value="">
                  반 선택
                </option>
                {sectionList.map((banOption) => (
                  <option key={banOption.id} value={banOption.id}>
                    {banOption.name}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>학교</Label>
              <Input
                type="text"
                name="school"
                value={newStudent.school}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>연락처</Label>
              <Input
                type="text"
                name="studentPhoneNumber"
                value={newStudent.studentPhoneNumber}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>부모님 연락처</Label>
              <Input
                type="text"
                name="parentPhoneNumber"
                value={newStudent.parentPhoneNumber}
                onChange={handleInputChange}
              />
            </FormGroup>

            <AddButton onClick={handleAddStudent}>추가</AddButton>
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

export default AddStudentModal;
