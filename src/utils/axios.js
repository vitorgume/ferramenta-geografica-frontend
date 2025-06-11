import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("id-representante");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;
