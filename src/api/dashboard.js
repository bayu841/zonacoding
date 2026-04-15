import api from "./index";

export const getDashboardData = async () => {
  const response = await api.get("/dashboard");
  return response.data;
};
