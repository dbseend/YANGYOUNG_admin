import axios from "axios";

export const addStudent = async (id, name, school, grade, phoneNumber) => {
  const data = {
    id: id,
    name: name,
    school: school,
    grade: grade,
    phoneNumber: phoneNumber,
  };

  try {
    const response = await axios.post(
      process.env.REACT_APP_URL + `/student`,
      data
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const addStudentSection = async (id, sId) => {
  const data = {
    id: id,
    sId: sId,
  };
  try {
    const response = await axios.post(
      process.env.REACT_APP_URL + `/student/enrollment`,
      data
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export const viewStudent = async () => {
  try {
    const response = await axios.get(process.env.REACT_APP_URL + `/student`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
