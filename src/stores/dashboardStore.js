import { defineStore } from "pinia";
import { getDashboardData } from "@/api/dashboard";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    dashboardData: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchDashboard() {
      this.loading = true;
      this.error = null;
      try {
        const response = await getDashboardData();
        if (response.status) {
          this.dashboardData = response.data;
        } else {
          this.error = response.message || "Failed to fetch dashboard data";
        }
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || "An error occurred while fetching dashboard data";
        console.error("Dashboard fetch error:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    clearDashboard() {
      this.dashboardData = null;
      this.error = null;
      this.loading = false;
    },
  },
});
