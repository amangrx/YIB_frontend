import axios from 'axios';

const API_URL = 'http://localhost:8081/api/yib/expert';

const getAllTestsByExpert = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/all/tests`, config);
  return response.data;
};

const getWritingTestAnswer = async (testId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/test/${testId}`, config);
  return response.data;
};

const submitReview = async (testId, reviewData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/${testId}/review`, reviewData, config);
  return response.data;
};

export default {
  getAllTestsByExpert,
  getWritingTestAnswer,
  submitReview
};