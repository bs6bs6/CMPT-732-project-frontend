import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // 您的API基地址
  headers: {
    'Content-Type': 'application/json',
  },
});

const getData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data; // 返回响应数据
  } catch (error) {
    // 在这里处理错误
    throw error;
  }
};

const getWords = async (params) => {
  try {
    const response = await apiClient.get('/getWords', { params });
    return response.data; // 返回响应数据
  } catch (error) {
    // 在这里处理错误
    throw error;
  }
};



export default {getData,getWords};
