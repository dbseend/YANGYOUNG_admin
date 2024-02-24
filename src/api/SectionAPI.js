import { type } from "@testing-library/user-event/dist/type";
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

// 분반 삭제
export const deleteSection = async (sectionId) => {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_URL + `section/${sectionId}`
      // `http://localhost:8080/api/v0/section/${sectionId}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
