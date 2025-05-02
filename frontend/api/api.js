import axios from 'axios';

const api = axios.create({
  baseURL: 'https://blog-6bpi.onrender.com/api',
});

export default api;
