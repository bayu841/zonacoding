import API from "./index";

export const getLessons = async (courseId, params = {}) => {
  try {
    const response = await API.get(`/courses/${courseId}/lessons`, { params });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getLesson = async (courseId, lessonId) => {
  try {
    const response = await API.get(`/courses/${courseId}/lessons/${lessonId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const createLesson = async (courseId, formData) => {
  try {
    const response = await API.post(`/courses/${courseId}/lessons`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateLesson = async (courseId, lessonId, formData) => {
  try {
    const response = await API.post(`/courses/${courseId}/lessons/${lessonId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        _method: "PUT"
      }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const deleteLesson = async (courseId, lessonId) => {
  try {
    const response = await API.delete(`/courses/${courseId}/lessons/${lessonId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
