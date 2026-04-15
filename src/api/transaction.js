import API from './index';

export const getTransactions = async (params) => {
  try {
    const response = await API.get('/transactions', { params });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getTransaction = async (id) => {
  try {
    const response = await API.get(`/transactions/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const downloadTransactionReport = async () => {
  try {
    const response = await API.get('/transactions/export/report', {
      responseType: 'blob'
    });
    
    // Create blob link to download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Laporan_Transaksi_NextSkill.pdf');
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const checkout = async (courseId) => {
  try {
    const response = await API.post('/checkout', { course_id: courseId });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const handleCallback = async (data) => {
  try {
    const response = await API.post('/midtrans/callback', data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
