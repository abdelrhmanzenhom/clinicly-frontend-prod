import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // ✅ dynamic: works for localhost + production
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    console.log("Axios Interceptor - Token:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
