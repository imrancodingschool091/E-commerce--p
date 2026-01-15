import axios from "axios";
import { getAccessToken } from "../utils/token";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Replace with your API URL
  withCredentials: true, // important to send cookies (refresh token)
});

// Request interceptor to attach access token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to auto-refresh access token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 Unauthorized & request not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh token API
        const res = await axios.post(
          "http://localhost:5000/auth/refresh",
          {},
          { withCredentials: true } // send cookie
        );

        const newAccessToken = res.data.accessToken;

        // Save new access token in localStorage
        localStorage.setItem("accessToken", newAccessToken);

        // Update Authorization header of original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh token failed → logout user
        localStorage.removeItem("accessToken");
        window.location.href = "/login"; // redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
