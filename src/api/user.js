import API from "./index";

export const getUsers = async (params = {}) => {
  try {
    const response = await API.get("/users", { params });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getUser = async (id) => {
  try {
    const response = await API.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const createUser = async (data) => {
  try {
    const response = await API.post("/users", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await API.put(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await API.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
