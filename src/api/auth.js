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
    // If token is already invalid (401/422), still clear auth on frontend
    // Backend returns 401 when token expired/missing - this is expected
    if (error.response?.status === 401 || error.response?.status === 422) {
      return { message: "Logged out" };
    }
    throw error.response ? error.response.data : error;
  }
};


