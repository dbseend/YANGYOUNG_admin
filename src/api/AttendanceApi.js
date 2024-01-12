import axios from "axios";

export const getSectionAttendanceInfo = async (id, date) => {
  console.log("id: ", id);
  console.log("date: ", date);
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/section/attendance/${id}`,
      {
        params: {
          date: date,
        },
      }
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching attendance info:", error);
  }
};
