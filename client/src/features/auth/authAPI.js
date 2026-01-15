import axiosInstance from "../../service/api";
import { getAccessToken } from "../../utils/token";



/* Register */
export const registerAPI = (data) => {
  return axiosInstance.post("/auth/register", data);
};

/* Login */
export const loginAPI = (data) => {
  return axiosInstance.post("/auth/login", data);
};

/* Logout */
export const logoutAPI = () => {
  return axiosInstance.post("/auth/logout");
};

/* Refresh Access Token */
export const refreshAccessTokenAPI = () => {
  return axiosInstance.post("/auth/refresh");
};


export const getMeAPI = () => {
  const token = getAccessToken(); // JWT token

  return axiosInstance.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
