import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/v1`
  : "/api/v1";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    if (config.headers?.set) {
      config.headers.set("Authorization", `Bearer ${token}`);
      config.headers.set("x-admin-token", token);
    } else {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        "x-admin-token": token,
      };
    }
  }

  return config;
});
