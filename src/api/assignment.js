import API from "./index";

export const getCoursesPendingTasks = async () => {
  try {
    const response = await API.get("/mentor/courses-pending-tasks");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// I will wait for user to provide the correct endpoint for submissions
// before adding getCourseSubmissions
