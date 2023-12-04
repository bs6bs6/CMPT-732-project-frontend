import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080', 
  // baseURL: 'http://54.213.254.255/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const getData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data; 
  } catch (error) {
    
    throw error;
  }
};

const getWords = async (params) => {
  try {
    const response = await apiClient.get('/getWords', { params });
    return response.data; 
  } catch (error) {
    throw error;
  }
};



export default {getData,getWords};
