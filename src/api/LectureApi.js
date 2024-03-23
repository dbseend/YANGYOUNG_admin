import axios from "axios";

export const viewLecture = async () => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_URL + `lecture`
      // "http://localhost:8080/api/v0/lecture"
      // process.env.REACT_APP_DEV_URL + `lecture`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addLectureAPI = async (lectureData) => {
  console.log(lectureData);
  try {
    const response = await axios.post(
      process.env.REACT_APP_URL + `lecture`,
      // process.env.REACT_APP_DEV_URL + `lecture`,
      lectureData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOneLecture = async (lectureId) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_URL + `lecture/${lectureId}`
      // process.env.REACT_APP_DEV_URL + `lecture/${lectureId}`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteLecture = async (lectureId) => {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_URL + `lecture/${lectureId}`
      // process.env.REACT_APP_DEV_URL + `lecture/${lectureId}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
