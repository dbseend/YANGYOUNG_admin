import axios from "axios";

export const viewLecture = async () => {
  try {
    const response = await axios.get(process.env.REACT_APP_URL + `lecture`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addLecture = async (lectureData) => {
  try {
    const response = await axios.post(process.env.REACT_APP_URL + `lecture`, lectureData);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getOneLecture = async (lectureId) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_URL + `lecture/${lectureId}`
    );
    console.log(response);
    return (response);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteLecture = async (lectureId) => {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_URL + `lecture/${lectureId}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};