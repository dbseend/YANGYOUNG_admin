import axios from "axios";

export const viewLecture = async () => {
  try {
    const response = await axios.get(process.env.REACT_APP_URL + `lecture`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addLecture = async (name, day, time, room) => {
  const data = {
    name: name,
    day: day,
    time: time,
    room: room,
  };
  try {
    const response = await axios.post(
      process.env.REACT_APP_URL + "lecture",
      data
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
