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

export const addSection = async (sectionData) => {
  const data = {
    name: sectionData.name,
    teacher: sectionData.teacher
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
    const responseA = await axios.get (
      process.env.REACT_APP_URL + `section/${id}`
    )
    const responseB = await axios.get (
      process.env.REACT_APP_URL + `section/lecture/${id}`
    )
    return [responseA, responseB];
  } catch (error) {
    console.error(error);
  }
};

// export const getOneSectionLecture = async (id) => {
//   try {
//     const response = await axios.get (
//       process.env.REACT_APP_URL + `section/lecture/${id}`
//     )
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// };