import axios from "axios";
import { errorSelector } from "recoil";


export const checkTokenValidity = async (id) => {
  try {
    let returnValue;
    const response = await axios.post(
      process.env.REACT_APP_URL + `/student`,
      {id}
    );
    returnValue = response.data;
    return returnValue;
  } catch (error) {
    console.error(error);
    throw errorSelector;
  }
};

export const addStudent = async (
  id,
  name,
  gender,
  grade,
  birth,
  phoneNumber
) => {
  const data = {

  id:id,
  name:name,
  gender:gender,
  grade:grade,
  birth: birth,
  phoneNumber:phoneNumber
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
