import API from "./index";

export const login = async (credentials) => {
  try {
    const response = await API.post("/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const register = async (userData) => {
  try {
    const response = await API.post("/register", {
      ...userData,
      role: userData.role || "student",
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const logout = async () => {
  try {
    const response = await API.post("/logout");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};


