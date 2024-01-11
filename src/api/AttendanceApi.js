import axios from "axios";

export const getSectionStudentInfo = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/section/student/${id}`
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching attendance info:", error);
  }
};
