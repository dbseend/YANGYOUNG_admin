import axios from "axios";

// 학생 정보 등록 API 호출
export const addStudent = async (studentData) => {
  const data = {
    id: studentData.id,
    name: studentData.name,
    school: studentData.school,
    grade: studentData.grade,
    studentPhoneNumber: studentData.studentPhoneNumber,
    parentPhoneNumber: studentData.parentPhoneNumber,

    sectionId: studentData.sectionId,
  };
  try {
    const response = await axios.post(
      process.env.REACT_APP_URL + `student`,
      data
    );
    console.log(response.data);
    return response;
  } catch (error) {
    alert("학생 인적사항 등록 중 오류가 발생했습니다");
    console.error("Error adding student:", error);
  }
};

// 학생 정보 조회 API 호출
export const viewStudent = async () => {
  try {
    const response = await axios.get(process.env.REACT_APP_URL + `student`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 학생 정보 수정 API 호출
export const getStudentInfo = async (id) => {
  console.log(id);
  try {
    const response = await axios.get(
      process.env.REACT_APP_URL + `student/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 학생 정보 수정 API 호출
export const editStudentInfo = async (studentData) => {
  try {
    const response = await axios.patch(
      // 'http://localhost:8080/api/v0/student',
      process.env.REACT_APP_URL + `student`,
      studentData
    );
    return response.data;
  } catch (error) {
    console.error("학생 정보 수정 중 오류 발생: ", error);
    throw error;
  }
};

// 학생 정보 삭제 API 호출
export const deleteStudent = async (id) => {
  try {
    await axios.delete(process.env.REACT_APP_URL + `student/${id}`, id);
  } catch (error) {
    console.error("학생 삭제 중 오류 발생:", error);
    throw error;
  }
};
