import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://habit-tracker-website-production.up.railway.app/api" ||
    "http://localhost:7000/api",
});

// Add request interceptor to dynamically set the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `bearer ${token}`;
  }
  return config;
});
