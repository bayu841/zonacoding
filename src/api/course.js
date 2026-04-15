import API from "./index";

export const getCourses = async (params = {}) => {
  try {
    const response = await API.get("/courses", { params });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getCourse = async (id) => {
  try {
    const response = await API.get(`/courses/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const createCourse = async (formData) => {
  try {
    const response = await API.post("/courses", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateCourse = async (id, data) => {
  try {
    // Note: If updating thumbnail via PUT, Laravel might need _method: "PUT" in a POST request or special handling for multipart/form-data with PUT.
    // However, the user provided a simple update example. If thumbnail is involved in update, we'll use FormData.
    const isFormData = data instanceof FormData;
    const response = await API.post(`/courses/${id}`, data, {
      headers: {
        "Content-Type": isFormData ? "multipart/form-data" : "application/json",
      },
      params: {
        _method: "PUT",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await API.delete(`/courses/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getCoursesNoMentor = async () => {
  try {
    const response = await API.get("/courses/no-mentor");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const applyAsMentor = async (courseId, data) => {
  try {
    const response = await API.post(`/courses/${courseId}/apply-mentor`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getActiveCoursesByMentor = async () => {
  try {
    const response = await API.get("/courses/active-by-mentor");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getMentorActiveCourses = async (params = {}) => {
  try {
    const response = await API.get("/courses/mentor-active", { params });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
