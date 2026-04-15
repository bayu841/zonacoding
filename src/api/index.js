import axios from "axios";
import { getCookie, removeCookie } from "../utils/cookies";
import { useAuthStore } from "@/stores/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    // Prioritize token from Cookie for security
    const token = getCookie("token") || localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized: Clear all storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      removeCookie("token");

      // Clear pinia auth store to trigger router guard
      try {
        const authStore = useAuthStore();
        authStore.clearAuth();
      } catch (e) {
        // If store import fails, at least storage is cleared
        console.error("Auto logout failed:", e);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
