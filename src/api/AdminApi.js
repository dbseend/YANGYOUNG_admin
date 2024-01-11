import axios from "axios";
import { errorSelector } from "recoil";

export const addStudent = async (id, name, school, grade, phoneNumber) => {
  const data = {
    id,
    name,
    school,
    grade,
    phoneNumber,
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
