import API from './index';

export const getMentorWithdrawals = async (params) => {
  try {
    const response = await API.get('/withdrawals', { params });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const approveWithdrawal = async (id, data) => {
  try {
    const response = await API.post(`/withdrawals/${id}/approve`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const rejectWithdrawal = async (id, data) => {
  try {
    const response = await API.post(`/withdrawals/${id}/reject`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
