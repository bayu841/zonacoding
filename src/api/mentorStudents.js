import API from "./index";

export const getMentorStudents = async () => {
  try {
    const response = await API.get("/students");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
