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