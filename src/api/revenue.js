import API from "./index";

export const getRevenueShare = async () => {
  try {
    const response = await API.get("/revenue-share");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const updateRevenueShare = async (data) => {
  try {
    const response = await API.put("/revenue-share", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
export const getMentorBalance = async () => {
  try {
    const response = await API.get("/balance");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
export const getIncomeStatistics = async () => {
  try {
    const response = await API.get("/income-statistics");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getWithdrawalHistory = async () => {
  try {
    const response = await API.get("/withdrawal-history");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const requestWithdrawal = async (data) => {
  try {
    const response = await API.post("/withdrawal-request", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
