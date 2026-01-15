/* 🔐 Save Access Token */
export const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

/* ❌ Remove Access Token */
export const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
};

/* 📥 Get Access Token (optional helper) */
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};
