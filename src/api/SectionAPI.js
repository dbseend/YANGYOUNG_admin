import axios from "axios";

export const viewSection = async () => {
  try {
    const response = await axios.get(process.env.REACT_APP_URL + `section`);
    console.log(response.data);
    return response;
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
      process.env.REACT_APP_URL + `section`,
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
      process.env.REACT_APP_URL + `section/${sectionId}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteSection = async (sectionId) => {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_URL + `section/${sectionId}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
