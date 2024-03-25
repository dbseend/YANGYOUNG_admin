import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { addStudentAPI } from "../../api/StudentAPI";
import { getSearchOptionAPI } from "../../api/UtilAPI";

const AddStudentModal = ({ onClose, onAdd }) => {
  const [newStudent, setNewStudent] = useState({
    id: 0,
    name: "",
    grade: "",
    school: "",
    phoneNumber: "",
    sectionId: [],
  });
  const [sectionList, setSectionList] = useState([]);
  const [selectedSectionList, setSelectedSectionList] = useState([]);

  useEffect(() => {
    getSearchOption();
  }, []);

  // 검색 옵션 조회(반, 학교, 학년)
  const getSearchOption = async () => {
    await getSearchOptionAPI().then((response) => {
      console.log(response);
      setSectionList(response.sectionList);
    });
  };

  // 전화번호 정규화
  const formatPhoneNumber = (value) => {
    // Basic phone number formatting: 010-0000-0000
    const phoneNumberRegex = /^(\d{3})(\d{4})(\d{4})$/;
    const match = value.replace(/-/g, "").match(phoneNumberRegex);

    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }

    return value;
  };

  // 학생 추가
  const handleAddStudent = async (e) => {
    try {
      e.preventDefault();
      // Form validation 확인
      if (!isFormValid()) {
        alert("모든 항목을 입력해주세요.");
        return;
      }
      if (
        isPhoneNumberValid(newStudent.studentPhoneNumber) === false ||
        isPhoneNumberValid(newStudent.parentPhoneNumber) === false
      ) {
        alert("올바른 전화번호 형식이 아닙니다.");
        return;
      }

      // 학생 추가 API 호출
      const studentData = {
        id: parseInt(newStudent.id),
        name: newStudent.name,
        school: newStudent.school,
        grade: newStudent.grade,
        studentPhoneNumber: newStudent.studentPhoneNumber,
        parentPhoneNumber: newStudent.parentPhoneNumber,
        sectionIdList: selectedSectionList.map((section) =>
          parseInt(section, 10)
        ),
      };
      const response = await addStudentAPI(studentData);

      // 학생 추가 성공 시
      alert("학생 인적사항이 등록되었습니다");
      onAdd(response);
      onClose();
      window.location.reload(true);
    } catch (error) {
      // 학생 추가 실패 시
      alert("학생 인적사항 등록 중 오류가 발생했습니다");
    }
  };

  // Form validation 확인
  const isFormValid = () => {
    if (
      newStudent.id !== 0 &&
      newStudent.name.trim() !== "" &&
      newStudent.grade !== "" &&
      selectedSectionList.length !== 0 &&
      newStudent.school.trim() !== ""
    ) {
      return true;
    }
    return false;
  };

  // 전화번호 형식 확인
  const isPhoneNumberValid = (phoneNumber) => {
    const phoneNumberRegex = /^(\d{3}-\d{4}-\d{4})?$/;
    if (phoneNumber !== "" && !phoneNumberRegex.test(phoneNumber)) {
      return false;
    }
  };

  // 반 선택 핸들러
  const handleDropdownChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedSectionList(selectedOptions);
  };

  // 입력값 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "studentPhoneNumber") {
      setNewStudent((prevStudent) => ({
        ...prevStudent,
        [name]: formatPhoneNumber(value),
      }));
    } else if (name === "parentPhoneNumber") {
      setNewStudent((prevStudent) => ({
        ...prevStudent,
        [name]: formatPhoneNumber(value),
      }));
    } else {
      setNewStudent((prevStudent) => ({ ...prevStudent, [name]: value }));
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
              <Label>학교</Label>
              <Input
                type="text"
                name="school"
                value={newStudent.school}
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
              <Label>반(다중 선택 시 ctrl 또는 shift를 사용해주세요)</Label>
              <Select
                onChange={handleDropdownChange}
                value={selectedSectionList}
                multiple
              >
                {sectionList.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.name}
                  </option>
                ))}
              </Select>
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
