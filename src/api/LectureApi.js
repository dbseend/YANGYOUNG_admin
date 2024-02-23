import axios from "axios";

export const viewLecture = async () => {
  try {
    const response = await axios.get(process.env.REACT_APP_URL + `lecture`);
    console.log (response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addLecture = async (data) => {
  console.log(data);
  try {
    const response = await axios.post(
      process.env.REACT_APP_URL + `lecture`,
      data
    );
    console.log(response.data);
    alert ("강의가 개설되었습니다.");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOneLecture = async (id) => {
  try {
    const response = await axios.patch(
      process.env.REACT_APP_URL + `lecture/${id}`
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}