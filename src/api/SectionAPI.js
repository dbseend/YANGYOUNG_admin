import axios from "axios";

// 전체 반 조회 API
export const getAllSectionAPI = async () => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_URL + `section`
      // process.env.REACT_APP_DEV_URL + `section`
      );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 반 추가 API
export const addSectionAPI = async (sectionData) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_URL + `section`,
      // process.env.REACT_APP_DEV_URL + `section`,
      sectionData
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

// 반 상세 조회 API
export const getOneSectionAPI = async (sectionId) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_URL + `section/${sectionId}`
      // process.env.REACT_APP_DEV_URL + `section/${sectionId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 반 삭제 API
export const deleteSectionAPI = async (sectionId) => {
  try {
    const response = await axios.delete(
      process.env.REACT_APP_URL + `section/${sectionId}`
      // process.env.REACT_APP_DEV_URL + `section/${sectionId}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

// 반 학생 수정 API
export const updateSectionMemberAPI = async (updateData) => {
  console.log(updateData);
  try {
    const response = await axios.patch(
      process.env.REACT_APP_URL + `section/student`,
      // process.env.REACT_APP_DEV_URL + `section`,
      // 'http://localhost:8080/api/v0/section/student',
      updateData
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 반 정보 수정 API
export const updateSectionInfoAPI = async (updateData) => {
  console.log(updateData);
  try {
    const response = await axios.patch(
      process.env.REACT_APP_URL + `section`,
      // process.env.REACT_APP_DEV_URL + `section`,
      // 'http://localhost:8080/api/v0/section/student',
      updateData
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};