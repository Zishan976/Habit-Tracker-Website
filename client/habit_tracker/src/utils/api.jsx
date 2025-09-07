import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5000/api"
})

// Add request interceptor to dynamically set the token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `bearer ${token}`;
    }
    return config;
});
