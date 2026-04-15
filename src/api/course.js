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

export const getMyCourses = async () => {
  try {
    const response = await API.get("/my-courses");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getLessons = async (courseId) => {
  try {
    const response = await API.get(`/courses/${courseId}/lessons`);
    // Response structure: { success, message, data: { data: [...], unrelated_quizzes: [...] } }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getTasks = async (courseId) => {
  try {
    const response = await API.get(`/courses/${courseId}/tasks`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};



export const submitQuiz = async (quizId, answers) => {
  try {
    const response = await API.post(`/quizzes/${quizId}/submit`, { answers });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getQuizDetail = async (quizId) => {
  try {
    const response = await API.get(`/quizzes/${quizId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const markLessonComplete = async (lessonId) => {
  try {
    const response = await API.post(`/lessons/${lessonId}/mark-complete`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateLessonProgress = (lesson) => {
  // Progress is now embedded in lesson object from /courses/${courseId}/lessons
  // Simply return the progress data from the lesson
  return {
    data: {
      progress: lesson.progress || null,
      duration: lesson.duration_in_minutes || 0,
    }
  };
};

export const getMyCertificates = async () => {
  try {
    const response = await API.get("/my-certificates");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const downloadCertificate = async (certificateId) => {
  try {
    console.log("Downloading certificate with ID:", certificateId);
    const response = await API.get(`/certificates/${certificateId}/download`, {
      responseType: 'blob'
    });
    console.log("Response received:", response);
    return response;
  } catch (error) {
    console.error("Download error details:", error);
    throw error;
  }
};

export const getCertificateByCourseId = async (courseId) => {
  try {
    console.log("Getting certificate for course ID:", courseId);
    const response = await API.get(`/courses/${courseId}/certificate`);
    console.log("Certificate response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get certificate error details:", error);
    throw error;
  }
};

export const getCourseLessonsWithProgress = async (courseId) => {
  try {
    // Single endpoint call to get all course content and progress data
    const response = await API.get(`/courses/${courseId}/lessons`);
    // Response structure: { success, message, data: { data: [...lessons], course_progress: 50, unrelated_quizzes: [...] } }
    
    const responseData = response.data?.data || {};
    const lessonsData = responseData.data || [];
    const unrelatedQuizzes = responseData.unrelated_quizzes || [];
    const courseProgress = responseData.course_progress || 0;
    
    // Extract completed lesson IDs (lessons with progress === 100)
    const completedLessons = lessonsData
      .filter(lesson => lesson.progress === 100)
      .map(lesson => lesson.id);
    
    // Extract embedded quizzes from lessons
    const embeddedQuizzes = lessonsData.flatMap(lesson => lesson.quizzes || []);
    
    return {
      data: {
        lessons: lessonsData,
        embeddedQuizzes: embeddedQuizzes,
        unrelatedQuizzes: unrelatedQuizzes,
        courseProgress: courseProgress,
        completedLessons: completedLessons
      }
    };
  } catch (error) {
    console.error("Get course lessons with progress error:", error);
    return {
      data: {
        lessons: [],
        embeddedQuizzes: [],
        unrelatedQuizzes: [],
        courseProgress: 0,
        completedLessons: []
      }
    };
  }
};
