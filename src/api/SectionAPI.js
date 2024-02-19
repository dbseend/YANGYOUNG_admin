import axios from "axios";

export const viewSection = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_URL + `section`
      );
      console.log(response.data);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

export const addSection = async (name, teacher) => {
  const data = {
    name: name,
    teacher: teacher
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

export const getOneSection = async (id) => {
  try {
    const response = await axios.get (
      process.env.REACT_APP_URL + `section/${id}`
    )
    return response;
  } catch (error) {
    console.error(error);
  }
};