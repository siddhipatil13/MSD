// Axios instance - one place to configure the API base URL.
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Express server
  withCredentials: true, // send/receive cookies
});

// Add the JWT token automatically to every request if the admin is logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
