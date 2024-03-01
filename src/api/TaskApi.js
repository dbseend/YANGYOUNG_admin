import axios from "axios";

export const viewSectionTask = async (sectionId) => {
  try {
    const response = await axios.get(process.env.REACT_APP_URL + `task/section/${sectionId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const viewPersonalTask = async (studentId) => {
    try {
      const response = await axios.get(process.env.REACT_APP_URL + `task/student/${studentId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

export const addSectionTask = async (taskData) => {
  try {
    const response = await axios.post(process.env.REACT_APP_URL + `task/section`, taskData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addPersonalTask = async (taskData) => {
    try {
      const response = await axios.post(process.env.REACT_APP_URL + `task/student`, taskData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };