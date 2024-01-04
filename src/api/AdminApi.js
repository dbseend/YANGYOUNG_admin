import axios from "axios";
import { errorSelector } from "recoil";

// export const checkTokenValidity = async (id) => {
//   try {
//     const response = await axios.post(
//       `http://172.18.157.205:8080/api/v1/students`,
//       { id }
//     );
//     return response.data.valid;
//   } catch (error) {
//     console.error(error);
//     throw errorSelector;
//   }
// };

export const checkTokenValidity = async (id) => {
  const data = {
    id:id,
  }
  }
  ;
export const addStudent = async (
  id,
  name,
  gender,
  grade,
  birth,
  phoneNumber
) => {
  const data = {
    id: id,
    name: name,
    gender: gender,
    grade: grade,
    birth: birth,
    phoneNumber: phoneNumber,
  };

  try {
    const response = await axios.post(
      "http://172.18.157.205:8080/api/v1/students",
      data
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
