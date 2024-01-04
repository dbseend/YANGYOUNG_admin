import axios from "axios";
import { errorSelector } from "recoil";

export const checkTokenValidity = async (id) => {
  try {
    const response = await axios.post(
      `http://43.201.217.237:8080/api/v1/students/${id}`,

      { id }
    );
    return response.data.valid;
  } catch (error) {
    console.error(error);
    throw errorSelector;
  }
};

export const addStudent = async (id, name) => {
  const data = {
    id: id,
    name: name,
  };

  try {
    const response = await axios.post(
      "http://43.201.217.237:8080/api/v1/students",
      data
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

