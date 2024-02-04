import axios from "axios";

export const addStudent = async (data) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_URL + `student`,
      data
    );
    console.log(response.data);
    alert("학생 정보가 등록되었습니다.");
    return response.data;
  } catch (error) {
    alert("학생 인적사항 등록 중 오류가 발생했습니다");
    console.error("Error adding student:", error);
  }
};

export const viewStudent = async () => {
  try {
    const response = await axios.get(process.env.REACT_APP_URL + `student`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

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
export const editStudentInfo = async (data) => {
  console.log(data);
  try {
    const response = await axios.patch(
      process.env.REACT_APP_URL + `student`, // 요청 URL
      data, // 요청 본문 데이터
      {
        headers: {
          "Content-Type": "application/json", // 요청 본문의 Content-Type 설정
          Accept: "application/json", // 서버로부터 JSON 형식의 응답을 받기 위한 Accept 헤더 설정
        },
      }
    );
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("학생 정보 수정 중 오류 발생: ", error);
    throw error; // 에러 던지기
  }
};

export const deleteStudent = async (id) => {
  try {
    await axios.delete(
      process.env.REACT_APP_URL + `student/${id}`,
      id
    );
  } catch (error) {
    console.error("학생 삭제 중 오류 발생:", error);
    throw error;
  }
};
