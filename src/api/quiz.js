import API from './index';

export const createQuiz = async (payload) => {
  const response = await API.post('/quizzes', payload);
  return response.data;
};

export const getQuizzes = async (courseId) => {
  const response = await API.get(`/quizzes?course_id=${courseId}`);
  return response.data;
};

export const getCourseQuizzes = async (courseId) => {
  const response = await API.get(`/courses/${courseId}/quizzes`);
  return response.data;
};

export const getQuiz = async (id) => {
  const response = await API.get(`/quizzes/${id}`);
  return response.data;
};

export const updateQuiz = async (id, payload) => {
  const response = await API.put(`/quizzes/${id}`, payload);
  return response.data;
};

export const addMatchingQuestions = async (quizId, payload) => {
  const response = await API.post(`/quizzes/${quizId}/questions/matching`, payload);
  return response.data;
};

export const addMcqQuestions = async (quizId, payload) => {
  const response = await API.post(`/quizzes/${quizId}/questions/mcq`, payload);
  return response.data;
};

export const deleteQuiz = async (quizId) => {
  const response = await API.delete(`/quizzes/${quizId}`);
  return response.data;
};
