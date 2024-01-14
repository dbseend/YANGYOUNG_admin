import axios from "axios";

export const addStudent = async (id, name, school, grade, phoneNumber) => {
  try {
    const result = {
      id: id,
      name: name,
      school:school,
      grade:grade,
      phoneNumber:phoneNumber,
    };
    const response = await axios.post(
      process.env.REACT_APP_URL+ `student`,
      result
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const addStudentSection = async (id, sId) => {
  const data = {
    studentId: id,
    sectionId: sId,
  };
  try {
    const response = await axios.post(
      process.env.REACT_APP_URL + `student/enrollment`,
      data
    );
    console.log(response);
  } catch (error) {
    console.error(error);
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
      process.env.REACT_APP_URL + `student/lecture/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
