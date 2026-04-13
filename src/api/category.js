import api from './index';

export const getCategories = async (params = {}) => {
  try {
    const response = await api.get('/categories', { params });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const createCategory = async (data) => {
  try {
    const response = await api.post('/categories', data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateCategory = async (id, data) => {
  try {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getCategoryDetail = async (id) => {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
