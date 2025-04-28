import axios from 'axios';

const API_URL = 'http://localhost:8081/api/yib/expert';

// const getTestsForReview = async (token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.get(API_URL, config);
//   return response.data;
// };

const getAllTestsByExpert = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/all/tests`, config);
  return response.data;
};

// const submitReview = async (testId, reviewData, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   const response = await axios.put(`${API_URL}/${testId}/review`, reviewData, config);
//   return response.data;
// };

export default {
//   getTestsForReview,
  getAllTestsByExpert,
//   submitReview,
};