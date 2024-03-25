import axios from "axios";

// 검색 옵션 API
export const getSearchOptionAPI = async () => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_URL + `util/searchOption`
      // process.env.REACT_APP_DEV_URL + `util/searchOption`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
