import axios from "axios";

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