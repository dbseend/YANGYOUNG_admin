import axios from "axios";

// 전체 강의 조회 API
export const getAllLectureAPI = async () => {
  try {
    const response = await axios.get(
      // process.env.REACT_APP_URL + `lecture`
      "http://localhost:8080/api/v0/lecture"
      // process.env.REACT_APP_DEV_URL + `lecture`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 강의 추가 API
export const addLectureAPI = async (lectureData) => {
  console.log(lectureData);
  try {
    const response = await axios.post(
      // process.env.REACT_APP_URL + `lecture`,
      // process.env.REACT_APP_DEV_URL + `lecture`,
      "http://localhost:8080/api/v0/lecture",
      lectureData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 강의 상세 조회 API
export const getLectureAPI = async (lectureId) => {
  try {
    const response = await axios.get(
      // process.env.REACT_APP_URL + `lecture/${lectureId}`
      // process.env.REACT_APP_DEV_URL + `lecture/${lectureId}`
      `http://localhost:8080/api/v0/lecture/${lectureId}`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 강의 수정 API
export const updateLectureAPI = async (updateLectureData) => {
  try {
    const response = await axios.patch(
      // process.env.REACT_APP_URL + `lecture/${updateLectureData.id}`,
      // process.env.REACT_APP_DEV_URL + `lecture/${updateLectureData.id}`,
      `http://localhost:8080/api/v0/lecture`,
      updateLectureData
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

// 강의 순서 수정 API
export const updateLectureOrderAPI = async (lectureSeqUpdateRequest) => {
  try {
    const response = await axios.patch(
      // process.env.REACT_APP_URL + `lecture/${updateLectureData.id}`,
      // process.env.REACT_APP_DEV_URL + `lecture/${updateLectureData.id}`,
      `http://localhost:8080/api/v0/lecture/seq`,
      lectureSeqUpdateRequest
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

// 강의 삭제 API
export const deleteLectureAPI = async (lectureId) => {
  try {
    const response = await axios.delete(
      // process.env.REACT_APP_URL + `lecture/${lectureId}`
      // process.env.REACT_APP_DEV_URL + `lecture/${lectureId}`
      `http://localhost:8080/api/v0/lecture/${lectureId}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
