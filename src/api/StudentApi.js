import axios from "axios";

export const addStudent = async (data) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_URL + `student`,
      data
    );
    console.log(response.data);
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
