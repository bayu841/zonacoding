import API from "./index";

export const createCourseMentorApplication = async (data) => {
  try {
    const response = await API.post("/course-mentor-applications", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getPendingMentorApplications = async () => {
  try {
    const response = await API.get("/course-mentor-applications/pending");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getCourseMentorApplications = async (params = {}) => {
  try {
    const response = await API.get("/course-mentor-applications", { params });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateCourseMentorApplicationStatus = async (id, data) => {
  try {
    const response = await API.put(`/course-mentor-applications/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const deleteCourseMentorApplication = async (id) => {
  try {
    const response = await API.delete(`/course-mentor-applications/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
