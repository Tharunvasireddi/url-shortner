import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_NODE_ENV === "production" || import.meta.env.PROD
      ? "https://url-shortner-8j2b.onrender.com"
      : "http://localhost:3000",
  timeout: 10000, // Increased timeout to 10 seconds
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Making request to:", config.baseURL + config.url);
    return config;
  },
  (error) => {
    console.log("Request error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle different types of errors
    if (error.response) {
      const { status, data } = error.response;
      console.error(`HTTP Error (${status}):`, data);
    } else if (error.request) {
      console.error("Network Error: No response received");
      console.error("Request details:", {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL,
      });
    } else {
      console.error("Request setup error:", error.message);
    }

    return Promise.reject({
      message:
        error.response?.data?.message ||
        error.message ||
        "Network connection failed",
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

export default axiosInstance;
