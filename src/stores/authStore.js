import { defineStore } from "pinia";
import router from "@/router";
import {
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
} from "@/api/auth";
import { removeCookie } from "@/utils/cookies";
import { useDashboardStore } from "./dashboardStore";

const safeParse = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.error(`Error parsing ${key} from localStorage`, e);
    localStorage.removeItem(key);
    return null;
  }
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: safeParse("user"),
    token: localStorage.getItem("token") || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(credentials) {
      try {
        const response = await loginApi(credentials);
        this.setAuth(response.data);
        return response;
      } catch (error) {
        throw error;
      }
    },

    async register(userData) {
      try {
        const response = await registerApi(userData);
        if (response.data?.token) {
          this.setAuth(response.data);
        }
        return response;
      } catch (error) {
        throw error;
      }
    },

    async logout() {
      try {
        await logoutApi();
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        this.clearAuth();
        
        // Clear related stores
        const dashboardStore = useDashboardStore();
        dashboardStore.clearDashboard();

        // Redirect to login page
        router.push("/login");
      }
    },

    setAuth(authData) {
      this.user = authData.user;
      this.token = authData.token;
      localStorage.setItem("user", JSON.stringify(authData.user));
      localStorage.setItem("token", authData.token);
    },

    clearAuth() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      removeCookie("token");
    },

    updateUser(userData) {
      this.user = { ...this.user, ...userData };
      localStorage.setItem("user", JSON.stringify(this.user));
    },
  },
});
