import API from "./index";

export const getTopLearners = async () => {
  try {
    const response = await API.get("/leaderboard/top-learners");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
