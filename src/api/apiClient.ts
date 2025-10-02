import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // This will be your NestJS backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// This will be used later to add the auth token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;