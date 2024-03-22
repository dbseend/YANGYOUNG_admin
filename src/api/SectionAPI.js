import axios from "axios";

export const viewSection = async () => {
  try {
    const response = await axios.get(
      // process.env.REACT_APP_URL + `section`
      process.env.REACT_APP_DEV_URL + `section`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addSection = async (sectionData) => {
  const data = {
    name: sectionData.name,
    teacher: sectionData.teacher,
  };
  try {
    const response = await axios.post(
      // process.env.REACT_APP_URL + `section`,
      process.env.REACT_APP_DEV_URL + `section`,
      data
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getOneSection = async (sectionId) => {
  try {
    const response = await axios.get(
      // process.env.REACT_APP_URL + `section/${sectionId}`
      process.env.REACT_APP_DEV_URL + `section/${sectionId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteSection = async (sectionId) => {
  try {
    const response = await axios.delete(
      // process.env.REACT_APP_URL + `section/${sectionId}`
      process.env.REACT_APP_DEV_URL + `section/${sectionId}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateSectionAPI = async (updateData) => {
  console.log(updateData);
  try {
    const response = await axios.patch(
      // process.env.REACT_APP_URL + `section/${sectionId}`,
      // process.env.REACT_APP_DEV_URL + `section`,
      'http://localhost:8080/api/v0/section',
      updateData
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
