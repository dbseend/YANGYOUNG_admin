import axios from "axios";

// 반 출석 정보 조회 API
export const getAttendanceBySectionAPI = async (id, date) => {
  try {
    const response = await axios.get(
      // `http://localhost:8080/api/v0/attendance/section/${id}`,
      process.env.REACT_APP_URL + `attendance/section/${id}`,
      // process.env.REACT_APP_DEV_URL + `attendance/section/${id}`,
      {
        params: {
          selectedDay: date,
        },
      }
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching attendance info:", error);
  }
};

// 학생 출석 정보 수정 API
export const postAttendanceBySectionAPI = async (data) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_URL}attendance`,
      // `http://localhost:8080/api/v0/attendance`,
      // `${process.env.REACT_APP_DEV_URL}attendance`,
      data
    );
    console.log(response.data);

    alert("출석 정보가 수정되었습니다");

    return response.data;
  } catch (error) {
    alert("출석 정보가 수정 중 오류 발생했습니다");
    console.error("Error fetching attendance info:", error);
  }
};
