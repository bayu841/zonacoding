import API from "./index";

export const getCategories = async (params = {}) => {
  try {
    const response = await API.get("/categories", { params });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const createCategory = async (data) => {
  try {
    const response = await API.post("/categories", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateCategory = async (id, data) => {
  try {
    const response = await API.put(`/categories/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await API.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
