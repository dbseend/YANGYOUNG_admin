import axios from "axios";

// 반별 과제 조회
export const viewSectionTask = async (sectionId, date) => {
  console.log(date);
  try {
    const response = await axios.get(
      process.env.REACT_APP_URL + `task/section/${sectionId}`,
      // process.env.REACT_APP_DEV_URL + `task/section/${sectionId}`,
      {
        params: {
          date: date,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 학생별 과제 조회
export const viewPersonalTask = async (studentId, date) => {
  try {
    const response = await axios.get(
      process.env.REACT_APP_URL + `task/student/${studentId}`,
      // process.env.REACT_APP_DEV_URL + `task/student/${studentId}`,
      // `http://localhost:8080/api/v0/task/student/${studentId}`,
      {
        params: {
          date: date,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 반별 과제 추가
export const addSectionTask = async (taskData) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_URL + `task/section`,
      // process.env.REACT_APP_DEV_URL + `task/section`,
      taskData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 학생별 과제 추가
export const addPersonalTask = async (taskData) => {
  console.log("taskData:", taskData);

  try {
    const response = await axios.post(
      process.env.REACT_APP_URL + `task/student`,
      // process.env.REACT_APP_DEV_URL + `task/student`,
      // `http://localhost:8080/api/v0/task/student`,
      taskData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 과제 삭제
export const deleteTaskAPI = async (taskIdList) => {
  console.log("taskIdList:", taskIdList);
  try {
    const response = await axios.delete(
      process.env.REACT_APP_URL + `task`,
      // process.env.REACT_APP_DEV_URL + `task`,
      // `http://localhost:8080/api/v0/task`,
      {
        params: {
          taskIdList: taskIdList.join(","),
        },
      }
    );
    alert("과제가 삭제되었습니다.");
    return response.data;
  } catch (error) {
    alert("과제 삭제 중 오류가 발생했습니다.");
    throw error;
  }
};

// 과제 상태 변경
export const updateTaskProgressAPI = async (taskData) => {
  console.log("taskData:", taskData);
  try {
    const response = await axios.patch(
      process.env.REACT_APP_URL + `task/progress`,
      // process.env.REACT_APP_DEV_URL + `task/progress`,
      // `http://localhost:8080/api/v0/task/progress`,
      taskData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
