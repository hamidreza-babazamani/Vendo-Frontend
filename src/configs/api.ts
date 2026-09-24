import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3400";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Response interceptor برای مدیریت خطاها
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // اگه 401 بود، کاربر لاگین نیست
    if (error.response?.status === 401) {
      // فقط اگه توی صفحه auth نباشیم، redirect کن
      if (!window.location.pathname.includes("/auth")) {
        // window.location.href = "/auth";
      }
    }
    return Promise.reject(error);
  }
);

export { api, BASE_URL };